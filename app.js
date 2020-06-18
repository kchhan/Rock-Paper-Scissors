// ItemCtrl
const ItemCtrl = (() => {
  const data = {
    players: [
      {
        id: 'player',
        score: 0,
      },
      {
        id: 'computer',
        score: 0,
      },
    ],
    winningScore: 5,
    gameOver: false,
  };

  // Public methods
  return {
    addToPlayerScore() {
      data.players[0].score++;
    },

    addToComputerScore() {
      data.players[1].score++;
    },

    getPlayerScore() {
      return data.players[0].score;
    },

    getComputerScore() {
      return data.players[1].score;
    },

    setWinningScore(num) {
      data.winningScore = num;
    },

    checkForWinningScore() {
      if (
        data.players[0].score === data.winningScore ||
        data.players[1].score === data.winningScore
      ) {
        return (data.gameOver = true);
      }
    },

    isGameOver() {
      return data.gameOver;
    },

    resetScores() {
      data.players[0].score = 0;
      data.players[1].score = 0;
    },

    resetGame() {
      return (data.gameOver = false);
    },

    logData() {
      return data;
    },
  };
})();

// UICtrl
const UICtrl = (() => {
  const UISelectors = {
    rock: '#rock',
    paper: '#paper',
    scissors: '#scissors',
    resetBtn: '#reset',
    playerCard: '#player-card',
    computerCard: '#computer-card',
    playerDisplay: '#player-display',
    computerDisplay: '#computer-display',
    winningDisplay: '#winning-display',
    numInput: '#num-input',
    gameDisplay: '#game-display',
  };

  // For brevity
  const $ = (element) => {
    return document.querySelector(element);
  };

  // Public methods
  return {
    addPlayerSelection(choice) {
      const icon = document.createElement('i');
      icon.classList.add('far', `fa-hand-${choice}`, 'm-1', 'fa-4x');
      $(UISelectors.playerCard).appendChild(icon);
    },

    addCpuSelection(choice) {
      const icon = document.createElement('i');
      icon.classList.add('far', `fa-hand-${choice}`, 'm-1', 'fa-4x');
      $(UISelectors.computerCard).appendChild(icon);
    },

    updateDisplays() {
      const playerScore = ItemCtrl.getPlayerScore();
      const computerScore = ItemCtrl.getComputerScore();
      $(UISelectors.playerDisplay).textContent = playerScore;
      $(UISelectors.computerDisplay).textContent = computerScore;
    },

    removeIcons() {
      if ($(UISelectors.playerCard).childNodes.length !== 0) {
        $(UISelectors.playerCard).removeChild(
          $(UISelectors.playerCard).childNodes[0]
        );
      }
      if ($(UISelectors.computerCard).childNodes.length !== 0) {
        $(UISelectors.computerCard).removeChild(
          $(UISelectors.computerCard).childNodes[0]
        );
      }
    },

    changeWinningScoreDisplay(value) {
      $(UISelectors.winningDisplay).textContent = value;
    },

    updateGameDisplay(input) {
      switch (input) {
        case 'tie':
          $(UISelectors.gameDisplay).textContent = "It's a tie!";
          break;
        case 'rock-paper':
          $(UISelectors.gameDisplay).textContent =
            'CPU wins round. Paper beats Rock.';
          break;
        case 'rock-scissors':
          $(UISelectors.gameDisplay).textContent =
            'Player wins round. Rock beats Scissors.';
          break;
        case 'paper-rock':
          $(UISelectors.gameDisplay).textContent =
            'Player wins round. Paper beats Rock.';
          break;
        case 'paper-scissors':
          $(UISelectors.gameDisplay).textContent =
            'CPU wins round. Scissors beats Paper.';
          break;
        case 'scissors-rock':
          $(UISelectors.gameDisplay).textContent =
            'CPU wins round. Rock beats Scissors.';
          break;
        case 'scissors-paper':
          $(UISelectors.gameDisplay).textContent =
            'Player wins round. Scissors beats Paper.';
          break;
      }
    },

    resetScoreDisplays() {
      $(UISelectors.playerDisplay).textContent = 0;
      $(UISelectors.computerDisplay).textContent = 0;
      $(UISelectors.gameDisplay).textContent = 'Game start!';
    },

    getSelectors() {
      return UISelectors;
    },
  };
})();

