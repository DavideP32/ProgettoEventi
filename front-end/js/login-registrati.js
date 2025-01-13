//Messaggio di errore per password non confermata
function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorElement = document.getElementById('password-error');
    if (password !== confirmPassword) {
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
        alert('Registrazione completata!');
    }
}

