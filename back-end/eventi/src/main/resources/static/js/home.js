window.addEventListener('load', () => {
    const registrationSuccess = localStorage.getItem('registrationSuccess');

    if (registrationSuccess === 'true') {
        // Mostra il bollino o il messaggio di successo
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Registrazione completata con successo!';
        successMessage.classList.add('template d-none'); 
        document.body.appendChild(successMessage);

        // Rimuovi il messaggio di successo dopo un po' (opzionale)
        setTimeout(() => {
            successMessage.remove();
            localStorage.removeItem('registrationSuccess');
        }, 5000); // Dopo 5 secondi, rimuovi il messaggio
    }
});
