fetch("http://localhost:8080/api/eventi")
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		console.log(data)

		let paginaCorrente = window.location.pathname

		console.log(paginaCorrente)

		switch (paginaCorrente) {
			case "/arteCultura.html":
				updateHtml(data, "ARTE")
				break
			case "/cinemaTeatro.html":
				updateHtml(data, "TEATRO_CINEMA")
				break
			case "/foodDrink.html":
				updateHtml(data, "CIBO")
				break
			case "/festeSagre.html":
				console.log("ciao")
				updateHtml(data, "FESTE_SAGRE")
				break
			case "/sport.html":
				updateHtml(data, "SPORT")
				break
			case "/musica.html":
				updateHtml(data, "MUSICA")
				break
			default:
				break
		}

		let infoButton = document.querySelectorAll(".info-bottone")
		infoButton.forEach((button) => {
			button.addEventListener("click", (e) => {
				e.preventDefault()
				const eventId = button.getAttribute("data-id"); 
				const eventoSelezionato = data.find((event) => event.id == eventId);
				if (eventoSelezionato) {
					console.log("Oggetto selezionato:", eventoSelezionato)
					// Esegui altre azioni, come mostrare un popup o navigare a un'altra pagina
					localStorage.setItem("eventoSelezionato", JSON.stringify(eventoSelezionato));
					window.location.href = "evento-selezionato.html";
				} else {
					console.error("Oggetto non trovato per id:", eventId)
				}
			})
		})
	})

function updateHtml(data, tipologia) {
	data.forEach((element) => {
		const dataEvent = new Date(`${element.dataEvento}`)
		if (element.tipologia == `${tipologia}`) {
			document.getElementById("tuttiEventi").innerHTML += `<div class="row evento align-items-center">
                <div class="col-lg-4 col-md-12 mb-3 mb-lg-0">
                    <img src="${element.url}" class="img-fluid event-img" alt="Evento Artistico 1">
                </div>
                <div class="col-lg-6 col-md-12">
                    <h4 class="nome-evento">${element.nome}</h4>
                    <p><strong>Data:</strong> ${dataEvent.toLocaleDateString("it-IT", {
						day: "2-digit",
						month: "long",
						year: "numeric",
					})}</p>
                    <p><strong>Luogo:</strong> ${element.luogoEvento}</p>
                    <p>${element.descrizione}</p>
                    <p class="d-none"><strong>Prezzo:</strong> ${element.prezzo}</p>
                    <p class="d-none"><strong>Data:</strong> 10:00</p>
                    <p class="d-none"><strong>Mini Motto:</strong> Scopri l'arte contemporanea nel cuore di Milano.</p>
                    <a href="" class="btn btn-gen info-bottone" data-id="${element.id}">Info</a>
                </div>
            </div>`
		}
	})
}
