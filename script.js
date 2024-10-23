const scoreElement = document.querySelector('.score-table');
const resultElement = document.querySelector('.results');
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function pickComputerMove(rng) {
  let computerMove;
  if (rng === 1) {
    computerMove = 'paper';
  } else if (rng === 2) {
    computerMove = 'rock';
  } else if (rng === 3) {
    computerMove = 'scissors';
  }
  return computerMove;
}

function playGame(move) {
  const computerMove = pickComputerMove(Math.floor(Math.random() * 3) + 1);
  let result;

  if (beats(move, computerMove)) {
    result = 'You win!';
    score.wins ++;
  } else if (move === computerMove) {
    result = 'It\'s a tie.';
    score.ties ++;
  } else {
    result = 'You lose.';
    score.losses ++;
  }


  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  resultElement.innerHTML = `
    <p>You chose: <img src="./images/hand-${move}.svg" alt="${move}"></p>
    <p>Computer chose: <img src="./images/hand-${computerMove}.svg" alt="${computerMove}"></p>
    <p>${result}</p>
  `;
  if (score.wins >= 5) {
    scoreElement.innerHTML = 'Congratulations! You won the round!';
  } else if (score.losses >= 5) {
    scoreElement.innerHTML = 'Sorry, you lost the game.';
  }
}

function beats(playerMove, computerMove) {
  return (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'scissors' && computerMove === 'paper');
}

function updateScoreElement() {
  scoreElement.innerHTML = `
    <p>player : ${score.wins} </p>
    <p>computer : ${score.losses} </p>
    <p>ties : ${score.ties}</p>
  `;
}

