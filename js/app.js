/*
 * Create a list that holds all of your cards
 */
const icons = [
"fa fa-diamond",
"fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-bolt",
"fa fa-cube",
"fa fa-cube",
"fa fa-leaf",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bicycle",
"fa fa-bomb",
"fa fa-bomb",
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 let container = document.querySelector('.deck');

 let openCards = [];
 let matchedCards = [];


 function init() {
   for (let i = 0; i < icons.length; i++) {
     const card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `<i class="${icons[i]}"></i>`;
     container.appendChild(card);

    click(card);
   }
 }

 function click(card) {
   // click event
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function compare(currentCard, previousCard) {
   if (currentCard.innerHTML === previousCard .innerHTML) {
     currentCard.classList.add('match');
     previousCard.classList.add('match');
     matchedCards.push(currentCard, previousCard);
     openCards = [];
     gameOver();
   } else {
     setTimeout(function() {
       currentCard.classList.remove('open', 'show', 'disable');
       previousCard.classList.remove('open', 'show', 'disable');
       openCards = [];
     }, 500);
   }

   addMove();
 }

 const stars = document.querySelector('.stars');

 function rate() {
   if (moves > 10 && moves < 16) {
     stars.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
   } else if (moves >= 16) {
     stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
   } else {
     stars.innerHTML = `	<li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>`;
   }
 }

 function gameOver() {
   if (matchedCards.length === icons.length) {
     setTimeout(function () {
       alert('Game Over');
       container.innerHTML = '';
       init();
     }, 500);
   }
 }

const movesCon = document.querySelector('.moves');
let moves = 0;
movesCon.innerHTML = 0;
 function addMove() {
   moves++;
   movesCon.innerHTML = moves;

   rate();
 }

 const restartBtn = document.querySelector('.restart');
 restartBtn.addEventListener('click', function() {
   // clear all cards
   container.innerHTML = '';

   // create new cards
   init();

   // reset other variables
   matchedCards = [];
   moves = 0;
   movesCon.innerHTML = moves;
   stars.innerHTML = 	`<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
 })

init();
