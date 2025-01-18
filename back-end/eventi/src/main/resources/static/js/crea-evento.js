
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Preleva i valori del form
	const nomeEvento = form.nomeEvento.value.trim();
	const descrizioneEvento = form.descrizioneEvento.value.trim();
	const categoriaEvento = form.categoriaEvento.value.trim();
	const dataOraEvento = form.dataOraEvento.value.trim();
	const immagineEvento = form.immagineEvento.files[0];
	const luogoEvento = form.luogoEvento.value.trim();
	const prezzo = form.prezzoEvento.value.trim();
	const emailEvento = form.emailEvento.value.trim();

	// Crea un oggetto FormData
	const formData = new FormData();
	formData.append("nome", nomeEvento);
	formData.append("descrizione", descrizioneEvento);
	formData.append("tipologia", categoriaEvento);
	formData.append("dataEvento", dataOraEvento);
	formData.append("luogoEvento", luogoEvento);
	formData.append("prezzo", prezzo);
	formData.append("email", emailEvento);
	formData.append("caratteristiche", "ENTRATA_LIBERA");
	formData.append("coordinateGPS", "-15.860857, -60.724130");
	formData.append("posti", 200);
	formData.append("disponibilita", true);
	if (immagineEvento) {
		formData.append("image", immagineEvento);
	}

	// Esegui la richiesta POST
	fetch("http://localhost:8080/api/eventi/upload", {
		method: "POST",
		body: formData, // Invia FormData direttamente
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Errore nella creazione dell'evento");
			}
		})
		.then((data) => {
			// Mostra messaggio di successo
			console.log("Evento creato con successo:", data);
			// Eventuale popup di conferma
			const accettaEvento = document.getElementById("acceptEvento");
			const creazioneEvento = document.getElementById("creaEvento");
			accettaEvento.classList.remove("d-none");
			creazioneEvento.classList.add("d-none");

			// Redireziona alla pagina del profilo o un'altra pagina
			// window.location.replace("http://localhost:8080/profilo.html");
		})
		.catch((err) => {
			console.error("Errore:", err);
		});
});