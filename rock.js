let score;

try {
  score = JSON.parse(localStorage.getItem("score"));
  if (
    !score ||
    typeof score.wins !== "number" ||
    typeof score.losses !== "number" ||
    typeof score.ties !== "number"
  ) {
    throw new Error("Invalid score data");
  }
} catch (e) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  localStorage.setItem("score", JSON.stringify(score));
}

const displayScore = () => {
  document.querySelector(".js-score-display").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

displayScore();
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }
  if (result == "You win.") {
    score.wins++;
  } else if (result == "You lose.") {
    score.losses++;
  } else score.ties++;

  document.querySelector(".js-result-of-move").innerHTML = `${result}`;
  document.querySelector(".js-moves-played").innerHTML = `You
  <img src="${playerMove}.png" alt="" class="emoji-image">
  
  <img src="${computerMove}.png" alt="" class="emoji-image">
  Computer`;

  displayScore();

  localStorage.setItem("score", JSON.stringify(score)); //stored previous score
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}


let isAutoplaying = false;
let id = 0;
function autoplay(){
  let text = document.querySelector('.js-auto-play');

  if(!isAutoplaying){
    text.innerHTML = "Stop play";

    id = setInterval(function abc(){
    let playerMove = pickComputerMove();
    playGame(playerMove);
    }, 1000);

    isAutoplaying = true;   
    
  }
  else{
    clearInterval(id);
    isAutoplaying = false;    
    text.innerHTML = "Auto play";
  }

}

displayScore();
document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));
document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));

