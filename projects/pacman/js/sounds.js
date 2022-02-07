function startGameSound() {
    var audio = new Audio('sounds/pacman_beginning.wav');
    audio.play(); 
  }
  
  function deathSound() {
    var audio = new Audio('sounds/pacman_death.wav');
    audio.play(); 
  }

  function eatFruit() {
    var audio = new Audio('/ounds/pacman_eatfruit.wav');
    audio.play(); 
  }

  function eatGhost() {
    var audio = new Audio('sounds/pacman_eatghost.wav');
    audio.play(); 
  }

  function superModeSound() {
    var audio = new Audio('sounds/pacman_intermission.wav');
    audio.play(); 
  }