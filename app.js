const submit = document.querySelector("#submit");
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

function playRound(playerSelection, computerSelection) {
  if (!gameOver) {
    computerSelection = computerPlay();
    playerSelection = document.getElementById("playerChoice").value.toLowerCase();
    if (playerSelection === "rock" && computerSelection === "paper") {
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You lose! Paper beats Rock");
    } 
    if (playerSelection === "rock" && computerSelection === "scissors") {
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Rock beats Scissors");
    }
    if (playerSelection === "paper" && computerSelection === "rock") {
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Paper beats Rock");
    } 
    if (playerSelection === "paper" && computerSelection === "scissors") {
      computerScore++;
      computerDisplay.textContent = computerScore;
      console.log("You lose! Scissors beats Paper");
    } 
    if (playerSelection === "scissors" && computerSelection === "rock") {
      computerScore++;
      comuterDisplay.textContent = computerScore;
      console.log("You lose! Rock beats Scissors");
    } 
    if (playerSelection === "scissors" && computerSelection === "paper") {
      playerScore++;
      playerDisplay.textContent = playerScore;
      console.log("You Win! Scissors beats Paper");
    } 
    if (playerSelection === computerSelection) {
      console.log("It's a tie! Try again");
    } 
    if (playerSelection !== ("rock" || "paper" || "scissors")) {
      console.log("That's not a valid choice. Try again")
    };
  }
  if ((playerScore || computerScore) === winningScore) {
    gameOver = true;
  };
};

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

submit.addEventListener("click", playRound);
resetBtn.addEventListener("click", reset);