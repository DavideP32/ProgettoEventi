// Navbar che cambia colore e bottone che si rimpicciolisce quando si scorre
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('header');
    let navbarToggler = document.querySelector('.navbar-toggler');
    
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('bg-transparent');
        navbarToggler.classList.add('shrink-button'); // Rimpicciolisce il bottone
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('bg-transparent');
        navbarToggler.classList.remove('shrink-button'); // Ripristina la dimensione
    }
});



// //BARRA DI RICERCA
// const evento = [
//     "Serata Vintage Party 80's",
//     "Festival del Cinema",
//     "Food & Wine Experience",
//     "Concerto Irama-live 2025",
//     "Esposizione di Auto d'Epoca",
//     "Festival del Rock",
//     "Squid Game Events",
// ];

// //Funzione per cercare gli eventi
// function cercaEventi() {
//     const input = document.querySelector('.form-control').value.toLowerCase();
//     const searchResults = document.getElementById('searchResults');

//     // Reset dei risultati
//     searchResults.innerHTML = ""; 
//     searchResults.style.display = "none"; // Nasconde i risultati per default

//     if (input.trim() === "") return; // Se l'input è vuoto, non fa nulla

//     const eventiFiltrati = evento.filter(event => event.toLowerCase().includes(input));

//     if (eventiFiltrati.length > 0) {
//         eventiFiltrati.forEach(event => {
//             const suggerimento = document.createElement('div');
//             suggerimento.className = 'suggestion-item p-2';
//             suggerimento.textContent = event;

//             // Aggiungi evento click per selezionare il suggerimento
//             suggerimento.addEventListener('click', () => {
//                 document.querySelector('.form-control').value = event;
//                 searchResults.style.display = "none"; // Nasconde i suggerimenti
//             });

//             searchResults.appendChild(suggerimento);
//         });
        
//         searchResults.style.display = "block"; // Mostra i risultati
//     } else {
//         const notResult = document.createElement('div');
//         notResult.className = 'no-result text-warning p-2';
//         notResult.textContent = 'Nessun risultato trovato';
//         searchResults.appendChild(notResult);
//         searchResults.style.display = "block"; // Mostra comunque il contenitore
//     }
// }







// // RRICERCA CON DB
// // Lista eventi simulati per testare la ricerca
// let evento = [
//     { name: "Concerto Rock Night", url: "musica.html" },
//     { name: "Festival della Musica Jazz", url: "musica.html" },
//     { name: "Esibizione di Piano", url: "musica.html" },
//     { name: "Serata Acustica", url: "musica.html" },
//     { name: "Concerto Irama-live 2025", url: "musica.html" },
//     { name: "Festival del Rock", url: "musica.html" },
//     { name: "Vintage Music Party", url: "musica.html" }
// ];

// // Funzione per cercare eventi
// function cercaEventi() {
//     const input = document.querySelector('#eventSearch');
//     const searchResults = document.getElementById('searchResults');

//     // Reset dei risultati
//     searchResults.innerHTML = "";
//     searchResults.style.display = "none"; // Nasconde i risultati per default

//     const inputValue = input.value.toLowerCase();

//     if (inputValue.trim() === "") return; // Se l'input è vuoto, non fa nulla

//     const eventiFiltrati = evento.filter(event => event.name.toLowerCase().includes(inputValue));

//     if (eventiFiltrati.length > 0) {
//         eventiFiltrati.forEach(event => {
//             const suggerimento = document.createElement('div');
//             suggerimento.className = 'suggestion-item p-2';
//             suggerimento.textContent = event.name;

//             // Aggiungi evento click per selezionare il suggerimento
//             suggerimento.addEventListener('click', () => {
//                 input.value = event.name;
//                 searchResults.style.display = "none"; // Nasconde i suggerimenti
//             });

//             searchResults.appendChild(suggerimento);
//         });

//         searchResults.style.display = "block"; // Mostra i risultati
//     } else {
//         const notResult = document.createElement('div');
//         notResult.className = 'no-result text-warning p-2';
//         notResult.textContent = 'Nessun risultato trovato';
//         searchResults.appendChild(notResult);
//         searchResults.style.display = "block"; // Mostra comunque il contenitore
//     }
// }

// // Listener per l'input e il tasto Enter
// document.addEventListener('DOMContentLoaded', () => {
//     const input = document.querySelector('#eventSearch');

//     // Ascolta l'input per cercare eventi
//     input.addEventListener('input', cercaEventi);

//     // Ascolta il tasto Enter per navigare
//     input.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
//             const selectedEvent = input.value;
//             const matchedEvent = evento.find(e => e.name.toLowerCase() === selectedEvent.toLowerCase());

//             if (matchedEvent && matchedEvent.url) {
//                 // Naviga alla pagina dell'evento
//                 window.location.href = matchedEvent.url;
//             } else {
//                 alert('Evento non trovato!');
//             }
//         }
//     });
// });
