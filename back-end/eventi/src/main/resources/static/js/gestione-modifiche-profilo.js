/* -------------------------------------------------------------------------- */
/*                        PRENDERE PRENOTAZIONI ATTIVE                        */
/* -------------------------------------------------------------------------- */
let utenteAutenticato = null
document.addEventListener("DOMContentLoaded", async () => {
	try {
		utenteAutenticato = await verificaSessione()
	} catch (err) {
		alert("Non puoi accedere alla pagina profilo senza essere autenticato.")
		window.location.replace("http://localhost:8080/login.html")
		return
	}
	console.log(utenteAutenticato)

	// Fetch delle prenotazioni aggiornate
	let eventiAttivi = []
	try {
		const response = await fetch(`http://localhost:8080/api/prenotazioni/${utenteAutenticato.id}`)
		if (!response.ok) {
			throw new Error("Errore nel recupero delle prenotazioni.")
		}
		eventiAttivi = await response.json()
	} catch (err) {
		console.error("Errore nel recupero delle prenotazioni:", err)
		eventi.innerHTML = "<p>Errore nel caricamento degli eventi.</p>"
		return
	}

	console.log(eventiAttivi)
	const eventi = document.getElementById("priv-ordini")

	if (eventiAttivi.length === 0) {
		eventi.innerHTML = "<p>Nessuna prenotazione trovata.</p>"
		return
	}

	let eventiHTML = ""
	eventiAttivi.forEach((element) => {
        const data = new Date(element.evento.dataEvento);
		eventiHTML += `
            <div class="evento" data-id="${element.id}">
                <div class="row align-items-center">
                    <div class="col-lg-5 col-md-12 mb-3 mb-lg-0">
                        <img src="${element.evento.url}" class="img-fluid event-img" alt="${element.evento.nome}">
                    </div>
                    <div class="col-lg-7 col-md-12">
                        <a href="#">
                            <h4>${element.evento.nome}</h4>
                        </a>
                        <p><strong>Data:</strong> ${data.toLocaleDateString("it-IT", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}</p>
                        <p><strong>Luogo:</strong> ${element.evento.luogoEvento}</p>
                        <button class="bin-button popup-trigger reject" onclick="eliminaPrenotazione('${element.id}')">
                             <svg class="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" stroke-width="3"></line>
                            </svg>
                            <svg class="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_8_19" fill="white">
                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                                </mask>
                                <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)"></path>
                                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `
	})

	eventi.innerHTML = eventiHTML
})

