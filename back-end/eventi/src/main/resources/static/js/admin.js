    // Funzione per aprire il popup e mostrare i dati dell'utente
    function openPromotePopup(nome, cognome) {
        const popup = document.getElementById('popup-promote-admin');
        const usernameField = document.getElementById('popup-username');

        usernameField.textContent = `${nome} ${cognome}`;
        popup.classList.remove('d-none');
    }

    // Funzione per chiudere il popup
    function closePopup() {
        const popup = document.getElementById('popup-promote-admin');
        popup.classList.add('d-none');
    }

//Apparizioni Utenti per la pagina admin da questo:
fetch("http://localhost:8080/api/utente")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        const userSection = document.getElementById("userSection"); // ID della sezione dove verranno inseriti gli utenti

        data.forEach(user => {
            const birthDate = new Date(user.dataNascita);

            // Crea un div per la singola card
            const userCard = document.createElement("div");
            userCard.classList.add("card", "border-0");
            userCard.id = `utente-${user.id}`;

            // Inserisci il contenuto della card
            userCard.innerHTML = `
                <div class="card-body">
                    <div class="itemside align-items-center">
                        <div class="aside"> 
                            <div class="d-flex justify-content-between">
                                <div class="idUtente" style="margin-bottom: 1rem; width: 40px; height: 40px; font-size: larger;">
                                    ${user.nome.charAt(0)}${user.cognome.charAt(0)}
                                </div>
                                <div class="text-center">
                                    <label class="toggle-switch">
                                      <input type="checkbox" id="toggle-${user.id}" onclick="openPromotePopup('${user.nome}', '${user.cognome}')">
                                      <span class="slider"></span>
                                    </label>                                
                                </div>                  
                            </div>
                        </div>
                        <div class="info">
                            <div class="d-flex gap-2">
                                <p class="nome title h6">${user.nome}</p>
                                <p class="cognome title h6">${user.cognome}</p>
                            </div>
                            <p id="email">
                                Email: ${user.email} <i class="dot"></i> <a href="#" class="px-2" title="Modifica informazioni"></a>
                            </p>
                            <p id="data-nascita">
                                Data di nascita: ${birthDate.toLocaleDateString('it-IT', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })} <i class="dot"></i> <a href="#" class="px-2" title="Modifica informazioni"></a>
                            </p>   
                        </div>
                    </div>
                </div>
            `;

            // Aggiungi la card creata al contenitore principale
            userSection.appendChild(userCard);
        });
    })
    .catch(error => console.error("Errore durante la fetch:", error));

