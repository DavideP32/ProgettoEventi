/* -------------------------------------------------------------------------- */
/*                           CREAZIONE EVENTI DAL DB                          */
/* -------------------------------------------------------------------------- */



fetch("http://localhost:8080/api/eventi")
    .then(response =>{
        return response.json();
    })
    .then(data =>{

        console.log(data);


        let counter = 1;

        data.forEach(element => {
            if(counter < 13){
            const dataEvent = new Date(`${element.dataEvento}`);
            document.getElementById(`${element.tipologia}`).innerHTML +=
            `<div class="row evento align-items-center">
            <div class="col-lg-4 col-md-12 mb-3 mb-lg-0">
                    <img src="${element.url}" class="img-fluid event-img" alt="Evento 1">
            </div>
            <div class="col-lg-6 col-md-12">
                <h4>${element.nome}</h4>
                <p><strong>Data:</strong> ${dataEvent.toLocaleDateString('it-IT', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}</p>
                <p><strong>Luogo:</strong> ${element.luogoEvento}</p>
                <p>${element.descrizione}</p>
                <p class="d-none"><strong>Prezzo:</strong>${element.prezzo}</p>
                <p class="d-none"><strong>Ora:</strong> 20:00</p>
                <p class="d-none"><strong>Mini Motto:</strong> Musica che emoziona e ispira.</p>
                <a href="evento-selezionato.html" class="btn btn-gen info-bottone" data-id="${element.id}">Info</a>
            </div>
            </div>`;
            
                counter++;
            }
        });

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