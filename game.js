document.addEventListener('DOMContentLoaded', () => {
    const moles = document.querySelectorAll('.mole');
    const scoreDisplay = document.getElementById('score');
    const modeButtons = document.querySelectorAll('.mode-button');
    let score = 0;
    let activeMole;
    let gameInterval;
    let gameTime = 10000; // Default game time is 10 seconds
    let moleAppearanceInterval = 1000; // Default mole appearance interval is 1 second
  
    moles.forEach(mole => {
      mole.addEventListener('click', () => {
        if (mole === activeMole) {
          score++;
          scoreDisplay.textContent = score;
          activeMole.classList.remove('active');
        }
      });
    });
  
    modeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const mode = button.getAttribute('data-mode');
        setMode(mode);
        startGame();
      });
    });
  
    function setMode(mode) {
      if (mode === 'easy') {
        moleAppearanceInterval = 1200;
      } else if (mode === 'medium') {
        moleAppearanceInterval = 800;
      } else if (mode === 'hard') {
        moleAppearanceInterval = 500;
      }
    }
  
    function startGame() {
      score = 0;
      scoreDisplay.textContent = score;
      clearInterval(gameInterval);
      gameInterval = setInterval(showMole, moleAppearanceInterval);
      setTimeout(endGame, gameTime);
    }
  
    function showMole() {
      if (activeMole) {
        activeMole.classList.remove('active');
      }
      const randomIndex = Math.floor(Math.random() * moles.length);
      activeMole = moles[randomIndex];
      activeMole.classList.add('active');
    }
  
    function endGame() {
      clearInterval(gameInterval);
      if (activeMole) {
        activeMole.classList.remove('active');
      }
      alert(`Game over! Your score is ${score}`);
      window.parent.postMessage({ type: 'submit-score', score: score }, '*');
    }
  });
  