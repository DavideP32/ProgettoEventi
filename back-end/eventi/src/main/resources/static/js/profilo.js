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






// Selezione degli elementi
const btnModifica = document.querySelector('.btn-save'); // Bottone Modifica Profilo
const btnAnnulla = document.querySelector('.btn-cancel'); // Bottone Annulla
const btnSalva = document.querySelector('.profile-container.d-none .btn-save'); // Bottone Salva nel form modificabile

const formNonModificabile = document.querySelector('.profile-container:not(.d-none)');
const formModificabile = document.querySelector('.profile-container.d-none');




// Funzione per mostrare con animazione
function mostraConAnimazione(element) {
    element.classList.remove('d-none');
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

// Funzione per nascondere con animazione
function nascondiConAnimazione(element) {
    element.style.opacity = '1';
    element.style.transition = 'opacity 0.3s ease-in-out';
    element.style.opacity = '0';
    setTimeout(() => {
        element.classList.add('d-none');
    }, 500); // Tempo per completare l'animazione
}

// Evento per il bottone "Modifica profilo"
btnModifica.addEventListener('click', () => {
    nascondiConAnimazione(formNonModificabile);
    setTimeout(() => mostraConAnimazione(formModificabile), 500); 
});

// Evento per il bottone "Annulla"
btnAnnulla.addEventListener('click', () => {
    nascondiConAnimazione(formModificabile);
    setTimeout(() => mostraConAnimazione(formNonModificabile), 500); 
});