/* -------------------------------------------------------------------------- */
/*                           ELIMINARE PRENOTAZIONE                           */
/* -------------------------------------------------------------------------- */
function eliminaPrenotazione(idPrenot) {
    const popup = document.getElementById("popup-reject");
    const overlay = document.getElementById("overlay");
    const confermaBtn = document.getElementById("elimina-prenotazione");
    const annullaBtn = document.getElementById("annulla-eliminazione");

    // Mostra popup e overlay
    popup.classList.remove("d-none");
    overlay.classList.remove("d-none");

    // Rimuovi eventuali listener precedenti per evitare duplicazioni
    confermaBtn.replaceWith(confermaBtn.cloneNode(true)); // Sostituisci il pulsante con una sua copia per rimuovere i listener
    const nuovoConfermaBtn = document.getElementById("elimina-prenotazione"); // Recupera il nuovo pulsante

    // Aggiungi event listener al pulsante di conferma
    nuovoConfermaBtn.addEventListener("click", () => {
        fetch(`http://localhost:8080/api/prenotazioni/${idPrenot}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Errore durante il salvataggio delle modifiche");
                }

                // Trova l'elemento da rimuovere
                const elementoDaRimuovere = document.querySelector(`.evento[data-id="${idPrenot}"]`);
                if (elementoDaRimuovere) {
                    // Aggiungi classi Animate.css per l'animazione
                    elementoDaRimuovere.classList.add('animate__animated', 'animate__zoomOut');

                    // Rimuovi l'elemento dopo il completamento dell'animazione
                    elementoDaRimuovere.addEventListener('animationend', () => {
                        elementoDaRimuovere.remove();
                    });
                }
            })
            .catch((error) => {
                console.error("Errore:", error);
                alert("Non è stato possibile eliminare la prenotazione.");
            });

        // Nascondi popup e overlay
        popup.classList.add("d-none");
        overlay.classList.add("d-none");
    });

    // Rimuovi eventuali listener precedenti e aggiungi il listener al pulsante di annullamento
    annullaBtn.replaceWith(annullaBtn.cloneNode(true));
    const nuovoAnnullaBtn = document.getElementById("annulla-eliminazione");

    nuovoAnnullaBtn.addEventListener("click", () => {
        popup.classList.add("d-none");
        overlay.classList.add("d-none");
    });
}

// function eliminaPrenotazione(idPrenot) {
// 	const popup = document.getElementById("popup-reject")
// 	const overlay = document.getElementById("overlay")

// 	popup.classList.remove("d-none")
// 	overlay.classList.remove("d-none")

// 	document.getElementById("elimina-prenotazione").addEventListener("click", () => {
// 		fetch(`http://localhost:8080/api/prenotazioni/${idPrenot}`, {
// 			method: "DELETE",
// 			credentials: "include",
// 		})
// 			.then((response) => {
// 				if (!response.ok) {
// 					throw new Error(err.message || "Errore durante il salvataggio delle modifiche")
// 				}
// 				const elementoDaRimuovere = document.querySelector(`.evento[data-id="${idPrenot}"]`)
// 				if (elementoDaRimuovere) {
// 					
//                   
//                         elementoDaRimuovere.remove(); // Rimuovi elemento dopo animazione
//                     
//                 }
				
// 			})
// 			.catch((error) => {
// 				console.error("Errore:", error)
// 				alert("Non è stato possibile eliminare la prenotazione.")
// 			})
// 	})
// 	document.getElementById("annulla-eliminazione").addEventListener("click", () => {
// 		popup.classList.add("d-none")
// 		overlay.classList.add("d-none")
// 	})
// }

/*--------------------------------------------------------------------------------*/
/*                            MODIFICHE DATI PROFILO                              */
/*--------------------------------------------------------------------------------*/

//Pulsante "Salva modifiche"
const salvaModificheBtn = document.getElementById("salvaBtn")
if (salvaModificheBtn) {
	salvaModificheBtn.addEventListener("click", salvaModifiche)
}

// Pulsante "Annulla Modifiche"
const annullaModificheBtn = document.getElementById("annullaBtn")
if (annullaModificheBtn) {
	annullaModificheBtn.addEventListener("click", annullaModifiche)
}

function salvaModifiche(e) {
	e.preventDefault()

	const nome = document.getElementById("nomeInput").value
	const cognome = document.getElementById("cognomeInput").value
	// const dataNascita = document.getElementById("data-di-nascita").textContent;
	emailUt = document.getElementById("email").textContent
	// const password = document.getElementById("passwordUtente").value

	console.log(emailUt)

	const utenteModificato = {
		nome: nome,
		cognome: cognome,
		email: emailUt,
		ruolo: utenteAutenticato.ruolo,
        dataNascita: utenteAutenticato.dataNascita
	}

	return fetch("http://localhost:8080/api/utente", {
		method: "PUT",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(utenteModificato),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(err.message || "Errore durante il salvataggio delle modifiche")
			}
			return response.json()
		})
		.then((data) => {
			updateUI(data)
		})
		.catch((error) => {
			console.log("Errore", error)
		})
}

function annullaModifiche(e) {
	e.preventDefault()

	verificaSessione()
		.then((utenteData) => {
			updateUI(utenteData)
		})
		.catch((error) => {
			console.log("Errore durante annullamento delle modifiche", error)
		})
}
