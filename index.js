'use strict';

//selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// //starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// //current score
//required global variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; //index 0 //index 1 
let playing = true;

//functions
const init = () => { //stands for initialisation

    //starting conditions
    
    //current score
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0; //index 0 //index 1 
    playing = true;
    
    //reset scores
    score0El.textContent = 0;
    score1El.textContent = 0;
    
    //reset current score
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    //restore state
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')

    //remove active classses
    //add 0 as active since it is the starting
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')

    //reset the message
    document.querySelector('.message').textContent = " SCORE 30 OR MORE TO WIN ! 🗿";

}

const switchPlayer = () => {
    //make current score 0
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //switch player
    activePlayer = (activePlayer===0)? 1: 0;
    currentScore =0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


///initialize
init();

///Rolling the dice functionality
btnRoll.addEventListener('click', ()=>{

    if(playing){

    
    //1.gen random rolling dice
    const dice = Math.trunc(Math.random()*6)+1

    //2.make dice visible
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`
    console.log(dice)

    //3. if 1 then switch player, else add to score
    if(dice !==1 ){
        //add to curr score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;


        // current0El.textContent = currentScore;

    }else{
        switchPlayer();
    }

} //if playing wala
})


btnHold.addEventListener('click', ()=>{

    if(playing){

    
    //1.add curr score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    ///2.if score>=100 curr player wins
    //finish game
    if(scores[activePlayer]>=30){
        playing = false;

        //hide dice
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

        //remove its active status
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        //display message
        document.querySelector('.message').textContent = `Player ${activePlayer + 1 } wins 🥳`;

    }else{
        //3.switch to next player
        switchPlayer();

    }

    // switchPlayer();

}

})


btnNew.addEventListener('click', ()=>{
    init();
})

