'use strict';
let score0Element = document.getElementById('score--0');
let score1Element = document.getElementById('score--1');
let rollDiceButton = document.querySelector('.btn--roll');
let resetGameButton = document.querySelector('.btn--new');
let holdButton = document.querySelector('.btn--hold');
let diceElement = document.querySelector('.dice');
let currentScore00 = document.getElementById('current--0');
let currentScore01 = document.getElementById('current--1');
let player00 = document.querySelector('.player--0');
let player01 = document.querySelector('.player--1');
let scores, currentScore, activePlayer, playing;
// New Feature
let introContainer = document.querySelector('.gameIntroblur');
let gameMessage = document.querySelector('.gintro');
let PlayerNameContainer = document.querySelector('.Player-Name-Input');
let playerInputValue01 = document.querySelector('#player1Name');
let playerInputValue02 = document.querySelector('#player2Name');
let proccedBtn = document.querySelector('.proceedbtn');
let introBtn = document.querySelector('.introbtn');
let playGameBtn = document.querySelector('.playgamebtn');
let gameVsContainer = document.querySelector('.gameVs');
let playerName1 = document.querySelector('.vs1');
let playerName2 = document.querySelector('.vs2');
let player1colum = document.querySelector('.Player1input-col');
let player2colum = document.querySelector('.Player2input-col');
let totalWon_1 = 0;
let totalWon_2 = 0;
let emoji1 = document.querySelector('.emoji1');
let emoji2 = document.querySelector('.emoji2');
let diceSound = document.querySelector('.dice-sound');
let holdSound = document.querySelector('.hold-sound');
let wonSound = document.querySelector('.won-sound');
let newGameSound = document.querySelector('.newgame-sound');
let switchGameSound = document.querySelector('.switchgame-sound');
console.log(switchGameSound);
let progressWidth = 0;
let randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
let autoClick;

// RUN BASE ON WINDOW LOAD
window.addEventListener('load', function () {
  introContainer.classList.add('players-and-input-show');
  PlayerNameContainer.classList.add('players-and-input-hide');
  gameVsContainer.classList.add('players-and-input-hide');
  gameVsContainer.classList.remove('players-and-input-show');
  document.querySelector('.form-valid').classList.add('players-and-input-hide');
});

introBtn.addEventListener('click', function () {
  gameMessage.classList.add('players-and-input-hide');
  PlayerNameContainer.classList.add('players-and-input-show');
  player2colum.classList.add('players-and-input-hide');
  proccedBtn.addEventListener('click', function () {
    playerInputValue01 = playerInputValue01.value;

    if (!playerInputValue01) {
      player1colum.classList.add('players-and-input-hide');
      player2colum.classList.add('players-and-input-hide');
      document
        .querySelector('.form-valid')
        .classList.add('players-and-input-show');
    } else {
      player1colum.classList.add('players-and-input-hide');
      player2colum.classList.add('players-and-input-show');
    }
  });

  playGameBtn.addEventListener('click', function () {
    playerInputValue02 = playerInputValue02.value;
    console.log(playerInputValue01, playerInputValue02);
    if (!playerInputValue02) {
      player2colum.classList.add('players-and-input-hide');
      player2colum.classList.remove('players-and-input-show');
      document
        .querySelector('.form-valid')
        .classList.add('players-and-input-show');
    } else {
      introContainer.classList.remove('players-and-input-show');
      introContainer.classList.add('players-and-input-hide');
      gameVsContainer.classList.remove('players-and-input-hide');
      playerName1.textContent = playerInputValue01;
      playerName2.textContent = playerInputValue02;
      document.querySelector('#name--0').textContent = playerInputValue01;
      document.querySelector('#name--1').textContent = playerInputValue02;
      setTimeout(function () {
        gameVsContainer.classList.add('players-and-input-hide');
      }, 3000);
    }
  });
});

