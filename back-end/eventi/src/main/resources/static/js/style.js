// Navbar che cambia colore e bottone che si rimpicciolisce quando si scorre

if(window.location.pathname != "/admin.html" && window.location.pathname != "/profilo.html"){

    window.addEventListener("scroll", function () {
        let navbar = document.querySelector("header")
        let navbarToggler = document.querySelector(".navbar-toggler")
    
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled")
            navbar.classList.remove("bg-transparent")
            navbarToggler.classList.add("shrink-button") // Rimpicciolisce il bottone
        } else {
            navbar.classList.remove("navbar-scrolled")
            navbar.classList.add("bg-transparent")
            navbarToggler.classList.remove("shrink-button") // Ripristina la dimensione
        }
    })
}

/* -------------------------------------------------------------------------- */
/*                              BARRA DI RICERCA                              */
/* -------------------------------------------------------------------------- */

// questo serve ad evitare che la fetch venga eseguita continuamente: si chiama debouncing
// Elementi del DOM
const ricerca = document.getElementById("barra-ricerca");
const risultati = document.getElementById("searchResults");

// Timer per il debounce
let debounceTimer;

ricerca.addEventListener("keyup", (e) => {
    clearTimeout(debounceTimer); // Resetta il timer precedente

    debounceTimer = setTimeout(() => {
        eseguiRicerca(); // Esegui la ricerca dopo il timeout
    }, 300); // Intervallo di debounce (300ms)
});

function eseguiRicerca() {
    const stringa = ricerca.value.trim();

    // Svuota i risultati precedenti
    risultati.innerHTML = "";
    risultati.style.display = "none";

    if (stringa.length > 0) {
        fetch(`http://localhost:8080/api/eventi/nome=${stringa}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.length > 0) {
                    risultati.style.display = "block";
                    data.forEach((element) => {
                        // risultati.innerHTML += `<p><a href="evento-selezionato.html" style="color: black" onclick=salvaEvento(${element})>${element.nome}</a></p>`;
                        if(element.approvazione == 'APPROVATO'){
                            const eventoItem = document.createElement("p");
                            const link = document.createElement("a");
    
                            link.textContent = element.nome;
                            link.href = "evento-selezionato.html";
                            link.style.color = "black";
                            link.setAttribute("data-evento", JSON.stringify(element));
    
                            link.addEventListener("click", (e) => {
                                e.preventDefault();
                                salvaEvento(JSON.parse(link.getAttribute("data-evento")));
                                window.location.href = "evento-selezionato.html";
                            });
    
                            eventoItem.appendChild(link);
                            risultati.appendChild(eventoItem);

                        }else {
                            risultati.style.display = "block";
                            risultati.innerHTML = "<p>Questo evento non esiste ancora... Crealo tu!</p>";
                        }
                    });
                } 
            })
            .catch((err) => {
                console.error("Errore durante la fetch:", err);
                risultati.style.display = "block";
                risultati.innerHTML = "<p>Questo evento non esiste ancora... Crealo tu!</p>";
            });
    }
}

function salvaEvento(evento) {
    localStorage.setItem("eventoSelezionato", JSON.stringify(evento))
}