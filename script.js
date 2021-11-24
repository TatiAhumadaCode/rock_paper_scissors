const piedra = document.querySelector('.piedra');
const papel = document.querySelector('.papel');
const tijera = document.querySelector('.tijera');
const display = document.querySelector('.display-box');
const playerContainer = document.querySelector('.player-container');
const pcContainer = document.querySelector('.pc-container')
let infoText = document.querySelector('.info-text');
let scorePC = document.querySelector('.computer-score');
let scorePlayer = document.querySelector('.player-score');
let roundWinner = '';
let playerScores = 0;
let computerScores = 0;
let isGameOver = false;


//variables imagenes

const rockImg = document.createElement('img');
rockImg.src = 'rock.png'
rockImg.classList.add('game-img');

const paperImg = document.createElement('img');
paperImg.src = 'paper.png'
paperImg.classList.add('game-img');

const scissorsImg = document.createElement('img');
scissorsImg.src = 'scissor.png'
scissorsImg.classList.add('game-img');

//eventos imagenes
piedra.addEventListener('click', () => {
    playGame('piedra');
    playerContainer.innerHTML = '';
    playerContainer.appendChild(rockImg);
});
papel.addEventListener('click', () => {
    playGame('papel');
    playerContainer.innerHTML = '';
    playerContainer.appendChild(paperImg);
});
tijera.addEventListener('click', () => {
    playGame('tijera');
    playerContainer.innerHTML = '';
    playerContainer.appendChild(scissorsImg);
});
 
//número random pc
function computerRandom() {
    let randoms = ['piedra', 'papel', 'tijera'];
    random = randoms[Math.floor(Math.random() * randoms.length)];

    switch(random) {
        case 'piedra':
            pcContainer.innerHTML = '';
            pcContainer.appendChild(rockImg.cloneNode());
            break;
        case 'papel':
            pcContainer.innerHTML = '';
            pcContainer.appendChild(paperImg.cloneNode());
            break;
        case 'tijera':
            pcContainer.innerHTML = '';
            pcContainer.appendChild(scissorsImg.cloneNode());
            break;
    }
    return random;
}

function playGame(playerSelection) {

    const computerSelection = computerRandom();
    gameLogic(playerSelection, computerSelection);


    console.log(playerSelection, computerSelection)
}


function gameLogic(playerSelection, computerSelection) {

    if(
        (playerSelection ==='piedra' && computerSelection === 'papel') || 
        (playerSelection === 'tijera' && computerSelection === 'piedra') || 
        (playerSelection === 'papel' && computerSelection === 'tijera')
        ) {
        computerScores++;
        infoText.textContent = 'Computer has won a point';
    } else if (
        (playerSelection === 'papel' && computerSelection === 'piedra') || 
        (playerSelection === 'tijera' && computerSelection === 'papel') || 
        (playerSelection === 'piedra' && computerSelection === 'tijera')
        ) {
        playerScores++;
        infoText.textContent = 'You have won a point';
    }  else if (playerSelection === computerSelection) {
        infoText.textContent = "It's a tie, try again"
    }
    scorePC.textContent = `PC: ${computerScores}`;
    scorePlayer.textContent = `Player: ${playerScores}`
    checkWinners();
}

function checkWinners() {
    if(playerScores === 5 || computerScores === 5) {
        if(playerScores > computerScores) {
            gameOver()
            gameWiner()
        }
        else if(playerScores < computerScores ) {    
            gameOver()
            gameLost()
        }
    }
}

function gameOver() {
    isGameOver = true; 
    piedra.removeEventListener('click', () => playGame('piedra'));
    papel.removeEventListener('click', () => playGame('papel'));
    tijera.removeEventListener('click', () => playGame('tijera'));
}


function gameWiner() {
    const winnerDiv = document.createElement('div');
    winnerDiv.classList.add('reload-div')
    winnerDiv.innerHTML = `You win!! <i class="far fa-laugh-beam"></i>`;
    
    const startAgainBtn = document.createElement('button');
    startAgainBtn.classList.add('restart-btn');
    startAgainBtn.textContent = 'Play Again';
    startAgainBtn.addEventListener('click', function() {
        window.location.reload();
    });

    display.appendChild(winnerDiv);
    winnerDiv.appendChild(startAgainBtn);
    
}

function gameLost() {
    const loserDiv = document.createElement('div');
    loserDiv.classList.add('reload-div');
    loserDiv.innerHTML = `You lost <i class="far fa-frown"></i>`;
    
    const startAgainBtn2 = document.createElement('button');
    startAgainBtn2.classList.add('restart-btn');
    startAgainBtn2.textContent = 'Try Again';
    startAgainBtn2.addEventListener('click', function() {
        window.location.reload();
    })

    display.appendChild(loserDiv);
    loserDiv.appendChild(startAgainBtn2);
}