// AppCtrl
const App = ((ItemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.rock)
      .addEventListener('click', playRock);

    document
      .querySelector(UISelectors.paper)
      .addEventListener('click', playPaper);

    document
      .querySelector(UISelectors.scissors)
      .addEventListener('click', playScissors);

    document
      .querySelector(UISelectors.numInput)
      .addEventListener('change', changeWinningScore);

    document
      .querySelector(UISelectors.resetBtn)
      .addEventListener('click', reset);
  };

  const computerPlay = () => {
    const choice = Math.floor(Math.random() * 3 + 1);
    switch (choice) {
      case 1:
        return 'rock';
      case 2:
        return 'paper';
      case 3:
        return 'scissors';
    }
  };

  const playRock = () => {
    UICtrl.removeIcons();
    if (!ItemCtrl.isGameOver()) {
      const computerSelection = computerPlay();
      switch (computerSelection) {
        case 'rock':
          UICtrl.addCpuSelection(computerSelection);
          UICtrl.updateGameDisplay('tie');
          break;
        case 'paper':
          UICtrl.addCpuSelection(computerSelection);
          ItemCtrl.addToComputerScore();
          UICtrl.updateDisplays();
          UICtrl.updateGameDisplay('rock-paper');
          break;
        case 'scissors':
          UICtrl.addCpuSelection(computerSelection);
          ItemCtrl.addToPlayerScore();
          UICtrl.updateDisplays();
          UICtrl.updateGameDisplay('rock-scissors');
          break;
      }
      UICtrl.addPlayerSelection('rock');
    }
    ItemCtrl.checkForWinningScore();
  };

  const playPaper = () => {
    UICtrl.removeIcons();
    if (!ItemCtrl.isGameOver()) {
      const computerSelection = computerPlay();
      switch (computerSelection) {
        case 'rock':
          UICtrl.addCpuSelection(computerSelection);
          ItemCtrl.addToPlayerScore();
          UICtrl.updateDisplays();
          UICtrl.updateGameDisplay('paper-rock');
          break;
        case 'paper':
          UICtrl.addCpuSelection(computerSelection);
          UICtrl.updateGameDisplay('tie');
          break;
        case 'scissors':
          UICtrl.addCpuSelection(computerSelection);
          ItemCtrl.addToComputerScore();
          UICtrl.updateDisplays();
          UICtrl.updateGameDisplay('paper-scissors');
          break;
      }
      UICtrl.addPlayerSelection('paper');
    }
    ItemCtrl.checkForWinningScore();
  };

  const playScissors = () => {
    UICtrl.removeIcons();
    if (!ItemCtrl.isGameOver()) {
      const computerSelection = computerPlay();
      switch (computerSelection) {
        case 'rock':
          UICtrl.addCpuSelection(computerSelection);
          ItemCtrl.addToComputerScore();
          UICtrl.updateDisplays();
          UICtrl.updateGameDisplay('scissors-rock');
          break;
        case 'paper':
          UICtrl.addCpuSelection(computerSelection);
          ItemCtrl.addToPlayerScore();
          UICtrl.updateDisplays();
          UICtrl.updateGameDisplay('scissors-paper');
          break;
        case 'scissors':
          UICtrl.addCpuSelection(computerSelection);
          UICtrl.updateGameDisplay('tie');
          break;
      }
      UICtrl.addPlayerSelection('scissors');
    }
    ItemCtrl.checkForWinningScore();
  };

  const changeWinningScore = (e) => {
    if (e.target.value > 0) {
      const value = e.target.value;
      UICtrl.changeWinningScoreDisplay(value);
      ItemCtrl.setWinningScore(parseInt(value));
      reset();
    }
  };

  const reset = () => {
    ItemCtrl.resetScores();
    UICtrl.resetScoreDisplays();
    ItemCtrl.resetGame();
  };

  // Public methods
  return {
    init() {
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialize app
App.init();
