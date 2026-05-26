// 1. Prendiamo tutti i pezzi dell'HTML che ci servono
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

// Variabili per i punteggi
let tentativi = 0;
let coppieIndovinate = 0;
let nome = "";

// ---------------------------------------------------------
// COSA SUCCEDE QUANDO CLICCO "INIZIA A GIOCARE"?
// ---------------------------------------------------------
btnInizia.addEventListener("click", () => {
    
    // Salviamo il nome. Se non scrive niente, lo chiamiamo "Campione"
    nome = inputNome.value;
    if (nome === "") {
        nome = "Campione";
    }

    // Facciamo sparire la schermata iniziale e apparire il tavolo
    startScreen.classList.add("hidden");
    gameInfo.classList.remove("hidden");
    gameBoard.classList.remove("hidden");

    // Scriviamo il saluto in alto
    salutoGiocatore.innerHTML = "In bocca al lupo, " + nome + "!";

    // PREPARAZIONE DELLE CARTE (Il codice di prima)
    const emojis = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🍓", "🍓", "🍒", "🍒"];
    let carteMischiate = emojis.sort(() => 0.5 - Math.random());

    let carta1 = null; 
    let carta2 = null; 
    let bloccoTavolo = false; 

    // CREIAMO LE CARTE
    for (let i = 0; i < carteMischiate.length; i++) {
        let carta = document.createElement("div");
        carta.classList.add("card");
        carta.innerHTML = carteMischiate[i];
        
        // COSA SUCCEDE QUANDO CLICCO UNA CARTA?
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

                // *** NOVITÀ: Abbiamo girato 2 carte, aumentiamo i tentativi! ***
                tentativi = tentativi + 1;
                contatoreTentativi.innerHTML = tentativi;

                if (carta1.innerHTML === carta2.innerHTML) {
                    carta1.classList.add("matched");
                    carta2.classList.add("matched");
                    
                    carta1 = null;
                    carta2 = null;
                    bloccoTavolo = false;

                    // *** NOVITÀ: Abbiamo indovinato una coppia! ***
                    coppieIndovinate = coppieIndovinate + 1;

                    // Se abbiamo indovinato 6 coppie, la partita è finita!
                    if (coppieIndovinate === 6) {
                        // Aspettiamo mezzo secondo per far vedere l'ultima carta girata
                        setTimeout(() => {
                            // Nascondiamo il tavolo e mostriamo la schermata finale
                            gameBoard.classList.add("hidden");
                            gameInfo.classList.add("hidden");
                            endScreen.classList.remove("hidden");
                            
                            // Mostriamo il messaggio di vittoria personalizzato
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

// ---------------------------------------------------------
// COSA SUCCEDE QUANDO CLICCO "RICOMINCIA DA CAPO"?
// ---------------------------------------------------------
btnRigioca.addEventListener("click", () => {
    // Questo comando magico ricarica l'intera pagina web.
    // È il modo più semplice in assoluto per ripartire da zero!
    location.reload();
});