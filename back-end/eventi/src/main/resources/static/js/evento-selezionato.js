// JavaScript per mostrare la navbar con effetto di comparsa graduale
const navbar = document.getElementById('myNavbar');

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const maxOpacityScroll = 200; // Altezza massima di scroll per opacità massima

    // Calcola l'opacità in base allo scroll (da 0 a 1)
    let opacity = Math.min(scrollY / maxOpacityScroll, 1); 

    if (scrollY > 50) {
        navbar.classList.remove('d-none'); // Rimuove la classe d-none
        navbar.style.opacity = opacity;    // Aumenta progressivamente l'opacità
        navbar.classList.add('visible');   
    } else {
        navbar.style.opacity = 0;          // Riduce l'opacità gradualmente
        navbar.classList.remove('visible');
        setTimeout(() => {
            navbar.classList.add('d-none'); // Nasconde dopo l'animazione
        }, 500); // Attendi la fine dell'animazione (0.5s)
    }
});



//Js per le stelline che cadono dall'alto
const sparkleContainer = document.querySelector('.sparkle-container');

function createGoldSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Posizionamento casuale per un effetto elegante
    sparkle.style.left = `${Math.random() * window.innerWidth}px`;
    sparkle.style.top = `${Math.random() * window.innerHeight * 0.5}px`; 
    sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`; 
    
    sparkleContainer.appendChild(sparkle);

    // Rimuove la scintilla dopo l'animazione
    setTimeout(() => {
        sparkle.remove();
    }, 4000);
}

// Genera scintille dorate ogni 300ms
setInterval(createGoldSparkle, 300);


/* -------------------------------------------------------------------------- */
/*                            GESTIONE LOCALSTORAGE                           */
/* -------------------------------------------------------------------------- */

const eventoSel = localStorage.getItem("eventoSelezionato");

document.addEventListener("DOMContentLoaded", () => {
    EventoSelezionatoUI(JSON.parse(eventoSel));
    // localStorage.removeItem('eventoSelezionato');
})


function EventoSelezionatoUI(eventoSelezionato) {
    const titolo = document.getElementById("titolo-evento");
    const descrizione = document.getElementById('descrizione-evento');
    const data = document.getElementById('data-evento');
    const luogo = document.getElementById('luogo-evento');
    const immagine = document.querySelector('.hero');
    const posti = document.getElementById('posti-evento');
    const prezzo = document.getElementById('prezzo-evento');
    const email = document.getElementById('email-evento');
    const linkMappe = document.getElementById("mappa");
    const descrizioneLunga = document.getElementById("descrizione-lunga");

    const dataEvent = new Date(`${eventoSelezionato.dataEvento}`);

    titolo.textContent = `${eventoSelezionato.nome}`;
    descrizione.textContent = `${eventoSelezionato.motto}`;
    data.textContent = `${dataEvent.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })}`;
    luogo.textContent = `${eventoSelezionato.luogoEvento}`;
    posti.textContent = `Affrettati! Rimangono solo ${eventoSelezionato.posti} posti`;
    descrizioneLunga.textContent = `${eventoSelezionato.descrizione}`;
    immagine.style.background = `url(${eventoSelezionato.url}) center/cover no-repeat`;
    if(Number(eventoSelezionato.prezzo) > 0){
        prezzo.textContent = `Prezzo: ${eventoSelezionato.prezzo}€ a persona`;
    } else{
        prezzo.textContent = `Prezzo: Gratuito`;
    }
    email.textContent = `${eventoSelezionato.email}`;

    console.log(typeof eventoSelezionato.luogoEvento);

    let ricercaMaps = eventoSelezionato.luogoEvento.replace(" ", "+")

    linkMappe.href = `https://www.google.com/maps?q=${ricercaMaps}`;
}


