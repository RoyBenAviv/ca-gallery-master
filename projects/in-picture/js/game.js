'use strict';

var gNextId = 100;
var gCurrQuestIdx = 0;
var gQuests = [];

function initGame() {
    gNextId = 100;
    gCurrQuestIdx = 0;
    createQuests();
    renderQuest();

}


function createQuests() {
    gQuests = [
        { id: gNextId++, opts: ['Japan', 'Brazil', 'Costa Rica'], correctOptIndex: 1 },
        { id: gNextId++, opts: ['Turky', 'Argentina', 'Portugal'], correctOptIndex: 0 },
        { id: gNextId++, opts: ['Phillipins', 'China', 'Yamen'], correctOptIndex: 0 },
        { id: gNextId++, opts: ['Cyprus', 'Georgie', 'Liechtenstein'], correctOptIndex: 2}
    ];
}


function renderQuest() {

    var strHTML = '';

    strHTML += `<img src="images/${gCurrQuestIdx}.jpg">`;

    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        strHTML += `<button onclick="checkAnswer(${i})">${gQuests[gCurrQuestIdx].opts[i]}</button>`;
    }
    var elQuests = document.querySelector('.questions');
    elQuests.innerHTML = strHTML;

}

function checkAnswer(optIdx) {

    var correct = gQuests[gCurrQuestIdx].correctOptIndex;
    console.log([gCurrQuestIdx]);
    if (optIdx === correct) {
        gCurrQuestIdx++;
        if (gCurrQuestIdx < gQuests.length) {
            renderQuest();
        } else {
            var elWin = document.querySelector('.win');
            elWin.style.display = 'block';
        }
    }
}


function resetGame() {
    var elWin = document.querySelector('.win');
    elWin.style.display = 'none';
    initGame();
}