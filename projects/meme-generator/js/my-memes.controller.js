'use strict'

var gMyMemes = loadFromStorage(STORAGE_KEY)

function openMyMemes() {
    document.querySelector('.canvas-bg').style.opacity = '0';
    document.querySelector('.memes-section').style.display = 'flex'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.nav-my-memes').style.display = 'flex'
    document.querySelector('.nav-gallery').style.display = 'none'
    document.querySelector('.nav-canvas').style.display = 'none'
    renderMyMemes()
}

function renderMyMemes() {
    var memeIdx = 0
    if(!gMyMemes || !gMyMemes.length) {
        userMsg('<h1>No memes to display.</h1>')
        onBack()
        return
    } 
    else {
        var strHtmls = gMyMemes.map(myMeme => {
            
            return `<div class="saved-memes">
            <img onclick="onSavedMeme(${memeIdx})" class="meme-img" src="${myMeme.img}">
            <div class="saved-options flex space-between">
            <span onclick="onDeleteMeme(${memeIdx++})"><i class="fa-solid fa-trash-can"></i></span>
            <span onclick="onShareMeme('${myMeme.img}')" ><i class="fa-solid fa-share-nodes"></i></i></span>
            </div>
            </div>`
        })
    }
    document.querySelector('.my-memes-gallery').innerHTML = strHtmls.join('')
}

function onSavedMeme(memeIdx) {
    switchSections()
    setSavedMeme(gMyMemes[memeIdx])
}

function onDeleteMeme(memeIdx) {
    gMyMemes.splice(memeIdx, 1);
    renderMyMemes()
}

function onShareMeme(memeImg) {
    
    const imgDataUrl = memeImg
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)        
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`);
    }
    doUploadImg(imgDataUrl, onSuccess);
}