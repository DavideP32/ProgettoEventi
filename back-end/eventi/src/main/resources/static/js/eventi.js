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


/* -------------------------------------------------------------------------- */
/*                           CREAZIONE EVENTI DAL DB                          */
/* -------------------------------------------------------------------------- */



fetch("http://localhost:8080/api/eventi")
    .then(response =>{
        return response.json();
    })
    .then(data =>{

        console.log(data);

       

        data.forEach(element => {
            document.getElementById(`${element.tipologia}`).innerHTML +=
            `<div class="row evento align-items-center">
            <div class="col-lg-4 col-md-12 mb-3 mb-lg-0">
                    <img src="${element.percorso}" class="img-fluid event-img" alt="Evento 1">
            </div>
            <div class="col-lg-6 col-md-12">
                <h4>${element.nome}</h4>
                <p><strong>Data:</strong> ${element.dataEvento}</p>
                <p><strong>Luogo:</strong> ${element.luogoEvento}</p>
                <p>${element.descrizione}</p>
                <p class="d-none"><strong>Prezzo:</strong>${element.prezzo}</p>
                <p class="d-none"><strong>Ora:</strong> 20:00</p>
                <p class="d-none"><strong>Mini Motto:</strong> Musica che emoziona e ispira.</p>
                <a href="./evento-selezionato.html?id=1" class="btn btn-gen" data-id="1">Info</a>
            </div>
            </div>`
            
        });
    })