    // Calcolo Prezzo Totale Dinamico
    const prezzoPerPersona = 50;
    document.getElementById('numPersone').addEventListener('input', function() {
        const persone = this.value;
        const totale = persone * prezzoPerPersona;
        document.getElementById('totalPrice').textContent = totale;
    });

    //BTN E POPUP PRENOTAZIONI



    // Popup e errori per la conferma prenotazione
    document.querySelector('.conferma-prenotazione').addEventListener('click', function() {
        const popup = document.getElementById('popup-overlay');
        const form = document.querySelector('form');
        const fieldError = document.getElementById('field-error');
    
        // Messaggio di errore in caso tutti i campi non siano compilati
        form.addEventListener('submit', e => {
            e.preventDefault();
    
            const numeroPersone = form.numPersone.value.trim();
            const nomeCompleto = form.nomeCompleto.value.trim();
            const email = form.email.value.trim();
    
            // Espressione regolare per email valida
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Espressione regolare per nome completo (almeno due parole)
            const nomeCompletoRegex = /^[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+$/;
    
            if (!numeroPersone || !nomeCompleto || !email) {
                fieldError.style.display = 'block';
                fieldError.textContent = "Per favore compila tutti i campi richiesti.";
                return;
            }
    
            if (!emailRegex.test(email)) {
                fieldError.style.display = 'block';
                fieldError.textContent = "Per favore inserisci un'email valida.";
                return;
            }
    
            if (!nomeCompletoRegex.test(nomeCompleto)) {
                fieldError.style.display = 'block';
                fieldError.textContent = "Per favore inserisci nome e cognome validi (almeno due parole).";
                return;
            }
    
            // Se tutte le validazioni sono superate
            fieldError.style.display = 'none'; // Nasconde eventuali errori precedenti
            popup.classList.remove('d-none'); // Mostra il popup
        });
    });
    





        // const utente = {
        //     totalePersone : numeroPersone,
        //     nome : nomeCompleto,
        //     email : email,
        //     ruolo: "RUOLO_UTENTE"
        // };

        // fetch("http://localhost:8080/api/utente", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(utente)
        // })

    //     .then(response => {
    //         if (response.ok) {
    //             popup.classList.remove('d-none');
    //             prenotazione.classList.add('d-none');

    //             setTimeout(() => {
    //                 window.location.replace('http://localhost:8080/eventi-generici.html');
    //             }, 2000);
    //         } else {
    //             // Gestione di errori non previsti (es. errore del server)
    //             return response.json().then(data => {
    //                 throw new Error(data.message || "Errore durante la registrazione");
    //             });
    //         }
    //     });
    // });