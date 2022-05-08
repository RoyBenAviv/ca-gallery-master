'use strict';

var gProjs;
_createProjs();
function _createProjs() {
    gProjs = [
        _createProj('pacman', 'Pacman', 'Imitation of Pacman game',1643037813, ['Vanilla JS'], './projects/pacman/index.html'),
        _createProj('minesweeper-game', 'Minesweeper Boom', 'The nostalgic Minesweeper game', 1643297013, ['Vanilla JS'], './projects/minesweeper-game/index.html'),
        _createProj('touch-nums', 'Touch the numbers', 'Touch the numbers fast as you can', 1642692213, ['Vanilla JS'], './projects/touch-nums/index.html'),
        _createProj('book-shop', 'Book Store', 'Basic Book store with CRUDL', 1643901813, ['Vanilla JS'], './projects/book-shop/index.html'),
    ];
}

// `<button onclick ="window.open(${proj.url})`

function getProjsForDisplay() {
    var projects = gProjs;

    return projects;
}

function _createProj(id, projName, title, publishedAt, labels, url) {
    return {
        id,
        projName,
        title,
        desc: makeLorem(),
        publishedAt,
        labels,
        url
    };
}

function getProjById(projId) {
    const proj = gProjs.find((proj) => projId === proj.id);
    return proj;
}

function submitForm(subjectVal, messageVal) {
    return window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=roybenavivv@gmail.com&su=${subjectVal}&b
    ody=${messageVal}`)
}
