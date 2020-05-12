const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors")
const resetBtn = document.querySelector("#reset");
const playerCard = document.querySelector(".playerCard");
const computerCard = document.querySelector(".computerCard");
let winningDisplay = document.querySelector("#winningDisplay");
let numInput = document.querySelector("#numInput");
let playerScore = 0;
let computerScore = 0;
let winningScore = 5;
let gameOver = false;

// Computer random chooses a play
function computerPlay() {
  let choice = Math.floor(Math.random()*3+1);
  switch (choice) {
    case 1:
      return "rock";
    case 2: 
      return "paper";
    case 3: 
      return "scissors";
  }
}

// Showing player and cpu actions in Card
function pAddRock() {
  const showRock = document.createElement("i");
  showRock.classList.add("far", "fa-hand-rock", "fa-4x", "m-1");
  playerCard.appendChild(showRock);
}

function pAddPaper() {
  const showPaper = document.createElement("i");
  showPaper.classList.add("far", "fa-hand-paper", "fa-4x", "m-1");
  playerCard.appendChild(showPaper);
}

function pAddScissors() {
  const showScissors = document.createElement("i");
  showScissors.classList.add("far", "fa-hand-scissors", "fa-4x", "m-1");
  playerCard.appendChild(showScissors);
}

function cpuAddRock() {
  const showRock = document.createElement("i");
  showRock.classList.add("far", "fa-hand-rock", "fa-4x", "m-1");
  computerCard.appendChild(showRock);
}

function cpuAddPaper() {
  const showPaper = document.createElement("i");
  showPaper.classList.add("far", "fa-hand-paper", "fa-4x", "m-1");
  computerCard.appendChild(showPaper);
}

function cpuAddScissors() {
  const showScissors = document.createElement("i");
  showScissors.classList.add("far", "fa-hand-scissors", "fa-4x", "m-1");
  computerCard.appendChild(showScissors);
}

function removeChildren() {
  if (playerCard.childNodes.length !== 0) {
    playerCard.removeChild(playerCard.childNodes[0]);
  }
  if (computerCard.childNodes.length !== 0) {
    computerCard.removeChild(computerCard.childNodes[0]);
  }
}

// Player Choices
function playRock() {
  checkValue();
  removeChildren();
  if (!gameOver) {
    computerSelection = computerPlay();
    if (computerSelection === "paper") {
      cpuAddPaper();
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You lose! Paper beats Rock");
    }
    if (computerSelection === "scissors") {
      cpuAddScissors();
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Rock beats Scissors");
    } 
    if (rock.value === computerSelection) {
      cpuAddRock();
      console.log("It's a tie! Try again");
    }
  }
  if (playerScore === winningScore || computerScore === winningScore) {
     return gameOver = true;
  };
  pAddRock();
}

function playPaper() {
  checkValue();
  removeChildren();
  if (!gameOver) {
    computerSelection = computerPlay();
    if (computerSelection === "rock") {
      cpuAddRock();
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Paper beats Rock");
    }
    if (computerSelection === "scissors") {
      cpuAddScissors();
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You Lose! Scissors beats Paper");
    } 
    if (paper.value === computerSelection) {
      cpuAddPaper();
      console.log("It's a tie! Try again");
    }
  }
  if (playerScore === winningScore || computerScore === winningScore) {
    return gameOver = true;
  };
  pAddPaper();
}

function playScissors() {
  checkValue();
  removeChildren();
  if (!gameOver) {
    computerSelection = computerPlay();
    if (computerSelection === "rock") {
      cpuAddRock();
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You lose! Rock beats Scissors");
    }
    if (computerSelection === "paper") {
      cpuAddPaper();
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Scissors beats Paper");
    } 
    if (scissors.value === computerSelection) {
      cpuAddScissors();
      console.log("It's a tie! Try again");
    }
  }
  if (playerScore === winningScore || computerScore === winningScore) {
    return gameOver = true;
  };
  pAddScissors();
}

// Resets game back to Start
function reset(){
  playerScore = 0;
  computerScore = 0;
  playerDisplay.textContent = 0;
  computerDisplay.textContent = 0;
  gameOver = false;
}

function checkValue() {
  if (numInput.value < 1 || numInput.value > 15) {
    return false;
  } return true;
}


// Changes the number of wins needed
numInput.addEventListener("change", function(){
  if (!checkValue()){
    return gameOver = true;
  } 
	winningDisplay.textContent = this.value;
	winningScore = Number(this.value);
	reset();
});

resetBtn.addEventListener("click", reset);

//Play Buttons
rock.addEventListener("click", playRock);
paper.addEventListener("click", playPaper);
scissors.addEventListener("click", playScissors);
