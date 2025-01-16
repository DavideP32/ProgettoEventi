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


//GESTIONE LOCALSTORAGE

