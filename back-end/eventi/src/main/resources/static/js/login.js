let form = document.querySelector("form");
let loginButton = document.querySelector(".login-btn"); 

loginButton.addEventListener("click", () => {
    form.submit();  // Invia il form quando il pulsante viene cliccato
});

//Verifica se l'utente è autenticato
function verificaSessione() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/api/utente/verify-session', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                reject('Utente non autenticato');
            } else {
                return response.json();
            }
        })
        .then(data => {
            resolve(data); //Restituisce i dati dell'utente se autenticato
        })
        .catch(error => {
            reject(error); //Errore di autenticazione
        });
    });
}

form.addEventListener("submit", e =>{
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const utente = {
        email: email,
        password: password
    };

    console.log(utente);


    

    fetch("http://localhost:8080/api/utente/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utente),
        credentials: 'include'

    })
    .then(response =>{
        if (!response.ok) {
            throw new Error("Login fallito");
        }
        return response.json()
    })
    .then(utenteData => {  
        console.log('Login riuscito:', utenteData);
        // localStorage.setItem('utente', JSON.stringify(utenteData));
        window.location.replace('http://localhost:5500/front-end/index.html');
    })
    .catch(error => {
        console.error('Errore durante il login:', error);
        alert('Login fallito. Controlla le credenziali.');//questo lo dobbiamo cambiare!!!!!!!!!!!
    });
})

// se l'utente ha già effettuato il login ma in qualche modo tenta di accedere alla pagina di login
document.addEventListener('DOMContentLoaded', () => {
    verificaSessione()
        .then(utenteData => {
            // Se l'utente è autenticato, reindirizza alla homepage
            if (utenteData) {
                window.location.replace('http://localhost:8080/index.html');
                console.log("utente già autenticato. Reindirizzato alla homepage");
            }
        })
        .catch(error => {
            console.log('Utente non autenticato, resta sulla pagina di login.');
        });
});
