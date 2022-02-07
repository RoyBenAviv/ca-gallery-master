'use strict';
const WALL = '<div class="wall"></div><div class="wall"></div>';
const FOOD = '<div class="food"></div>';
const EMPTY = ' ';
const POWER_FOOD = '<div class="power-food"></div>';
const CHERRY = '🍒';

var gElModal = document.querySelector('.modal');
var gFoodCount = 0;


var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    // console.log('Hello')
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container');
}

function startButton() {
    startGameSound()
    var elBtn = document.querySelector('.start-game')
    elBtn.innerText = 'GOOD LUCK!'
    setTimeout(() => {
        gGame.isOn = true;
        elBtn.style.display = 'none'
        gIntervalGhosts = setInterval(moveGhosts, 1000);
        setInterval(addCherry, 15000);
    }, 4500)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE * 3; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE * 3 - 1 ||
                (j === 3 && i > 1 && i < SIZE - 2) ||
                 (j === 7 && i > 3 && i < SIZE - 2) ||
                  (i > 3 && i < 7 && j === 11) || 
                  (i > 3 && i < 7 && j === 18 ) ||
                  (j > 10 && j < 19 && i === 7) ||
                  (j === 23 && i > 1 && i < 8) ||
                  (i === 2 && j < 23 && j > 3)||
                  (i > 1 && i < 8 && j === 26)){
                board[i][j] = WALL;
                gFoodCount--;
            }
        }
    }
    // power food : 
    board[1][17] = POWER_FOOD;
    board[1][1] = POWER_FOOD;
    board[5][13] = POWER_FOOD;
    board[4][4] = POWER_FOOD;
    board[board.length - 2][board[0].length - 2] = POWER_FOOD;
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
    deathSound()
    gElModal.style.display = 'block';
    var elGO = document.querySelector('.game-over');
    elGO.style.display = 'block';
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
}


function restart() {
    gFoodCount = 0;
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    document.querySelector('.game-over').style.display  = 'none'
    gElModal.style.display = 'none';
    var elVic = document.querySelector('.victory');
    elVic.style.display = 'none';
    PACMAN = '<img width="40px" src="/img/pacman.png">'
    init()
    startButton()
}


function checkVictory() {
    if (!gFoodCount) {
        gElModal.style.display = 'block';
        var elVic = document.querySelector('.victory');
        elVic.style.display = 'block';
        gGame.isOn = false;
    }
    // gElModal.style.display = 'block'
    // var elGO = document.querySelector('.game-over')
    // elGO.style.display = 'block'
}

function addCherry() {
    var emptyCells = getEmptyCells();
    if (!emptyCells.length) return;
    var idx = getRandomIntInclusive(0, emptyCells.length);
    var currCell = emptyCells[idx];
    gBoard[currCell.i][currCell.j] = CHERRY;
    renderCell(currCell, CHERRY);

}

// return array of empty cells
function getEmptyCells() {
    var res = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell === EMPTY) {
                res.push({ i, j });
            }
        }
    }
    return res;
}


