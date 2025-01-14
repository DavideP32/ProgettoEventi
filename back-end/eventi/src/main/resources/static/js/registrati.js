// Richiamo il form
const form = document.querySelector('form');
const emailError = document.getElementById('email-error');
const popup = document.getElementById('confirmation-popup');
const popupMessage = popup.querySelector('.message');

form.addEventListener('submit',  e => {

    e.preventDefault();

    //Raccolgo valori dell'input
    
    const firstName = form.nome.value.trim();
    const surname = form.cognome.value.trim();
    const dateOfBirth = form.birthdate.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
   
    console.log(surname);
    

    //creazione oggetto utente
    const utente = {
        nome: firstName,
        cognome: surname,
        email: email,
        dataNascita: dateOfBirth,
        password: password,
        ruolo: "RUOLO_UTENTE"
    };

    emailError.style.display = 'none';
    

    fetch("http://localhost:8080/api/utente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utente)

    })
    .then(response => {
        if (response.status === 409) {
            emailError.style.display = 'block';
            emailError.textContent = "L'email è già registrata. Prova con un'altra.";
        } else if (response.ok) {

            popupMessage.textContent = 'Registrazione effettuata con successo!';
            popup.classList.remove('d-none');

            setTimeout(() => {
                window.location.replace('http://localhost:8080/login.html');
            }, 1000);

            // localStorage.setItem('registrationSuccess', 'true');

            // window.location.replace('http://localhost:8080/login.html');
        } else {
            return response.json().then(data => {
                throw new Error(data.message || "Errore durante la registrazione")
            });
        }
        
    })
    .catch(error => {
        document.getElementById("email-error").style.display = "block";
        console.log("Errore:", error);
    });

});
