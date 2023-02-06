const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");
dice.style.display = "none";

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let gameOwer = true;

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (gameOwer) {
    dice.style.display = "block";
    const randomNumbers = Math.floor(Math.random() * 6) + 1;
    dice.src = `./dice-${randomNumbers}.png`;
    if (randomNumbers !== 1) {
      currentScore += randomNumbers;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

const winner = () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  warning();
  gameOwer = false;
};

const warning = () => {
  document
    .querySelector(`.over--${activePlayer ? 0 : 1}`)
    .classList.remove("over");
};

btnHold.addEventListener("click", () => {
  if (gameOwer) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      winner();
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", () => {
  document
    .querySelector(`.over--${activePlayer ? 0 : 1}`)
    .classList.add("over");
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  gameOwer = true;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
});
