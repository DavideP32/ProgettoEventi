//Funzione per aggiungere metodo di pagamento
const addPaymentButton = document.querySelector('.add-payment-method');
const addPaymentPopup = document.querySelector('#popup-add-payment');
const confirmPopup = document.querySelector('#popup-conferma');
const deletePaymentPopup = document.querySelector('#popup-delete-payment');
const overlay = document.createElement('div');
const salvaMetodoButton = document.querySelector('#salvaMetodo');
const annullaMetodoButton = document.querySelector('#annullaMetodo');
const confermaEliminazioneButton = document.querySelector('#confermaEliminazione');
const annullaEliminazioneButton = document.querySelector('#annullaEliminazione');

let elementoDaEliminare = null;

overlay.className = 'overlay d-none';
document.body.appendChild(overlay);

function showPopup(popup) {
    popup.classList.remove('d-none');
    overlay.classList.remove('d-none');
}

function hidePopup(popup) {
    popup.classList.add('d-none');
    overlay.classList.add('d-none');
}

const tipoPagamento = document.querySelector('#tipoPagamento');
const sezioneCarta = document.querySelector('#sezioneCarta');
const sezionePayPal = document.querySelector('#sezionePayPal');

tipoPagamento.addEventListener('change', () => {
    if (tipoPagamento.value === 'carta') {
        sezioneCarta.classList.remove('d-none');
        sezionePayPal.classList.add('d-none');
    } else {
        sezioneCarta.classList.add('d-none');
        sezionePayPal.classList.remove('d-none');
    }
});

function isValidCreditCard(number) {
    const regex = /^\d{16}$/;
    return regex.test(number);
}

function isValidExpiryDate(date) {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    return regex.test(date);
}

function isValidCVV(cvv) {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function generateUniqueId() {
    return 'metodo-' + Date.now() + Math.floor(Math.random() * 1000);
}

// Aggiunta metodo di pagamento
salvaMetodoButton.addEventListener('click', () => {
    const tipo = tipoPagamento.value;
    const uniqueId = generateUniqueId();
    let metodoHTML = '';

    if (tipo === 'carta') {
        const numero = document.querySelector('#numeroCarta').value;
        const scadenza = document.querySelector('#scadenzaCarta').value;
        const cvv = document.querySelector('#cvvCarta').value;

        if (!isValidCreditCard(numero)) {
            alert('Inserisci un numero di carta valido (16 cifre).');
            return;
        }

        if (!isValidExpiryDate(scadenza)) {
            alert('Inserisci una data di scadenza valida (MM/YY).');
            return;
        }

        if (!isValidCVV(cvv)) {
            alert('Inserisci un CVV valido (3 cifre).');
            return;
        }

        metodoHTML = `<div class="col-md-6" data-id="${uniqueId}"><div class="box"><b class="mx-2 text-muted"><i class="fa-solid fa-credit-card"></i></b>Carta •••• ${numero.slice(-4)}, Scad: ${scadenza} <button class="btn btn-danger btn-sm elimina-metodo" onclick="eliminaMetodo('${uniqueId}')">Elimina</button></div></div>`;
    } else {
        const email = document.querySelector('#emailPayPal').value;

        if (!isValidEmail(email)) {
            alert('Inserisci un indirizzo email valido.');
            return;
        }

        metodoHTML = `<div class="col-md-6" data-id="${uniqueId}"><div class="box paypal-di-chi"><b class="mx-2 text-muted"><i class="fa-brands fa-cc-paypal"></i></b>PayPal di ${email} <button class="btn btn-danger btn-sm elimina-metodo" onclick="eliminaMetodo('${uniqueId}')">Elimina</button></div></div>`;
    }

    const containers = document.querySelectorAll('.metodi-pagamento');
    containers.forEach((container) => {
        container.insertAdjacentHTML('beforeend', metodoHTML);
    });

    hidePopup(addPaymentPopup);
    confirmPopup.classList.remove('d-none');
    setTimeout(() => {
        confirmPopup.classList.add('d-none');
    }, 1500);
});

annullaMetodoButton.addEventListener('click', () => {
    hidePopup(addPaymentPopup);
});

addPaymentButton.addEventListener('click', (event) => {
    event.preventDefault();
    showPopup(addPaymentPopup);
});

overlay.addEventListener('click', () => {
    hidePopup(addPaymentPopup);
    hidePopup(deletePaymentPopup);
});

function eliminaMetodo(id) {
    elementoDaEliminare = id;
    showPopup(deletePaymentPopup);
}

// Conferma eliminazione
confermaEliminazioneButton.addEventListener('click', () => {
    if (elementoDaEliminare) {
        const elementi = document.querySelectorAll(`[data-id="${elementoDaEliminare}"]`);
        elementi.forEach((elemento) => elemento.remove());
        elementoDaEliminare = null;
    }
    hidePopup(deletePaymentPopup);
});

// Annulla eliminazione
annullaEliminazioneButton.addEventListener('click', () => {
    elementoDaEliminare = null;
    hidePopup(deletePaymentPopup);
});
















//Funzione per eliminare un evento
// document.addEventListener("DOMContentLoaded", () => {
//     const popup = document.getElementById("popup-reject");
//     const overlay = document.getElementById("overlay");
//     let eventToReject = null;

//     // Funzione per mostrare il popup
//     function showPopup(eventElement) {
//         eventToReject = eventElement;
//         popup.classList.remove("d-none");
//         overlay.classList.remove("d-none");
//     }

//     function closePopup() {
//         popup.classList.add("d-none");
//         overlay.classList.add("d-none");
//         eventToReject = null;
//     }

//     function confirmDelete() {
//         if (eventToReject) {
//             const rejectedSection = document.querySelector(".evento-scartato");
//             if (rejectedSection) {
//                 rejectedSection.appendChild(eventToReject);

//                 const actions = eventToReject.querySelector(".si-no");
//                 if (actions) {
//                     actions.remove();
//                 }
//             }
//         }
//         closePopup();
//     }

//     document.body.addEventListener("click", (e) => {
//         if (e.target.closest(".reject")) {
//             e.preventDefault();
//             const eventElement = e.target.closest(".evento");
//             if (eventElement) {
//                 showPopup(eventElement);
//             }
//         }

//         if (e.target.matches(".cancel")) {
//             e.preventDefault();
//             closePopup();
//         }

//         if (e.target.matches(".desactivate")) {
//             e.preventDefault();
//             confirmDelete();
//         }

//         if (e.target.matches("#overlay")) {
//             e.preventDefault();
//             closePopup();
//         }
//     });
// });






const accept = document.querySelector('.accetta');


function openAcceptPopup(event) {
    event.preventDefault();
    document.getElementById("popup-accept").classList.remove("d-none");
    document.getElementById("overlay").classList.remove("d-none");
}


function closePopup() {
    document.getElementById("popup-accept").classList.add("d-none");
    document.getElementById("overlay").classList.add("d-none");
}

function acceptAction() {
    closePopup();
}

accept.addEventListener('click', openAcceptPopup);


document.querySelector('.desactivate').addEventListener('click', () => {
    document.querySelector('.evento-fittizio').classList.add("d-none");
    document.getElementById("popup-accept").classList.add("d-none");
});

document.querySelector('.cancel').addEventListener('click', closePopup);

document.getElementById('overlay').addEventListener('click', (event) => {
    event.stopPropagation();
});
