    // Calcolo Prezzo Totale Dinamico
    const prezzoPerPersona = 50;
    document.getElementById('numPersone').addEventListener('input', function() {
        const persone = this.value;
        const totale = persone * prezzoPerPersona;
        document.getElementById('totalPrice').textContent = totale;
    });