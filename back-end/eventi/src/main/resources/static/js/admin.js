    // Funzione per aprire il popup e mostrare i dati dell'utente
    function openPromotePopup(nome, cognome) {
        const popup = document.getElementById('popup-promote-admin');
        const usernameField = document.getElementById('popup-username');

        usernameField.textContent = `${nome} ${cognome}`;
        popup.classList.remove('d-none');
    }

    // Funzione per chiudere il popup
    function closePopup() {
        const popup = document.getElementById('popup-promote-admin');
        popup.classList.add('d-none');
    }