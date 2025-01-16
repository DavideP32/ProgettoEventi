document.addEventListener("DOMContentLoaded", () => {
    const infoButton = document.querySelectorAll(".info-bottone");

    infoButton.forEach((button) => {
        button.addEventListener("click", (e) => {
        e.preventDefault();
        const card = button.closest(".evento");

        if (card) {
            const titolo = card.querySelector(".event-title")?.textContent.trim();
            const data = card.querySelector(".event-data")?.textContent.trim();
            const luogo = card.querySelector(".event-local")?.textContent.trim();
            const descrizione = card.querySelector(".event-description")?.textContent.trim();
            const prezzo = card.querySelector(".event-price")?.textContent.trim();
            const ora = card.querySelector(".event-time")?.textContent.trim();
            const motto = card.querySelector(".event-motto")?.textContent.trim();

            const evento = {
                titolo,
                data,
                luogo,
                descrizione,
                prezzo,
                ora,
                motto
            };

            localStorage.setItem("eventoSelezionato", JSON.stringify(evento));

        }
        });
    });
});