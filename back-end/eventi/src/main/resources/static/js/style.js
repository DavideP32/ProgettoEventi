//Navbar che quando scende cambia colore
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('bg-transparent');
    }
});


//BARRA DI RICERCA
const events = [
    "Serata Vintage Party 80's",
    "Festival del Cinema",
    "Food & Wine Experience",
    "Concerto Irama-live 2025",
    "Esposizione di Auto d'Epoca",
    "Festival del Rock",
    "Squid Game Events",
];

//Funzione per cercare gli eventi
function cercaEventi() {
    const input = document.querySelector('.form-control').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');

    // Reset dei risultati
    searchResults.innerHTML = ""; 
    searchResults.style.display = "none"; // Nasconde i risultati per default

    if (input.trim() === "") return; // Se l'input è vuoto, non fa nulla

    const eventiFiltrati = events.filter(event => event.toLowerCase().includes(input));

    if (eventiFiltrati.length > 0) {
        eventiFiltrati.forEach(event => {
            const suggerimento = document.createElement('div');
            suggerimento.className = 'suggestion-item p-2';
            suggerimento.textContent = event;

            // Aggiungi evento click per selezionare il suggerimento
            suggerimento.addEventListener('click', () => {
                document.querySelector('.form-control').value = event;
                searchResults.style.display = "none"; // Nasconde i suggerimenti
            });

            searchResults.appendChild(suggerimento);
        });
        
        searchResults.style.display = "block"; // Mostra i risultati
    } else {
        const notResult = document.createElement('div');
        notResult.className = 'no-result text-warning p-2';
        notResult.textContent = 'Nessun risultato trovato';
        searchResults.appendChild(notResult);
        searchResults.style.display = "block"; // Mostra comunque il contenitore
    }
}


