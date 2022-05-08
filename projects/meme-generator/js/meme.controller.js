'use strict';

var gCanvas = document.getElementById('my-canvas');
var gCtx = gCanvas.getContext('2d');
var gStroke = 1;

function initCanvas() {
    addListeners();
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderMeme();
    });
}

function resizeCanvas() {
    if (window.innerWidth < 490) {
        gCanvas.width = 200;
        gCanvas.height = 200;
    } else if (window.innerWidth < 900) {
            gCanvas.width = 300;
            gCanvas.height = 300; 
        } else {
        gCanvas.width = 400;
        gCanvas.height = 400;
    }
}

function toggleNav() {
    document.body.classList.toggle('open-nav')
}

function setFontSize() {
    resizeCanvas();
    if(gCanvas.width < 300) return 35
    else return 50
}

function onSave() {
    const memeCanvas = gCanvas;
    userMsg('<h1>Meme Saved!</h1> <a onclick="openMyMemes()">CLICK HERE</a>');
    saveMyMemes(memeCanvas);
}

function renderMeme() {
    drawMemeFromGallery();
}

function onSwitchLine() {
    switchLine();
    const memeLine = getMemeLine();
    document.querySelector('input[name=meme-text]').value = memeLine.txt;
}

function onAddLine() {
    setLine();
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}

function onSetText(el) {
    const memeTxt = el.value;
    setLineTxt(memeTxt);
    renderMeme();
}

function onSetColor(el) {
    const memeClr = el.value;
    document.querySelector('input[name=meme-text]').style.color = memeClr;
    setColorTxt(memeClr);
    renderMeme();
}

function onStrokeTxt() {
    gStroke++;
    if (gStroke >= 5) return gStroke = 1;
    setStrokeTxt(gStroke);
    renderMeme();
}

function onAlign(direction) {
    setAlign(direction);
    renderMeme();
}

function onSetSize(value) {
    document.getElementById("font-size").innerHTML = value;
    const txtSize = value;
    setTxtSize(txtSize);
    renderMeme();
}

function onSetFont(value) {
    const txtFont = value;
    document.querySelector('input[name=meme-text]').style.fontFamily = txtFont;
    setTxtFont(txtFont);
    renderMeme();
}

function drawMemeFromGallery() {
    const meme = getMemeForDisplay();
    const images = getImgs()
    var img = new Image();
    img.src = images[meme.selectedImgId - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        renderTxt();
    };
}

function renderTxt() {
    var currLineIdx = 0;
    const meme = getMemeForDisplay();
    meme.lines.forEach(line => {
        drawText(currLineIdx++);
    });
}

function drawText(lineIdx) {
    const meme = getMemeForDisplay();
    const line = meme.lines[lineIdx];
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.posX, line.posY);
    gCtx.strokeText(line.txt, line.posX, line.posY);
}

function onDownload(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function toggle3d() {
    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.classList.toggle('canvas-container-3d');
    var elSwitch = document.querySelector('.switch');
    elSwitch.innerText = (canvasContainer.classList.contains('canvas-container-3d')) ? 'ON' : 'OFF';
}

function onBack() {
    document.querySelector('.gallery').style.display = 'flex';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.memes-section').style.display = 'none';
    document.querySelector('.canvas-bg').style.opacity = '0';
    document.querySelector('.nav-gallery').style.display = 'flex';
    document.querySelector('.nav-canvas').style.display = 'none';
    document.querySelector('.nav-my-memes').style.display = 'none';
    renderGallery();
    resetCanvas();
}

function resetCanvas() {
    const meme = getMemeForDisplay();
    if (!meme.lines.length) setLine();
    else {
        var lineIdx = 1
        meme.lines.forEach(line => {
            line.txt = `Meme Line ${lineIdx++}`;
            line.size = setFontSize();
            line.align = 'center';
            line.color = 'white';
            line.font = 'impact',
            line.posX = gCanvas.width / 2,
            line.stroke = 1;
        });
    }
    document.querySelector('input[name=meme-text]').value = '';
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function userMsg(msg) {
    const el = document.querySelector('.user-msg');
    el.innerHTML = msg;
    el.classList.remove('close');
    el.classList.add('open');
    setTimeout(() => {
        el.classList.add('close');
        el.classList.remove('open');
    }, 4000);
}
