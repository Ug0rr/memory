const startScreen = document.getElementById("start-screen");
const gameInfo = document.getElementById("game-info");
const gameBoard = document.getElementById("game-board");
const endScreen = document.getElementById("end-screen");

const inputNome = document.getElementById("nome-giocatore");
const btnInizia = document.getElementById("btn-inizia");
const salutoGiocatore = document.getElementById("saluto-giocatore");
const contatoreTentativi = document.getElementById("contatore-tentativi");
const messaggioFine = document.getElementById("messaggio-fine");
const btnRigioca = document.getElementById("btn-rigioca");

let tentativi = 0;
let coppieIndovinate = 0;
let nome = "";


btnInizia.addEventListener("click", () => {
    
    nome = inputNome.value;
    if (nome === "") {
        nome = "Campione";
    }

    startScreen.classList.add("hidden");
    gameInfo.classList.remove("hidden");
    gameBoard.classList.remove("hidden");

    salutoGiocatore.innerHTML = "In bocca al lupo, " + nome + "!";

    const emojis = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🍓", "🍓", "🍒", "🍒"];
    let carteMischiate = emojis.sort(() => 0.5 - Math.random());

    let carta1 = null; 
    let carta2 = null; 
    let bloccoTavolo = false; 

    for (let i = 0; i < carteMischiate.length; i++) {
        let carta = document.createElement("div");
        carta.classList.add("card");
        carta.innerHTML = carteMischiate[i];
        
        carta.addEventListener("click", (evento) => {
            if (bloccoTavolo === true) return; 

            let cartaCliccata = evento.target;

            if (cartaCliccata.classList.contains("flipped") || cartaCliccata.classList.contains("matched")) {
                return;
            }

            cartaCliccata.classList.add("flipped");

            if (carta1 === null) {
                carta1 = cartaCliccata;
            } else {
                carta2 = cartaCliccata;
                bloccoTavolo = true; 

                tentativi = tentativi + 1;
                contatoreTentativi.innerHTML = tentativi;

                if (carta1.innerHTML === carta2.innerHTML) {
                    carta1.classList.add("matched");
                    carta2.classList.add("matched");
                    
                    carta1 = null;
                    carta2 = null;
                    bloccoTavolo = false;

                    coppieIndovinate = coppieIndovinate + 1;

                    if (coppieIndovinate === 6) {
                        setTimeout(() => {
                            gameBoard.classList.add("hidden");
                            gameInfo.classList.add("hidden");
                            endScreen.classList.remove("hidden");
                            
                            messaggioFine.innerHTML = "Complimenti " + nome + "! Hai vinto in " + tentativi + " tentativi.";
                        }, 500);
                    }
                    
                } else {
                    setTimeout(() => {
                        carta1.classList.remove("flipped");
                        carta2.classList.remove("flipped");
                        carta1 = null;
                        carta2 = null;
                        bloccoTavolo = false;
                    }, 1000);
                }
            }
        });
        
        gameBoard.appendChild(carta);
    }
});


btnRigioca.addEventListener("click", () => {
    location.reload();
});
