/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the set winning points or (winner flag) on GLOBAL score wins the game
- a player loses their entire score if they roll two 6 in a row

*/

var scores, roundScore, activePlayer, isGamePlaying, dicesRolls, dices;

init();

// var lastDice;

// initialize the game or start a new game
function init() {
  isGamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  dicesRolls = [];
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
}
// chnage to next player
function changePlayer() {
  document.querySelector(`#current-${activePlayer}`).textContent = "0";

  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle("active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle("active");
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click", (e) => {
  // check if the game still playing and if not ignore the event
  if (isGamePlaying) {
    var dices = [];
    var diceDoms = document.querySelectorAll(".dice");
    diceDoms.forEach((diceDom) => {
      diceValue = Math.floor(Math.random() * 6) + 1;
      dices.push(diceValue);
      diceDom.style.display = "block";
      diceDom.src = `dice-${diceValue}.png`;
    });

    // console.log(diceTotal);
    // if (dice === 6 && lastDice === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector(`#score-${activePlayer}`).textContent = "0";
    //   changePlayer();
    // } else

    if (dices[0] > 1 && dices[1] > 1) {
      var total = dices[0] + dices[1];
      roundScore += total;
      document.querySelector(
        `#current-${activePlayer}`,
      ).textContent = roundScore;
    } else {
      // change player
      changePlayer();
    }

    // lastDice = dice;
  }
});

// hold button and add the roundScore to the player actual score

document.querySelector(".btn-hold").addEventListener("click", (e) => {
  // check if the game still playing and if not ignore the event

  if (isGamePlaying) {
    // add roundScore to the player
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;
    //   console.log(input);

    // undefined , 0, null or "" are coerced to false
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check the winner
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.toggle("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.toggle("active");
      // set this variable to true to end the current game
      isGamePlaying = false;
    } else {
      // change player
      changePlayer();
    }
  }
});

// this will start a new game
document.querySelector(".btn-new").addEventListener("click", (e) => {
  init();
});
