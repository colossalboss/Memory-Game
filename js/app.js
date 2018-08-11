/*
* Icons
*/
const icons = [
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-bomb",
];

// container for list items
let container = document.querySelector('.deck');
//Create an array to hold selected cards
let openCards = [];
//Array to hold matched cards
let matchedCards = [];

/*
*Create list of cards
*/
function init() {
  container.innerHTML = '';
  let collection = shuffle(icons);
  for (let i = 0; i < collection.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `<i class="${collection[i]}"></i>`;
    container.appendChild(card);

  click(card);
  }

  timer();

  stars.innerHTML = `	<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    moves = 0;
    movesCon.innerHTML = moves;
}

/*
*Handle Clicks
*/
function click(card) {
  card.addEventListener('click', function() {
    let currentCard = this;
    let previousCard = openCards[0];

    if (openCards.length === 1) {
      card.classList.add('open', 'show', 'disable');
      openCards.push(this);

      compare(currentCard, previousCard);

    } else {
      card.classList.add('open', 'show', 'disable');
      openCards.push(this);
	}

  });
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
*Compare selected cards 
*/
function compare(currentCard, previousCard) {
if (currentCard.innerHTML === previousCard .innerHTML) {
	currentCard.classList.add('match');
	previousCard.classList.add('match');
	matchedCards.push(currentCard, previousCard);
	openCards = [];
	gameOver();
} else {
currentCard.classList.add('red');
previousCard.classList.add('red');
	setTimeout(function() {
	
	currentCard.classList.remove('open', 'show', 'disable');
	previousCard.classList.remove('open', 'show', 'disable');

	currentCard.classList.remove('red');
	previousCard.classList.remove('red');

	openCards = [];
	}, 500);
}

addMove();
}

//Rating stars
const stars = document.querySelector('.stars');

/*
*Rate according to number of moves
*/
function rate() {
if (moves > 10 && moves <= 20) {
	stars.innerHTML = `<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>`;
} else if (moves > 20) {
	stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
} else {
	stars.innerHTML = `	<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>`;
	}
}

 /*
 *When all cards are matched
 */
 function gameOver() {
   if (matchedCards.length === icons.length) {
     //After 500ms
     setTimeout(function () {
      container.innerHTML = '';
      
      container.innerHTML = `
        <div id="over">
          <p>Congrats! You won</p>
          <p>
            Moves ${moves} <br>
            Time ${duration} seconds <br>
            <ul class="rate">${stars.innerHTML}</ul>
          </p>
          <button id="again" onclick="playAgain();">Restart</button>
        </div>
      `;
     }, 500);
     //stop timer
     stop();
   }
 }

//moves container
const movesCon = document.querySelector('.moves');
//time container
const timeCon = document.querySelector('.time');
//moves
let moves = 0;
movesCon.innerHTML = 0;

//Handle moves
 function addMove() {
   moves++;
   movesCon.innerHTML = moves;
  //Calculate stars
   rate();
 }
// Time
 function changeValue() {
  timeCon.innerHTML = ++duration;
}

let timerInterval = null;
function start() {
  // stop();
  duration = 0;
  timerInterval = setInterval(changeValue, 1000);
  container.removeEventListener('click', start);
}
let stop = function() {
  clearInterval(timerInterval);
}

//Starts timer on the first click
function timer() {
  container.addEventListener('click', start);
}

//Select the restart icon
const restartBtn = document.querySelector('.restart');
//Restart Game on clicking the restart icon
restartBtn.addEventListener('click', playAgain);

/*
*Handle Restart
*/
 function playAgain() {
  // clear all cards
  container.innerHTML = '';
  // stop timer
  stop();
  // create new cards
  init();

  // reset other variables
  timeCon.innerHTML = 0;
  matchedCards = [];
  moves = 0;
  movesCon.innerHTML = moves;
  stars.innerHTML = 	`<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
}

//Starting the game for the first time
init();
