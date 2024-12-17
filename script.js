// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
let timer = document.querySelector(".message");

const diceEl = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let randomDice;

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// selecting the dice number functionality
rollDice.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice number
    randomDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice number
    diceEl.classList.remove("hidden");
    diceEl.textContent = `${randomDice}`;

    // 3. Check for number 1
    if (randomDice !== 1) {
      // Add dice number to current score
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //  CHANGE LATER
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 20
    if (scores[activePlayer] >= 20) {
      // Finish the game.
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // checking if active player has > or = 20
      if (activePlayer == 0) {
        alert(`Player 1 wins! Your final score is: ${scores[activePlayer]}`);
      } else {
        alert(`Player 2 wins! Your final score is: ${scores[activePlayer]}`);
      }
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener("click", init);

// Setting up timer countdown
const startLogOutTimer = function () {
  // Set time to 10seconds
  let time = 10;
  // call the timer every seconds
  const timerCountdown = setInterval(function () {
    // in each call, print the remaining time to user
    let PlayerTurn = activePlayer == 0 ? "1" : "2";
    timer.textContent = `Player's ${PlayerTurn} turn - Time left: ${time}s`;

    // Decrease 1s
    time = time - 1;

    // when 0 seconds, stop the timer and switch player
    if (time === 0) {
      clearInterval(timerCountdown);
      switchPlayer();
      startLogOutTimer();

      // if there is a winner, stop timer
    }
    if (scores[activePlayer] >= 20) {
      // playing = false;
      clearInterval(timerCountdown);
    }
    if (
      btnHold.addEventListener("click", function () {
        clearInterval(timerCountdown);
        startLogOutTimer();
      })
    ) {
      switchPlayer();
    }
  }, 1000);
};

startLogOutTimer();
