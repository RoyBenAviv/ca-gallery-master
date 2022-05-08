'use strict';

const STORAGE_KEY = 'memesDB'

var gMyMemes = []
var gImgs;
var gImgId = 1;
var gFilterImg;

_createImages();

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Meme line 1',
            size: setFontSize(),
            align: 'center',
            color: 'white',
            font: 'Impact',
            posX: gCanvas.width / 2,
            posY: 80,
            stroke: 1,
            isDrag: false
        },
        {
            txt: 'Meme line 2',
            size: setFontSize(),
            align: 'center',
            color: 'white',
            font: 'Impact',
            posX: gCanvas.width / 2,
            posY: gCanvas.height - 80,
            stroke: 1,
            isDrag: false
        }
    ]
};

function _createImage(url, keywords) {
    return {
        id: gImgId++,
        url,
        keywords
    };
}

function _createImages() {
    gImgs = [
        _createImage(`./images/meme-images/1.jpg`, 'Politics'),
        _createImage(`./images/meme-images/2.jpg`, 'Animals'),
        _createImage(`./images/meme-images/3.jpg`, 'Animals'),
        _createImage(`./images/meme-images/4.jpg`, 'Animals'),
        _createImage(`./images/meme-images/5.jpg`, 'Babys'),
        _createImage(`./images/meme-images/6.jpg`, 'TV'),
        _createImage(`./images/meme-images/7.jpg`, 'Babys'),
        _createImage(`./images/meme-images/8.jpg`, 'TV'),
        _createImage(`./images/meme-images/9.jpg`, 'Babys'),
        _createImage(`./images/meme-images/10.jpg`, 'Politics'),
        _createImage(`./images/meme-images/11.jpg`, 'TV'),
        _createImage(`./images/meme-images/12.jpg`, 'TV'),
        _createImage(`./images/meme-images/13.jpg`, 'Movies'),
        _createImage(`./images/meme-images/14.jpg`, 'Movies'),
        _createImage(`./images/meme-images/15.jpg`, 'TV'),
        _createImage(`./images/meme-images/16.jpg`, 'TV'),
        _createImage(`./images/meme-images/17.jpg`, 'Politics'),
        _createImage(`./images/meme-images/18.jpg`, 'Movies'),
    ];
}

function addNewImg(img) {
    const uploadImg = img.src
    gImgs.push(_createImage(uploadImg, 'Uploaded'))
    gMeme.selectedImgId = gImgs.length
}

// function getImgs

function getImgs() {
    const images = gImgs.filter(img => {
        const keywords = img.keywords.toUpperCase();
        return keywords === gFilterImg;
    });
    return (!images.length) ? gImgs : images;
}

function filterImage(value) {
    gFilterImg = value.toUpperCase();
}

function setImg(imageId) {
    gMeme.selectedImgId = imageId;
    renderMeme();
}

function setSavedMeme(savedMeme) {
    gMeme = savedMeme.meme
    renderMeme();
}

function setRandomMeme(imageId) {
    gMeme.selectedImgId = imageId;
    gMeme.lines = []

    for (var i = 0; i < getRandomInt(1,3); i++) {
        gMeme.lines.push({
            txt: getRandomTxt(),
            size: calcFontSize(),
            align: 'center',
            color: getRandomColor(),
            font: 'Impact',
            posX: gCanvas.width / 2,
            posY: calcPosY() + 90
        });
    }
    renderMeme();
}

function calcFontSize() {
    const randomTxt = getRandomTxt();
    if(randomTxt.length >= 13) return 50
    return 25;
}

function calcPosY() {
    var lastLine
    if (gMeme.lines.length === 2) lastLine = gMeme.lines[0]
    else lastLine = gMeme.lines[gMeme.lines.length - 1]
    if(!gMeme.lines.length) return 80
    if (lastLine.posY > gCanvas.height - 30) return lastLine.posY = gMeme.lines[0].posY + 90
    return lastLine.posY + 50
}

function setLine() {
    gMeme.lines.push({
        txt: `Meme Line ${gMeme.lines.length + 1}`,
        size: setFontSize(),
        align: 'center',
        color: 'white',
        font: 'Impact',
        posX: gCanvas.width / 2,
        posY: calcPosY(),
        stroke: 1,
        isDrag: false
    });
}

function deleteLine() {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    gMeme.lines.splice(memeLine, 1);
}

function setLineTxt(memeTxt) {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    memeLine.txt = memeTxt;
}

function setColorTxt(memeClr) {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    memeLine.color = memeClr;
}

function setTxtSize(txtSize) {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    memeLine.size = txtSize;
}

function setTxtFont(txtFont) {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    switch (txtFont) {
        case 'IMPACT':
            memeLine.font = 'Impact';
            break;
        case 'ARIAL':
            memeLine.font = 'Arial';
            break;
        case 'GEORGIA':
            memeLine.font = 'Georgia';
            break;
    }
}

function setStrokeTxt(stroke) {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    memeLine.stroke = stroke;
}

function setAlign(direction) {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    if(!memeLine) userMsg('<h1>No lines!</h1>')
    switch (direction) {
        case 'left':
            memeLine.align = 'left';
            break;
        case 'center':
            memeLine.align = 'center';
            break;
        case 'right':
            memeLine.align = 'right';
            break;
    }
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function getMemeLine() {
    const memeLine = gMeme.lines[gMeme.selectedLineIdx];
    return memeLine;
}

function getMemeForDisplay() {
    const meme = gMeme;
    return meme;
}

function saveMyMemes(memeCanvas) {
    var memeInfo = {...gMeme}
    const myMeme = {
        img: memeCanvas.toDataURL("image/jpeg"),
        meme: memeInfo,
        url: memeCanvas
    }
    if (!gMyMemes) gMyMemes = []
    gMyMemes.push(myMeme)
    _saveMemesToStorage()
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMyMemes);
}
