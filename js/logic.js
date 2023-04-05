/*
	Import all the elements from the dom_elements and
	Initialise the game.
*/


import * as domElement from './dom_elements.js';

// Images
const images = {
	"rock": "./img/rock.png",
	"paper": "./img/paper.png",
	"scissor": "./img/scissor.png",
};

let isGameOn = false;

// To track the choices
let playerChoice = '',
	compChoice   = '';

// To track the score
let playerScore,compScore;

let rockFunc = playerChose.bind(null, 'rock');
let paperFunc = playerChose.bind(null, 'paper');
let scissorFunc = playerChose.bind(null, 'scissor');


function initialiseGame() {
	playerScore = 0;
	compScore = 0;
	domElement.rock.addEventListener('click', rockFunc);
	domElement.paper.addEventListener('click', paperFunc);
	domElement.scissor.addEventListener('click', scissorFunc);
}

function resetGame() {
	playerScore = 0;
	compScore = 0;
	domElement.compPoints.textContent = 0;
	domElement.playerPoints.textContent = 0;
	domElement.compDisplay.src = '';
	domElement.playerDisplay.src = '';
	domElement.rock.removeEventListener('click', rockFunc);
	domElement.paper.removeEventListener('click', paperFunc);
	domElement.scissor.removeEventListener('click', scissorFunc);

}

function changeButton() {
	if (isGameOn) {
		isGameOn = false;
		domElement.controlBtn.innerHTML = `<span class="material-icons" id="icon">play_arrow</span>Play`;
		domElement.controlBtn.removeEventListener('click', resetButtonFunc);
		domElement.controlBtn.addEventListener('click', playButtonFunc);
	}
	else {
		isGameOn = true;
		domElement.controlBtn.innerHTML = `<span class="material-icons" id="icon">replay</span>Reset`;
		domElement.controlBtn.removeEventListener('click', playButtonFunc);
		domElement.controlBtn.addEventListener('click', resetButtonFunc);

	}
}

async function playerChose(choice) {
	domElement.playerDisplay.src = images[choice];
	playerChoice = choice;
	compChoice = getCompChoice();
	await setTimeout(() => {
		domElement.compDisplay.src = images[compChoice];
		updateScoreBoard();
		checkForWin()
	}, 500);
}

function getCompChoice() {
	let choice = Math.floor(Math.random()*10)%3;

	switch (choice) {
		case 0: return 'rock'; break;
		case 1: return 'paper'; break;
		case 2: return 'scissor'; break;
	}
}

function updateScoreBoard() {
	let combo = playerChoice + compChoice;

	switch (combo) {
		case 'rockpaper': domElement.compPoints.textContent = ++compScore; 
							highlightWinner(domElement.compDisplay); break;

		case 'rockscissor': domElement.playerPoints.textContent = ++playerScore; 
							highlightWinner(domElement.playerDisplay); break;

		case 'paperrock': domElement.playerPoints.textContent = ++playerScore; 
							highlightWinner(domElement.playerDisplay); break;

		case 'paperscissor': domElement.compPoints.textContent = ++compScore; 
							highlightWinner(domElement.compDisplay); break;

		case 'scissorrock': domElement.compPoints.textContent = ++compScore; 
							highlightWinner(domElement.compDisplay); break;

		case 'scissorpaper': domElement.playerPoints.textContent = ++playerScore; 
							highlightWinner(domElement.playerDisplay); break;

	}
}

function checkForWin() {
	const announcer = document.querySelector('.announcement');
	if (compScore === 5) {
		announcer.innerHTML = `<h1>COMPUTER WON!</h1>`;
		announcer.classList.add('show');
		setTimeout( () => {
			announcer.classList.remove('show');
		}, 2000);
		resetGame();
		changeButton();
	}
	if (playerScore === 5) {
		announcer.innerHTML = `<h1>PLAYER WON!</h1>`;
		announcer.classList.add('show');
		setTimeout( () => {
			announcer.classList.remove('show');
		}, 2000);
		resetGame();
		changeButton();
	}
} 

function highlightWinner(winner) {
	/*winner.style.
	setTimeout( () => {
		winner.style.
	}, 200);*/
}

export { initialiseGame, resetGame, changeButton };

