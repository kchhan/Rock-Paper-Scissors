const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors")
const resetBtn = document.querySelector("#reset");
let winningDisplay = document.querySelector("#winningDisplay");
let numInput = document.querySelector("#numInput");
let playerScore = 0;
let computerScore = 0;
let winningScore = 5;
let gameOver = false;

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

rock.addEventListener("click", function(){
  if (!gameOver) {
    computerSelection = computerPlay();
    if (computerSelection === "paper") {
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You lose! Paper beats Rock");
    }
    if (computerSelection === "scissors") {
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Rock beats Scissors");
    } 
    if (rock.value === computerSelection) {
      console.log("It's a tie! Try again");
    }
  }
  if (playerScore === winningScore || computerScore === winningScore) {
     return gameOver = true;
  };
});

paper.addEventListener("click", function(){
  if (!gameOver) {
    computerSelection = computerPlay();
    if (computerSelection === "rock") {
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Paper beats Rock");
    }
    if (computerSelection === "scissors") {
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You Lose! Scissors beats Paper");
    } 
    if (paper.value === computerSelection) {
      console.log("It's a tie! Try again");
    }
  }
  if (playerScore === winningScore || computerScore === winningScore) {
    return gameOver = true;
  };
});

scissors.addEventListener("click", function(){
  if (!gameOver) {
    computerSelection = computerPlay();
    if (computerSelection === "rock") {
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You lose! Rock beats Scissors");
    }
    if (computerSelection === "paper") {
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Scissors beats Paper");
    } 
    if (scissors.value === computerSelection) {
      console.log("It's a tie! Try again");
    }
  }
  if (playerScore === winningScore || computerScore === winningScore) {
    return gameOver = true;
  };
});

function reset(){
  playerScore = 0;
  computerScore = 0;
  playerDisplay.textContent = 0;
  computerDisplay.textContent = 0;
  gameOver = false;
}

numInput.addEventListener("change", function(){
	winningDisplay.textContent = this.value;
	winningScore = Number(this.value);
	reset();
});

resetBtn.addEventListener("click", reset);