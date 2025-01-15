document.addEventListener('DOMContentLoaded', () => {
    verificaSessione()
        .then(utenteData => {
            updateUI(utenteData);
        })
        .catch(error => {
            console.log('Utente non autenticato', error);
            updateUI(null);
        });

    //pulsante di logout
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout();
        });
    }
})
console.log(window.location.pathname);
//Prendiamo la sessione dell'utente se è autenticato
function verificaSessione() {
    return fetch('http://localhost:8080/api/utente/isLogged', {
        method: 'GET',
        credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            //const storedUser = localStorage.getItem('utente');
            /*if (storedUser) {
                return JSON.parse(storedUser);
            }*/
            throw new Error('Utente non autenticato');
        }
        return response.json().then(data =>{
            console.log(data);
            return data;
        });
    });
}

//aggiorniamo l'ui in base all'autenticazione
function updateUI(utenteLoggato) {
    const bollino = document.getElementById("bollino-profilo");
    const loginText = document.querySelector(".text-end");
    const inizialeNome = document.querySelectorAll(".idUtente");
    const nomeUtente = document.querySelectorAll(".nome");
    const cognomeUtente = document.querySelectorAll(".cognome");
    const emailUtente = document.querySelectorAll(".email");
    const dataDiNascita = document.querySelectorAll(".dataNascita");


    
    console.log(inizialeNome);

    if(utenteLoggato) {
        loginText.classList.add("d-none");
        bollino.classList.remove("d-none");

        inizialeNome.forEach(element => {
            element.textContent = `${utenteLoggato.nome[0].toUpperCase()}`;
        });

        if (window.location.pathname == "/profilo.html"){

        
        nomeUtente.forEach(element => {
            element.textContent = `${utenteLoggato.nome}`;
        });

        cognomeUtente.forEach(element => {
            element.textContent = `${utenteLoggato.cognome}`;
        });

        emailUtente.forEach(element => {
            element.textContent = `${utenteLoggato.email}`;
        });

        dataDiNascita.forEach(element => {
            element.textContent = `${utenteLoggato.dataNascita}`;
        });

        document.getElementById ('nomeInput').value = `${utenteLoggato.nome}`;
        document.getElementById ('cognomeInput').value = `${utenteLoggato.cognome}`;
        document.getElementById ('emailUtente').value = `${utenteLoggato.email}`;
        document.getElementById ('data-nascita').value = `${utenteLoggato.dataNascita}`;
    }
        
    }else {
        loginText.classList.remove("d-none");
        bollino.classList.add("d-none");
    }

}



//funzione per il pulsante logout
function logout() {
    return fetch('http://localhost:8080/api/utente/logout', {
        method: 'POST',
        // credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore durante il logout');
        }
        updateUI(null);
        window.location.replace('http://localhost:8080/login.html');
    })
    .catch(error => {
        console.error('Errore durante il logout:', error);
    });
}

/*--------------------------------------------------------------------------------*/
/*                            GESTIONE EVENTI                                     */
/*--------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('id'); 

    if (eventoId) {
        getEventoDetails(eventoId)  // Recupera i dettagli dell'evento
            .then(eventoData => {
                updateEventoUI(eventoData);  // Aggiorna l'UI con i dettagli
            })
            .catch(error => {
                console.log('Errore nel recupero dei dettagli dell\'evento:', error);
            });
    } else {
        console.log('ID evento mancante');
    }
});

function getEventoDetails(id) {
    return fetch(`http://localhost:8080/api/evento/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel recupero dei dettagli dell\'evento');
        }
        return response.json();
    });
}

function updateEventoUI(eventoData) {
    // Aggiorna l'interfaccia con i dettagli dell'evento
    const titoloEvento = document.getElementById('titolo-evento');
    const descrizioneEvento = document.getElementById('descrizione-evento');
    const dataEvento = document.getElementById('data-evento');
    const luogoEvento = document.getElementById('luogo-evento');
    const immagineEvento = document.getElementById('immagine-evento');

    titoloEvento.textContent = eventoData.titolo;
    descrizioneEvento.textContent = eventoData.descrizione;
    dataEvento.textContent = eventoData.data;
    luogoEvento.textContent = eventoData.luogo;
    immagineEvento.src = eventoData.immagine;
}


