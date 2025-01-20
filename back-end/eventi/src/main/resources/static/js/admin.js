function showConfirmation(e, checkboxId, nome) {
	e.preventDefault() // Impedisce il comportamento predefinito della checkbox
	const checkbox = document.getElementById(checkboxId)
	const isChecked = checkbox.checked // Stato attuale della checkbox
	const popup = document.getElementById("popup-promote-admin")
	const popupNome = document.getElementById("popup-username")
	const popupTitolo = document.getElementById("popup-title")
	const icona = document.getElementById("icona-popup-admin")
	popup.classList.remove("d-none")

	//cambio il nome a seconda dell'utente
    
	if (isChecked) {
        popupTitolo.textContent = "Conferma la promozione al ruolo Admin"
        popupNome.innerHTML = `Sei sicuro di voler promuovere <span class="fw-bold">${nome}</span> ad Admin?`
		
	} else {
		popupTitolo.textContent = "Conferma la rimozione del ruolo Admin"
        icona.innerHTML = `<svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6l12 12M6 18L18 6"
            />
            </svg>`
         popupNome.innerHTML = `Sei sicuro di voler rimuovere <span class="fw-bold">${nome}</span> dagli Admin?`
	}

	// Gestione del pulsante di conferma
	document.getElementById("promuovi").onclick = () => {
		checkbox.checked = isChecked
		promoteUser(checkboxId.split("-")[1])
		popup.classList.add("d-none")
	}

	// Gestione del pulsante di annullamento
	document.getElementById("non-promuovi").onclick = () => {
		popup.classList.add("d-none")
		checkbox.checked = !isChecked
	}
}

function promoteUser(userId) {
	fetch(`http://localhost:8080/api/utente/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Errore: ${response.status}`)
			}
			return response.json()
		})
		.then((data) => {
			if (data.ruolo == "RUOLO_UTENTE") {
				console.log(`Admin ${data.nome} degradato ad utente!`)
			} else if (data.ruolo == "RUOLO_ADMIN") {
				console.log(`Utente ${data.nome} promosso a admin!`)
			}
		})
		.catch((error) => console.error("Errore durante la promozione:", error))
}

/* -------------------------------------------------------------------------- */
/*                       PRENDO TUTTI GLI UTENTI DA MOSTRARE                  */
/* -------------------------------------------------------------------------- */
fetch("http://localhost:8080/api/utente")
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		console.log(data)

		const userSection = document.getElementById("userSection")

		data.forEach((user) => {
			const birthDate = new Date(user.dataNascita)

			// Checkata o non checkata a seconda del ruolo
			const isChecked = user.ruolo === "RUOLO_ADMIN" ? "checked" : ""

			userSection.innerHTML += `
                <div class="card border-0">
                    <div class="card-body">
                        <div class="itemside align-items-center">
                            <div class="aside">
                                <div class="d-flex justify-content-between">
                                    <div class="idUtente" style="margin-bottom: 1rem; width: 40px; height: 40px; font-size: larger;">
                                        ${user.nome.charAt(0)}${user.cognome.charAt(0)}
                                    </div>
                                    <div class="text-center">

                                    <div class="d-flex align-items-center gap-3 toggle-container">
                                            <span class="toggle-label">Utente</span>

                                        <label class="toggle-switch">
                                          <input type="checkbox" id="toggle-${user.id}" ${isChecked} onchange="showConfirmation(event, 'toggle-${user.id}', '${user.nome}')">
                                          <span class="slider"></span>
                                        </label>

                                       <span class="toggle-label">Admin</span>
                                    </div>

                                    </div>
                                </div>
                            </div>
                            <div class="info">
                                <div class="d-flex gap-2">
                                    <p class="nome title h6">${user.nome}</p>
                                    <p class="cognome title h6">${user.cognome}</p>
                                </div>
                                <p id="email">
                                    Email: ${user.email} <i class="dot"></i> <a href="#" class="px-2" title="Modifica informazioni"></a>
                                </p>
                                <p id="data-nascita">
                                    Data di nascita: ${birthDate.toLocaleDateString("it-IT", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									})} <i class="dot"></i> <a href="#" class="px-2" title="Modifica informazioni"></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
		})
	})
	.catch((error) => console.error("Errore durante la fetch:", error))

// onclick="promoteUser(${user.id})

/* -------------------------------------------------------------------------- */
/*                       EVENTI IN FASE DI APPROVAZIONE                       */
/* -------------------------------------------------------------------------- */
fetch("http://localhost:8080/api/eventi")
	.then(response =>{
		return response.json();
	})
	.then(data =>{
		const divEventiDaAccettare = document.getElementById("priv-ordini");

		data.forEach(element =>{
			if(element.approvazione == "RICHIESTA"){
				divEventiDaAccettare.innerHTML += `<div class="evento evento-fittizio">
                        <div class="row align-items-center">
                            <div class="col-lg-5 col-md-12 mb-3 mb-lg-0">
                                <img src="${element.url}" class="img-fluid event-img" alt="${element.nome}">
                            </div>
                            <div class="col-lg-7 col-md-12">
                                <a href="">
                                    <h4>${element.nome}</h4>
                                </a>
                                <p><strong>Data:</strong> ${element.dataEvento}</p>
                                <p><strong>Luogo:</strong>${element.luogoEvento}</p>
                                <p>${element.descrizione}</p>
                                <div class="d-flex gap-4 si-no">
                                    <a href="" class="popup-trigger accept"><i class="fa-solid fa-check check accetta"></i></a>
                                    <a href="" class="popup-trigger reject"><i class="fa-solid fa-xmark check rifiuta"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
			}
		})
	})



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
		ruolo: "RUOLO_ADMIN",
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
