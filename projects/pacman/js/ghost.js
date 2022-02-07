'use strict';
var GHOST = '';
var gGhosts;
var gIntervalGhosts;
var gDeadGhosts = [];
function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: getRandomIntInclusive(4, 22)
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
    GHOST = getGhostHTML(ghost);


}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 5; i++) {
        createGhost(board);
    }
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    };
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver();
        return;
    } else if (nextCell === PACMAN && gPacman.isSuper) {
        return;
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    };
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 };
    } else if (randNum <= 50) {
        return { i: -1, j: 0 };
    } else if (randNum <= 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

function getGhostHTML(ghost) {
    if (!gPacman.isSuper) return `<div style="background-color: ${ghost.color}" class="ghost"></div>`;
    return `<div style="background-color: red" class="ghost"></div>`;
}

function removeGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
            var deadGhost = gGhosts.splice(i, 1)[0];
            if (deadGhost.currCellContent === FOOD) {
                gFoodCount--;
            }
            gDeadGhosts.push(deadGhost);
        }
    }
}