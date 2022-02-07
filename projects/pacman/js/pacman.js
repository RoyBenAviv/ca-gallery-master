'use strict';
var PACMAN = '<img width="40px" src="img/pacman.png">';
const PACMAN_LEFT = '<img width="40px" src="img/pacman-left.png">'
const PACMAN_RIGHT = '<img width="40px" src="img/pacman-right.png">'
const PACMAN_DOWN = '<img width="40px" src="img/pacman-down.png">'
const PACMAN_UP = '<img width="40px" src="img/pacman-up.png">'
var gPacman;
var move = new Audio('sounds/pacman_chomp.wav');
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 25
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
    gFoodCount--;
}

function movePacman(ev) {
    
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver();
        return;
    } else if (nextCell === GHOST && gPacman.isSuper) {
        removeGhost(nextLocation);
        eatGhost()
        updateScore(1);
    }
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount--;
        checkVictory();
    }

    if(nextCell === CHERRY) {
        updateScore(10)
        eatFruit()
    }

    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return;
        superModeSound()
        updateScore(1);
        gFoodCount--;
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;

            for (var i = 0; i < gDeadGhosts.length; i++) {
                gGhosts.push(gDeadGhosts[i]);
            }
            gDeadGhosts = [];
        }, 5000);
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the DOM
    renderCell(gPacman.location, EMPTY);

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    };
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            move.play()
            nextLocation.i--;
            PACMAN = PACMAN_UP
            break;
        case 'ArrowDown':
            move.play()
            nextLocation.i++;
            PACMAN = PACMAN_DOWN
            break;
        case 'ArrowLeft':
            move.play()
            nextLocation.j--;
            PACMAN = PACMAN_LEFT
            break;
        case 'ArrowRight':
            move.play()
            nextLocation.j++;
            PACMAN = PACMAN_RIGHT
            break;
        default: return null;
    }
    return nextLocation;
}




