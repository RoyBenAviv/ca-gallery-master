'use strict';

function init() {
    renderGallery();
    initCanvas()
}

function renderGallery() {
    var images = getImgs();
    var strHtmls = images.map(image => {
        return `
        <div class="img-container" onclick="onImgSelect(${image.id})"> 
        <img class="meme-img" src="${image.url}">
        <div class="genre">Genre: ${image.keywords}</div>
        </div>`;
    });
    document.querySelector('.gallery-images').innerHTML = strHtmls.join('');
}

function onSearchGenre(value) {
    filterImage(value)
    renderGallery();
}

function getRandomImg() {
    var images = getImgs();

    var idx = getRandomInt(0, images.length - 1);
    var drawnImage = images[idx];
    return drawnImage
}

function onImgSelect(imageId) {
    switchSections()
    setImg(imageId)
}

function onRandomMeme() {
    switchSections()
    const drawnImage = getRandomImg()
    setRandomMeme(drawnImage.id)
}

function switchSections() {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.memes-section').style.display = 'none'
    document.querySelector('.editor').style.display = 'flex'
    document.querySelector('.canvas-bg').style.opacity = '0.5'
    document.querySelector('.nav-gallery').style.display = 'none'
    document.querySelector('.nav-canvas').style.display = 'flex'
    document.querySelector('.nav-my-memes').style.display = 'none'
}