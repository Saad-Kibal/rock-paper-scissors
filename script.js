const scoreElement = document.querySelector('.score-table');
const result = document.querySelector('.results')
let results='';
let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0 , losses : 0 , ties : 0
};

updateScoreElement();



function pickComputerMove(rng) {
    let ComputerMove;

    if (rng >= 0 && rng < 1 / 3) {
        ComputerMove = 'paper'
    }
    else if (rng >=1 / 3 && rng < 2 / 3) {
        ComputerMove = 'rock'
    }
    else if (rng > 2 / 3 && rng < 1) {
        ComputerMove = 'scissors'
    }
    return ComputerMove;
}

function playgame(move) {
    const rng = Math.random();
    const ComputerMove = pickComputerMove(rng);

    if ( (move === 'paper' && ComputerMove ==='rock')
           ||(move === 'rock' && ComputerMove === 'scissors')
           ||(move === 'scissors' && ComputerMove === 'paper')) {
               results='you win!!';
               score.wins += 1      
    }
    else if (move === ComputerMove) {
        results='its a tie';
        score.ties += 1 

    }
    else {
        results='you lose'
        score.losses += 1 
    }

    localStorage.setItem('score' , JSON.stringify(score));




    updateScoreElement ();

    result.innerHTML=`<p>You choose: <img src="./images/hand-${move}.svg" alt="${move}"></p>
        <p>Computer chose: <img src="./images/hand-${ComputerMove}.svg" alt="${ComputerMove}"></p>
        <p>${results}</p>`

}

function updateScoreElement () {
    scoreElement.innerHTML=`<p>player : ${score.wins} </p>
        <p>computer : ${score.losses} </p>
        <p>ties : ${score.ties}</p>`;
}

