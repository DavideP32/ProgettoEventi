// Richiamo il form
const form = document.querySelector('form');
const emailError = document.getElementById('email-error');
const popup = document.getElementById('confirmation-popup');
const popupMessage = popup.querySelector('.message');
const fieldError = document.getElementById('field-error');
const passwordError = document.getElementById('password-error');

form.addEventListener('submit', e => {
    e.preventDefault();

    // Raccolgo i valori dell'input
    const firstName = form.nome.value.trim();
    const surname = form.cognome.value.trim();
    const dateOfBirth = form.birthdate.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form['confirm-password'].value.trim(); 

    
    if (!firstName || !surname || !dateOfBirth || !email || !password || !confirmPassword) {
        // Messaggio di errore per i campi vuoti
        fieldError.style.display = 'block';
        fieldError.textContent = "Per favore compila tutti i campi richiesti.";
        passwordError.style.display = 'none';
        emailError.style.display = 'none';
        return; 
    }

    // Nascondi il messaggio di errore per i campi vuoti
    fieldError.style.display = 'none';

    // Controllo se le password corrispondono
    if (password !== confirmPassword) {
        passwordError.style.display = 'block';
        passwordError.textContent = "Le password non corrispondono!";
        fieldError.style.display = 'none';
        emailError.style.display = 'none';
        return; 
    }

    // Nascondi il messaggio di errore per la password
    passwordError.style.display = 'none';

    //creazione oggetto utente
    const utente = {
        nome: firstName,
        cognome: surname,
        email: email,
        dataNascita: dateOfBirth,
        password: password,
        ruolo: "RUOLO_UTENTE"
    };

    
    fetch("http://localhost:8080/api/utente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utente)
    })
    .then(response => {
        if (response.status === 409) {
            // Se l'email è già registrata, mostra l'errore per l'email
            emailError.style.display = 'block';
            emailError.textContent = "L'email è già registrata. Prova con un'altra.";
            // Nascondi gli altri messaggi di errore
            passwordError.style.display = 'none';
            fieldError.style.display = 'none';
        } else if (response.ok) {
            // Se la registrazione ha successo, mostra il messaggio di conferma
            popupMessage.textContent = 'Registrazione effettuata con successo!';
            popup.classList.remove('d-none');

            setTimeout(() => {
                window.location.replace('http://localhost:8080/login.html');
            }, 1000);
        } else {
            // Gestione di errori non previsti (es. errore del server)
            return response.json().then(data => {
                throw new Error(data.message || "Errore durante la registrazione");
            });
        }
    })
    .catch(error => {
        // Gestione dell'errore generico
        emailError.style.display = 'block';
        emailError.textContent = "Errore durante la registrazione. Riprova.";
        // Nascondi gli altri messaggi di errore
        passwordError.style.display = 'none';
        fieldError.style.display = 'none';
        console.log("Errore:", error);
    });
});
