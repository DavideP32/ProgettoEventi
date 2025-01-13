// //Messaggio di errore per password non confermata
// function validatePassword() {
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirm-password').value;
//     const errorElement = document.getElementById('password-error');
//     if (password !== confirmPassword) {
//         errorElement.style.display = 'block';
//     } else {
//         errorElement.style.display = 'none';
//         alert('Registrazione completata!');
//     }
// }

// Richiamo il form
const form = document.querySelector('form');

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

    console.log(utente);
    

    fetch("http://localhost:8080/api/utente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utente)

    })
    .then(response =>{
        window.location.replace('http://localhost:5500/front-end/index.html');
        return response.json();
    })

});
