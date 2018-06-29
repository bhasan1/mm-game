/*
 * Create a list that holds all of your cards
 */

const myCards =["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-cube",
"fa fa-anchor",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-diamond",
"fa fa-bomb",
"fa fa-leaf",
"fa fa-bomb",
"fa fa-bolt",
"fa fa-bicycle",
"fa fa-paper-plane-o",
"fa fa-cube"];
// referance the main div that holds all the cards(parent element).
const cardsBox = document.querySelector(".deck");
let opendCards = [];
let matchedCards = [];
let minutes =0;
let seconds = 0;
let timer= null;
const TimeContainer = document.querySelector(".timer");
let rate;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/// tha main function(start()).
function start(){
//shuffle(myCards); 
// generate the cards in index.hrml page.

for (let i = 0; i < myCards.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${myCards[i]}"></i>`;
    cardsBox.appendChild(card);
// invoke click function 
 click(card);
}
}

  /////// function click //////
  function click(card){
 //loop through every card and add event listener to each.
  card.addEventListener ("click", function(){
    
    const currentCard = this;
    const previousCard = opendCards[0];

    // first if
     if (opendCards.length === 1){
        card.classList.add("open", "show", "disable");
        opendCards.push(this);
        // second if(if 2 card are matched!)
        if(currentCard.innerHTML === previousCard.innerHTML){
           currentCard.classList.add("match");
           previousCard.classList.add("match");
           matchedCards.push(previousCard,currentCard);
           opendCards = [];
           endTheGame();
                          
        // end second if(2 cards do not matched will removie the icon!)
        } else {
            // delay the action so we get to see the second card when clicked before delete it!
                setTimeout(function(){
                currentCard.classList.remove("open", "show","disable");
                previousCard.classList.remove("open", "show","disable");
                opendCards = [];
            },500);
        }
        
        addMoves();
         //this will fix the interval bug getting faster
        if (timer == null) {
            TimeContainer.innerHTML = "00:00"
            startTimer();
        }
    // end first if(2 cards do not have these classes it means they have not been clicked before.)
    }else {
        card.classList.add("open", "show", "disable");
        opendCards.push(this);
    }
}); 
}

// function to check if all cards have been flipped and the game finished.
function endTheGame (){
    if(matchedCards.length === myCards.length){
        //stop the timer
        stopTimer();
       swal({
        title: "Congrats!!",
        text: "You won with.... " + `${rate} star . ` +  " Your moves are " + moveContainer.innerHTML 
        +"."+" Your Time is "+TimeContainer.innerHTML +".",
        icon: "success",
      });
      //clear stars here
      starsBox.innerHTML="";
    }
   }
//// call the main function (start(); to start the game!)
start();
  /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//// reset the game after finish!
const setGame = document.querySelector(".restart");
setGame.addEventListener("click", function(){
     //1-clear timer here
     stopTimer();
     TimeContainer.innerHTML="";
    //2-delete all cards
    cardsBox.innerHTML = "";
    //3-clear timer here
    cardsBox.innerHTML = "";
    timer = null;
    seconds = 0;
    minutes = 0;
    //4-call start() to start the game again.
    start();
    //5-reset any array.
  
    matchedCards = [];
    moves = 0;
    moveContainer.innerHTML = moves;
    starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    
});

// calculate the moves
const moveContainer = document.querySelector(".moves");
let moves = 0;
moveContainer.innerHTML = 0;
 function addMoves(){
     moves++;
     moveContainer.innerHTML = moves;
     rating();
 }

 /*let starsBox = document.querySelector(".stars");
 starsBox.innerHTML ="";
 rate=function rating(){
    if (moves <= 10){
        starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }else if (moves >10 && moves <= 18){
        starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
}else if (moves >18 ){
        starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    }
} ;
*/



/// stars function
let starsBox = document.querySelector(".stars");
starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;
function rating(){
    if (moves <= 10){
        starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        rate=3;
    }else if (moves >10 && moves <= 18){
        starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        rate=2;
}else if (moves >18 ){
        starsBox.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        rate=1;
    }
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


function startTimer() {
     //you need to fix your interval counting
        //you need to check if seconds is already 60 not 0
    timer = setInterval(function(){
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds=0;
        }
        let ttt= formatTimer();
        TimeContainer.innerHTML=ttt;
    }, 1000);
}

function stopTimer(){
    clearInterval(timer);
}

function formatTimer(){
    let sec = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
    let min = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
    return min + ':' + sec;
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
