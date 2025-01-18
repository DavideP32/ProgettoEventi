/* -------------------------------------------------------------------------- */
/*                         GESTIONE PRENOTAZIONE EVENTO                      */
/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
    const popup = document.getElementById("popup-overlay");
    const form = document.querySelector("form");
    const fieldError = document.getElementById("field-error");

    // Prendo i dati dell'evento dal local storage
    const evento = JSON.parse(localStorage.getItem("eventoSelezionato"));
    if (!evento) {
        alert("Evento non selezionato.");
        window.location.replace("http://localhost:8080/index.html");
        return;
    }
    //cambio l'html
    caricaDatiEvento(evento);

    // Verifica autenticazione dell'utente
    let utenteAutenticato = null;
    try {
        utenteAutenticato = await verificaSessione();
    } catch (err) {
        alert("Devi essere autenticato per effettuare una prenotazione.");
        window.location.replace("http://localhost:8080/login.html");
        return;
    }

    // Gestione del submit del form
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const numPersone = form.numPersone.value.trim();
        const nomeCompleto = form.nomeCompleto.value.trim();
        const email = form.email.value.trim();

        // Validazione dei campi
        const errorMsg = validaForm(numPersone, nomeCompleto, email);
        if (errorMsg) {
            fieldError.style.display = "block";
            fieldError.textContent = errorMsg;
            return;
        }
        fieldError.style.display = "none";


        const prenotazione = {
            utente: utenteAutenticato,
            evento: evento,
            pagato: true,
            numeroPersone: numPersone,
        };

        console.log(prenotazione);

        try {
            const response = await inviaPrenotazione(prenotazione);
            if (response.ok) {
                popup.classList.remove("d-none"); // Mostra il popup
            } else {
                throw new Error("Errore durante la prenotazione");
            }
        } catch (err) {
            console.error("Errore nella prenotazione:", err);
            alert("Impossibile effettuare la prenotazione.");
        }
    });
});

/* -------------------------------------------------------------------------- */
/*                       FUNZIONI DI SUPPORTO                                 */
/* -------------------------------------------------------------------------- */

// Carica i dati dell'evento nella pagina
function caricaDatiEvento(evento) {
    const nomeEventoPren = document.getElementById("nome-prenot");
    const dataPrenot = document.getElementById("data-prenot");
    const luogoPrenot = document.getElementById("luogo-prenot");
    const fotoPrenot = document.querySelector(".booking-image");

    const dataEvent = new Date(evento.dataEvento);
    nomeEventoPren.textContent = evento.nome;
    dataPrenot.innerHTML = `<strong>Data:</strong> ${dataEvent.toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })}`;
    luogoPrenot.innerHTML = `<strong>Luogo:</strong> ${evento.luogoEvento}`;
    fotoPrenot.style.background = `url(../${evento.url})`;

    // Calcolo del prezzo totale dinamico
    const prezzoPerPersona = evento.prezzo;
    document.getElementById("numPersone").addEventListener("input", function () {
        const persone = this.value;
        const totale = persone * prezzoPerPersona;
        document.getElementById("totalPrice").textContent = totale;
    });
}

// Verifica la validità dei dati del form
function validaForm(numPersone, nomeCompleto, email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nomeCompletoRegex = /^[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+$/;

    if (!numPersone || !nomeCompleto || !email) {
        return "Per favore compila tutti i campi richiesti.";
    }
    if (!emailRegex.test(email)) {
        return "Per favore inserisci un'email valida.";
    }
    if (!nomeCompletoRegex.test(nomeCompleto)) {
        return "Per favore inserisci nome e cognome validi (almeno due parole).";
    }
    return null;
}

// Invia la prenotazione al server
async function inviaPrenotazione(prenotazione) {
    return fetch("http://localhost:8080/api/prenotazioni", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(prenotazione),
    });
}