//OLD CODE STATED HER
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore00.textContent = 0;
  currentScore01.textContent = 0;
  player00.classList.remove('player--winner');
  player01.classList.remove('player--winner');
  player00.classList.add('player--active');
  player01.classList.remove('player--active');
  document.querySelector('.numer-Of-won-1').textContent = totalWon_1;
  document.querySelector('.numer-Of-won-2').textContent = totalWon_2;
  rollDiceButton.disabled = false;
  document.querySelector('.emoji').src = 'loser.gif';
  document.querySelector('.emoji').style.display = 'none';
  emoji2.src = 'loser.gif';
  emoji2.style.display = 'none';
  progressWidth = 0;
  document.querySelector('.pr-bar-0').style.width = '15px';
  document.querySelector('.pr-bar-1').style.width = '15px';
  clearInterval(autoClick);
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player00.classList.toggle('player--active');
  player01.classList.toggle('player--active');
};
//==============USER FUNCTION==============>
function user() {
  rollDiceButton.addEventListener('click', function () {
    if (playing) {
      let randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
      diceElement.style.display = 'block';
      diceElement.style.animation = 'spin .8s ease-in-out';
      diceElement.src = `dice-${randomDiceNumber}.png`;
      diceSound.play();
      setTimeout(function () {
        diceElement.style.animation = 'none';
      }, 1000);

      if (randomDiceNumber !== 1) {
        currentScore += randomDiceNumber;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchGameSound.play();
        switchPlayer();
        computer();
      }
    }
  });
}
//===================END=======================>

//====================COMPUTER==================>
function computer() {
  if (activePlayer === 1) {
    let botTotalscores = scores[1] + currentScore;
    /////// AUTOMATION CONDITION////
    autoClick = setInterval(function () {
      rollDiceButton.click();
      botTotalscores = scores[1] + currentScore;

      if (
        randomDiceNumber === 6 &&
        botTotalscores >= 20 &&
        botTotalscores <= 35
      ) {
        holdButton.click();
      } else if (
        randomDiceNumber === 5 &&
        botTotalscores >= 18 &&
        botTotalscores <= 25
      ) {
        holdButton.click();
      } else if (
        randomDiceNumber === 4 &&
        botTotalscores >= 5 &&
        botTotalscores <= 10
      ) {
        holdButton.click();
      } else if (
        randomDiceNumber === 3 &&
        botTotalscores >= 20 &&
        botTotalscores <= 30
      ) {
        holdButton.click();
      } else if (
        randomDiceNumber === 6 &&
        botTotalscores >= 40 &&
        botTotalscores <= 70
      ) {
        holdButton.click();
      }
     
      else if (botTotalscores >= 40 && botTotalscores <= 43) {
         holdButton.click();
      }
      
      else if (
        randomDiceNumber === 5 &&
        botTotalscores >= 60 &&
        botTotalscores <= 80
      ) {
        holdButton.click();
      } else if (botTotalscores >= 100) {
        holdButton.click();
      }
      
      else if ( botTotalscores >= 10 && botTotalscores <= 12) {
        holdButton.click()
      }
      
      else if ((botTotalscores >= 50) & (botTotalscores <= 56)) {
        holdButton.click();
      }
      else if ((botTotalscores >= 70) & (botTotalscores <= 73)) {
        holdButton.click();
      }
        
      // else if (botTotalscores >= 10 && botTotalscores <= 11) {
      //   holdButton.click();
      // }

    }, 1200);

    //================>
  } else {
    clearInterval(autoClick);
  }
}

//====================END==================>

//================GAME=================>

function game() {
  if (activePlayer === 1) {
    computer();
  } else {
    user();
    console.log('user turn');
  }
}

game();

//================END=================>

holdButton.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    holdSound.play();
    // progress Bar Logic
    progressWidth = (100 * scores[activePlayer]) / 100;
    progressWidth =
      activePlayer === 0 && scores[activePlayer] >= 100 ? 100 : progressWidth;
    progressWidth =
      activePlayer === 1 && scores[activePlayer] >= 100 ? 100 : progressWidth;
    document.querySelector(`.pr-bar-${activePlayer}`).style.width =
      progressWidth + '%';

    if (scores[activePlayer] >= 100) {
      clearInterval(autoClick);
      playing = false;
      wonSound.play();
      diceElement.style.display = 'none';
      document.querySelector('.emoji').style.display = 'block';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      if (activePlayer === 0) {
        totalWon_1++;
        document.querySelector('.numer-Of-won-1').textContent = totalWon_1;
        emoji1.src = 'winenr.gif';
        emoji2.style.display = 'block';
      } else if (activePlayer === 1) {
        totalWon_2++;
        document.querySelector('.numer-Of-won-2').textContent = totalWon_2;
        emoji2.src = 'winenr.gif';
        emoji2.style.display = 'block';
      }
    } else {
      if (activePlayer === 0) {
        switchPlayer();
        computer();
      } else {
        switchPlayer();
        clearInterval(autoClick);
        console.log('Player 2 click HOLD');
      }
    }
  }
});

resetGameButton.addEventListener('click', function () {
  init();
  newGameSound.play();
});
