fetch("http://localhost:8080/api/eventi")
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		console.log(data)

		let paginaCorrente = window.location.pathname;

        console.log(paginaCorrente);

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
                console.log("ciao");
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
	})

function updateHtml(data, tipologia) {
	data.forEach((element) => {
        console.log(tipologia);
		if (element.tipologia == `${tipologia}`) {
			document.getElementById("tuttiEventi").innerHTML += `<div class="row evento align-items-center">
                <div class="col-lg-4 col-md-12 mb-3 mb-lg-0">
                    <img src="${element.percorso}" class="img-fluid event-img" alt="Evento Artistico 1">
                </div>
                <div class="col-lg-6 col-md-12">
                    <h4>${element.nome}</h4>
                    <p><strong>Data:</strong> ${element.data}</p>
                    <p><strong>Luogo:</strong> ${element.luogoEvento}</p>
                    <p>${element.descrizione}</p>
                    <p class="d-none"><strong>Prezzo:</strong> ${element.prezzo}</p>
                    <p class="d-none"><strong>Ora:</strong> 10:00</p>
                    <p class="d-none"><strong>Mini Motto:</strong> Scopri l'arte contemporanea nel cuore di Milano.</p>
                    <a href="./evento-selezionato.html" class="btn btn-gen">Info</a>
                </div>
            </div>`
		}
	})
}
