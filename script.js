const emojis = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🍓", "🍓", "🍒", "🍒"];
let carteMischiate = emojis.sort(() => 0.5 - Math.random());

const board = document.getElementById("game-board");
let carta1 = null; 
let carta2 = null; 
let bloccoTavolo = false; 

for (let i = 0; i < carteMischiate.length; i++) {
    
    let carta = document.createElement("div");
    carta.classList.add("card");
    carta.innerHTML = carteMischiate[i];
    
    carta.addEventListener("click", (evento) => {
        
        if (bloccoTavolo === true) {
            return; 
        }

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

            
            if (carta1.innerHTML === carta2.innerHTML) {
                
                carta1.classList.add("matched");
                carta2.classList.add("matched");
                
                
                carta1 = null;
                carta2 = null;
                bloccoTavolo = false;
                
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
    
    board.appendChild(carta);
}