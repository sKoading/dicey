"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// Variables déclaration
let currentScore, activePlayer, playingState, scores;

// Functions

// Starting conditions (Initializing function)
const init = function () {
  // Variables value assignation

  currentScore = 0;
  activePlayer = 0;
  playingState = true;

  // Array value aassignation

  scores = [0, 0];

  // Elements value assignation

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Elements class manipulation

  diceEl.classList.add("hidden");
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

// Calling the function to initialize the game

init();

const switchPlayer = function () {
  // Before we switch the player we need to set his/her current score display back to zero
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // Only if the Game is active so playingState is true we continue
  if (playingState) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Diplay dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.svg`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding the current score
btnHold.addEventListener("click", function () {
  if (playingState) {
    // 1. Add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // If so finish the game
      playingState = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

// Resetting the Game/New Game
btnNew.addEventListener("click", init);

//Rajouter le if 1 -> Start new game
