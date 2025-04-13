'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// document.getElementById("score--1").textContent = "nu"

//Starting conditons
let scores, currentScore, activePlayer, playing; //*Se inicializan los valores para luego setearlos en el llamado a la funcuion

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner'); //*Si no existe no lo hace nada al igual al add si ya existe
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

let newGame = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //*Aunque se defina false, mientras siga siendo true, solo asi se ejecutara el false
    //1. Add current score to active players score
    console.log(currentScore);
    // 2. scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore; //*Cuando son dos valores, se puede almacenar en un array
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 3. Check if players score is >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      //Finis the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //*classList para las clases, no style xd
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //*classList para las clases, no style xd
      diceEl.classList.add('hidden');

      switchPlayer();
    } else {
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click', () => {
//   switchPlayer();
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   // document
//   //   .querySelector(`.player--${activePlayer}`)
//   //   .classList.toggle('player--active');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   diceEl.classList.add('hidden');

//   currentScore = 0;
// });

btnNew.addEventListener('click', init);
