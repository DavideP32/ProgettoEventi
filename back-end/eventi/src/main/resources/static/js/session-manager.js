document.addEventListener("DOMContentLoaded", () => {
	verificaSessione()
		.then((utenteData) => {
			updateUI(utenteData)
			if(utenteData.ruolo == 'RUOLO_UTENTE' && window.location.pathname == '/admin.html'){
				alert('non puoi accedere alla pagina admin, sei solo un utente');
				window.location.replace("http://localhost:8080/index.html");
			}
		})
		.catch((error) => {
			console.log("Utente non autenticato", error)
			updateUI(null)
		})

	//pulsante di logout
	const logoutBtn = document.getElementById("logout")
	if (logoutBtn) {
		logoutBtn.addEventListener("click", () => {
			logout()
		})
	}
})

console.log(window.location.pathname)
//Prendiamo la sessione dell'utente se è autenticato
function verificaSessione() {
	return fetch("http://localhost:8080/api/utente/isLogged", {
		method: "GET",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((response) => {
		if (!response.ok) {
			//const storedUser = localStorage.getItem('utente');
			/*if (storedUser) {
                return JSON.parse(storedUser);
            }*/
			throw new Error("Utente non autenticato")
		}
		return response.json().then((data) => {
			console.log(data)
			return data
		})
	})
}

//aggiorniamo l'ui in base all'autenticazione
function updateUI(utenteLoggato) {
	const bollino = document.getElementById("bollino-profilo")
	const loginText = document.querySelector(".text-end")
	const inizialeNome = document.querySelectorAll(".idUtente")
	
	// console.log(typeof utenteLoggato.ruolo)
	console.log(inizialeNome);
	
	if (utenteLoggato) {
		loginText.classList.add("d-none")
		bollino.classList.remove("d-none")
		
		console.log(utenteLoggato);

		const linkProfilo = document.querySelector(".linkProfilo")
		if (utenteLoggato.ruolo === 'RUOLO_UTENTE') {
			linkProfilo.innerHTML = `<a class="dropdown-item" href="profilo.html">Profilo</a>`
		}else if (utenteLoggato.ruolo === 'RUOLO_ADMIN') {
			linkProfilo.innerHTML = `<a class="dropdown-item" href="admin.html">Pannello</a>`
		}
		

		const dataNasc = new Date(`${utenteLoggato.dataNascita}`)

		console.log(utenteLoggato.nome)

		inizialeNome.forEach((element) => {
			element.textContent = `${utenteLoggato.nome[0].toUpperCase()}`;
		})

		if (window.location.pathname == "/profilo.html" || window.location.pathname == "/admin.html") {
			const nomeUtente = document.querySelectorAll(".nome")
			const cognomeUtente = document.querySelectorAll(".cognome")
			const emailUtente = document.querySelectorAll(".email")
			// const email = document.getElementById("email")
			const dataDiNascita = document.querySelectorAll(".dataNascita")
			const paypalDi = document.querySelectorAll(".paypal-di-chi")
			

			paypalDi.forEach((element) => {
				element.innerHTML = `
				<b class="mx-2 text-muted">
				<i class="fa-brands fa-cc-paypal"></i>
				</b>
				PayPal di ${utenteLoggato.nome}`;
			})

			nomeUtente.forEach((element) => {
				element.textContent = `${utenteLoggato.nome}`
			})

			cognomeUtente.forEach((element) => {
				element.textContent = `${utenteLoggato.cognome}`
			})

			emailUtente.forEach((element) => {
				element.textContent = `${utenteLoggato.email}`
			})

			dataDiNascita.forEach((element) => {
				element.textContent = `Data di nascita ${dataNasc.toLocaleDateString("it-IT", {
					day: "2-digit",
					month: "long",
					year: "numeric",
				})}`
			})

			document.getElementById("nomeInput").value = `${utenteLoggato.nome}`
			document.getElementById("cognomeInput").value = `${utenteLoggato.cognome}`
			document.getElementById("emailUtente").value = `${utenteLoggato.email}`
			document.getElementById("data-nascita").value = `${utenteLoggato.dataNascita}`
		}
	}
}

//funzione per il pulsante logout
function logout() {
	return fetch("http://localhost:8080/api/utente/logout", {
		method: "POST",
		// credentials: 'include'
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Errore durante il logout")
			}
			updateUI(null)
			window.location.replace("http://localhost:8080/login.html")
		})
		.catch((error) => {
			console.error("Errore durante il logout:", error)
		})
}

