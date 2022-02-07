'use strict';

var gProjs;
_createProjs()
function _createProjs() {
    gProjs = [
        _createProj('pacman', 'Pacman', 'Imitation of Pacman game', '/projects/pacman/index.html'),
        _createProj('book-shop', 'Book Store', 'Book store with CRUDL', '/projects/book-shop/index.html'),
        _createProj('minesweeper-game', 'Minesweeper Boom', 'The nostalgic Minesweeper game', '/projects/minesweeper-game/index.html'),
        _createProj('touch-nums', 'Touch the numbers', 'Touch the numbers fast as you can', '/projects/touch-nums/index.html'),
        _createProj('in-picture', 'What is the flag?', 'Flag Quiz', '/projects/in-picture/index.html')
    ];
}

// `<button onclick ="window.open(${proj.url})`

function getProjsForDisplay() {
    var projects = gProjs;

    return projects
}

function _createProj(id, projName, title, url) {
    return {
        id,
        projName,
        title,
        desc: makeLorem(),
        url,
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    };
}

function getProjById(projId) {
    const proj = gProjs.find((proj) => projId === proj.id)
    return proj
}

function makeLorem(wordCount = 40) {
    const words = ['The sky', 'above', 'the port', 'was',
        'the color of television', 'tuned', 'to',
        'a dead channel', '.', 'All', 'this happened',
        'more or less', '.', 'I', 'had', 'the story',
        'bit by bit', 'from various people', 'and', 'as generally',
        'happens', 'in such cases', 'each time', 'it', 'was',
        'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}