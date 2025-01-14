document.addEventListener('DOMContentLoaded', () => {
    verificaSessione()
        .then(utenteData => {
            updateUI(utenteData);
        })
        .catch(error => {
            console.log('Utente non autenticato');
            updateUI(null);
        });

    //pulsante di logout
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout();
        });
    }
});

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
            const storedUser = localStorage.getItem('utente');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
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
    const loginText = document.getElementById("login-text");
    const registrazioneText = document.getElementById("registrazione-text");
    const inizialeNome = document.getElementById("nomeUtente");
    // const inizialeNomeProfilo = document.getElementById("userBadgeProfilo");

    if(utenteLoggato) {
        loginText.classList.add("d-none");
        registrazioneText.classList.add("d-none");
        bollino.classList.remove("d-none");
        inizialeNome.textContent = `${utenteLoggato.nome[0].toUpperCase()}`;
        // inizialeNomeProfilo.textContent = `${utenteLoggato.nome[0].toUpperCase()}`;
    }else {
        loginText.classList.remove("d-none");
        registrazioneText.classList.remove("d-none");
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




//Funzione per popup
// Definizione del frammento HTML per il popup
const popupHTML = `

    <!-- Pop-up -->
    <div class="card">
      <div class="header">
        <div class="image">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            ></path>
          </svg>
        </div>
        <div class="content">
          <span class="title">MODIFICHE</span>
          <p class="message">
            Sei sicuro di voler modificare il tuo account? 
          </p>
        </div>
        <div class="actions">
          <button type="button" class="desactivate">Salva</button>
          <button type="button" class="cancel">Annulla</button>
        </div>
      </div>
    </div>
`;

// Funzione per aggiungere il popup al DOM
function showPopup() {
  document.body.insertAdjacentHTML('beforeend', popupHTML);
  console.log('hola');
  
}

// Puoi richiamare questa funzione ovunque serva
showPopup();