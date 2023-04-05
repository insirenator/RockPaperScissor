// Import Control Button
import { controlBtn } from './js/dom_elements.js';
import { initialiseGame, resetGame, changeButton } from './js/logic.js';


function playButtonFunc() {
	console.log('Game Initialised!');
	initialiseGame();
	changeButton();
}

function resetButtonFunc() {
	console.log('Game Reset!');
	resetGame();
	changeButton();
}

controlBtn.addEventListener('click', playButtonFunc);