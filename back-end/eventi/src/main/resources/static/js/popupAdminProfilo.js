const overlay = document.getElementById('overlay');
const acceptPopup = document.getElementById('popup-accept');
const rejectPopup = document.getElementById('popup-reject');
const addPaymentPopup = document.getElementById('popup-add-payment');
const triggers = document.querySelectorAll('.popup-trigger');
const addPaymentButton = document.querySelector('.add-payment-method');

triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        if (trigger.classList.contains('accept')) {
            showPopup(acceptPopup);
        } else if (trigger.classList.contains('reject')) {
            showPopup(rejectPopup);
        }
    });
});

addPaymentButton.addEventListener('click', (event) => {
    event.preventDefault();
    showPopup(addPaymentPopup);
    overlay.classList.remove('d-none');

});

function showPopup(popup) {
    popup.classList.remove('d-none');
    overlay.classList.remove('d-none');
}

function closePopup() {
    acceptPopup.classList.add('d-none');
    rejectPopup.classList.add('d-none');
    addPaymentPopup.classList.add('d-none');
    overlay.classList.add('d-none');
}



addPaymentButton.addEventListener('click', (event) => {
    event.preventDefault();
    showPopup(addPaymentPopup);
});

function showPopup(popup) {
    popup.classList.remove('d-none');
    overlay.classList.remove('d-none');
}

function closePopup() {
    addPaymentPopup.classList.add('d-none');
    overlay.classList.add('d-none');
}