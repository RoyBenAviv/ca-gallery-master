var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GLUE = 'GLUE';
var GAMER = 'GAMER';
var gElSpan = document.querySelector('h2 span');
var gRemoveGlueInterval = null;
var GLUE_IMG = '<img height="18px" width="18px" src="img/glue.png" />';
var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var gBoard;
var gGamerPos;
var gCount = 0;
var gBallsAmount = 2;
var gIntervalBall = null;
var gIntervalGlue = null;
var playerCantMove = false
var passageUp = '';
var passageRight = '';
var passageLeft = '';
var passageDown = '';

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gIntervalBall = setInterval(enterBall, 3000);
	gIntervalGlue = setInterval(enterGlue, 5000);
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12);


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {

				cell.type = WALL;
			}
			createPassage(board, i, j, cell);

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;


	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j });

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}
			
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}



// Move the player to a specific location
function moveTo(i, j) {

	if (playerCantMove) return

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || gGamerPos.j === 0 || gGamerPos.j === 11 || gGamerPos.i === 0 || gGamerPos.i === 9) {
		if (targetCell.gameElement === BALL) {
			gCount++;
			playCollectSound();
			gElSpan.innerText = gCount;
		}
		if (targetCell.gameElement === GLUE) {
			playerCantMove = true
			setTimeout(() => playerCantMove = false, 3000)
			removeGlue()
		}

		if(gBallsAmount === gCount) {
			gameOver()
		}
		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	}

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location);
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {

		case 'ArrowLeft':
			if (j === 0) {
				moveTo(5, 11);
			} else {
				moveTo(i, j - 1);
			}
			break;
		case 'ArrowRight':
			if (j === 11) {
				moveTo(5, 0);
			} else {
				moveTo(i, j + 1);
			}
			break;
		case 'ArrowUp':
			if (i === 0) {
				moveTo(9, 5);
			} else {
				moveTo(i - 1, j);
			}
			break;
		case 'ArrowDown':
			if (i === 9) {
				moveTo(0, 5);
			} else {
				moveTo(i + 1, j);
			}
			break;

	}

}


function enterBall() {
	var emptyCell = getEmptyCell();
	gBoard[emptyCell.i][emptyCell.j].gameElement = BALL;
	renderCell(emptyCell, BALL_IMG);
	gBallsAmount++;
}

function getEmptyCell() {
	var emptyCells = getEmptyCells(gBoard);
	return emptyCells[getRandomInt(0, emptyCells.length - 1)];
}

function enterGlue() {
	var emptyCell = getEmptyCell();
	gBoard[emptyCell.i][emptyCell.j].gameElement = GLUE;
	renderCell(emptyCell, GLUE_IMG);
	gRemoveGlueInterval = setTimeout(removeGlue, 3000);
}

function removeGlue() {
	if(gBoard[emptyCell.i][emptyCell.j].gameElement = GLUE) {
		setTimeout(getEmptyCell, 3000)
		renderCell(emptyCell, '')
	}
}


function getEmptyCells(board) {

	var emptyCells = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {

			var currCell = board[i][j];
			if (currCell.type === FLOOR && !currCell.gameElement) {
				emptyCells.push({ i, j });
			}

		}
	}
	return emptyCells;
}


function gameOver() {
	clearInterval(gIntervalBall);
	clearInterval(gIntervalGlue)
	clearInterval(gRemoveGlueInterval);
	elBtn = document.querySelector('.restart');
	elBtn.style.display = 'block';
}

function restartGame() {
	elBtn.style.display = 'none';
	gCount = 0;
	gElSpan.innerText = '0';
	gBallsAmount = 2;
	initGame();
}


function createPassage(board, i, j, cell) {
	if ((i === 0) && (j === board.length / 2)) {
		cell.type = FLOOR;
		passageUp = board[i][j];
	} else if ((i === board.length - 1) && (j === board.length / 2)) {
		cell.type = FLOOR;
		passageRight = board[i][j];
	} else if ((i === board.length / 2) && (j === 0)) {
		cell.type = FLOOR;
		passageLeft = board[i][j];
	} else if ((i === board.length / 2) && (j === board[0].length - 1)) {
		cell.type = FLOOR;
		passageDown = board[i][j];
	}
}


function removeGlue(){
	// renderCell(gBoard[location.i][location.j], null);
	for(var i = 0; i < gBoard.length; i++){
		for(var j = 0; j < gBoard.length; j++){
			const currCell = gBoard[i][j];
			if(currCell.gameElement === GLUE){
				// update model:
				renderCell({i: i, j: j}, '');
				// update DOM:
				currCell.gameElement = null;
			}
		}
	}
}


// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}
