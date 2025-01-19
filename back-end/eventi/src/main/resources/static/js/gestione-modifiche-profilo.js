/* -------------------------------------------------------------------------- */
/*                        PRENDERE PRENOTAZIONI ATTIVE                        */
/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
    let utenteAutenticato = null;
    try {
        utenteAutenticato = await verificaSessione();
    } catch (err) {
        alert("Non puoi accedere alla pagina profilo senza essere autenticato.");
        window.location.replace("http://localhost:8080/login.html");
        return;
    }
    console.log(utenteAutenticato);

    let eventiAttivi = utenteAutenticato.prenotazioni;
    console.log(eventiAttivi);
    const eventi = document.getElementById("priv-ordini");

    if (eventiAttivi.length === 0) {
        eventi.innerHTML = "<p>Nessun evento trovato.</p>";
        return;
    }

    let eventiHTML = '';
    eventiAttivi.forEach(element => {
        eventiHTML += `
            <div class="evento">
                <div class="row align-items-center">
                    <div class="col-lg-5 col-md-12 mb-3 mb-lg-0">
                        <img src="${element.evento.url}" class="img-fluid event-img" alt="${element.evento.nome}">
                    </div>
                    <div class="col-lg-7 col-md-12">
                        <a href="#">
                            <h4>${element.evento.nome}</h4>
                        </a>
                        <p><strong>Data:</strong> ${element.evento.dataEvento}</p>
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
        `;
    });

    eventi.innerHTML = eventiHTML;
});

function eliminaPrenotazione(idPrenot) {
    fetch(`http://localhost:8080/api/prenotazioni/${idPrenot}`, {
        method: "DELETE",
		credentials: "include",
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error(err.message || "Errore durante il salvataggio delle modifiche")
        }
        // document.querySelector(`[data-id="${idPrenot}"]`).remove();
    })
    .catch((error) => {
        console.error("Errore:", error);
        alert("Non è stato possibile eliminare la prenotazione.");
    });
}

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
	const email = document.getElementById("emailUtente").value
	const dataNascita = document.getElementById("data-nascita").value
	const password = document.getElementById("passwordUtente").value

	const utenteModificato = {
		nome: nome,
		cognome: cognome,
		dataNascita: dataNascita,
		email: email,
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

/*--------------------------------------------------------------------------------*/
/*                            MODIFICHE PRENOTAZIONI ATTIVE                       */
/*--------------------------------------------------------------------------------*/

//Tasto annulla
document.querySelector(".cancel").addEventListener("click", function () {
	const popup = document.getElementById("popup-reject")
	const overlay = document.getElementById("overlay")

	if (popup) {
		popup.classList.add("d-none")
		overlay.classList.add("d-none")
	}
})

//Tasto elimina
// document.querySelector(".desactivate").addEventListener("click", e => {
// 	const evento = document.getElementById("evento-2")
// 	const popup = document.getElementById("popup-reject")
// 	const overlay = document.getElementById("overlay")
//     console.log(e.target);


// 	if (evento) {
// 		evento.remove()
// 	}

// 	//ALERT
// 	alert("Evento eliminato con successo")

// 	if (popup) {
// 		popup.classList.add("d-none")
// 		overlay.classList.add("d-none")
// 	}
// })


