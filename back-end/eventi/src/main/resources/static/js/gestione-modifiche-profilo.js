/*--------------------------------------------------------------------------------*/
/*                            MODIFICHE DATI PROFILO                              */
/*--------------------------------------------------------------------------------*/

    //Pulsante "Salva modifiche"
    const salvaModificheBtn = document.getElementById("salvaBtn");
    if (salvaModificheBtn) {
        salvaModificheBtn.addEventListener("click", salvaModifiche);
    }

    // Pulsante "Annulla Modifiche"
    const annullaModificheBtn = document.getElementById("annullaBtn");
    if (annullaModificheBtn) {
        annullaModificheBtn.addEventListener("click", annullaModifiche);
    }

function salvaModifiche(e) {
    e.preventDefault();

    const nome = document.getElementById("nomeInput").value;
    const cognome = document.getElementById("cognomeInput").value;
    const email = document.getElementById("emailUtente").value;
    const dataNascita = document.getElementById("data-nascita").value;
    const password = document.getElementById("passwordUtente").value;

    const utenteModificato = {
        nome: nome,
        cognome: cognome,
        dataNascita: dataNascita,
        email: email,
        ruolo: "RUOLO_UTENTE",
        password: password,
        prenotazioni: []
    };
 
    return fetch('http://localhost:8080/api/utente', {
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(utenteModificato)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(err.message ||'Errore durante il salvataggio delle modifiche');
        }
        return response.json();
    })
    .then(data => {
        updateUI(data);
    })
    .catch(error => {
        console.log('Errore', error);
    })
}

function annullaModifiche(e) {
    e.preventDefault();

    verificaSessione()
    .then(utenteData => {
        updateUI(utenteData);
    })
    .catch(error => {
        console.log('Errore durante annullamento delle modifiche', error);
        
    })
}

