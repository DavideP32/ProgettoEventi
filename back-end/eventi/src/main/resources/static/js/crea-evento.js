const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
	e.preventDefault()

    //mettere le funzioni per far comparire il popup di conferma!!!

	const nomeEvento = form.nomeEvento.value.trim();
	const descrizioneEvento = form.descrizioneEvento.value.trim();
	const categoriaEvento = form.categoriaEvento.value.trim();
	const dataOraEvento = form.dataOraEvento.value.trim();
	const luogoEvento = form.luogoEvento.value.trim();
	const prezzo = form.prezzoEvento.value.trim();
	const telefono = form.telefonoEvento.value.trim();
	const emailEvento = form.emailEvento.value.trim();

	let evento = {
		tipologia: categoriaEvento,
		caratteristiche: "ENTRATA_LIBERA",
		nome: nomeEvento,
		descrizione: descrizioneEvento,
		luogoEvento: luogoEvento,
		coordinateGPS: "-15.860857, -60.724130",
		posti: 200,
		disponibilita: true,
		dataEvento: dataOraEvento,
		email: emailEvento,
		prezzo: prezzo
	}

	fetch("http://localhost:8080/api/eventi", {
		method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
	})
    .then(response =>{
        console.log(response.json());
        //mettere un popup "l'evento è stato inserito correttamente"
        // quando viene premuto ok sul popup far partire sto metodo:
        window.location.replace("http://localhost:8080/profilo.html");
    })
    .catch(err=>{
        console.log("errore!");
    })
})
