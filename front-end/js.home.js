// Per far comparire testo e bottone qualche istante dopo l'apertura della pagina
window.onload = function() {
    setTimeout(function() {
        document.getElementById('titolo').classList.add('visible');
    }, 1000);

    setTimeout(function() {
        document.getElementById('testo').classList.add('visible');
    }, 2000);

    setTimeout(function() {
        document.getElementById('bottone').classList.add('visible');
    }, 3000);
}