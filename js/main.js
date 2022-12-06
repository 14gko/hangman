 /*----- constants -----*/

 //array containing 10 words
 
const words = ['APHAGIA', 'GRUMMET', 'VITALS', 'SUBLIME', 'ECONOMIC', 'AVALANCHE', 'NOVEL', 'NOTORIOUS', 'QUINTESSENTIAL', 'ANOMALOUS'];
 

  /*----- state variables -----*/

let currWord = '';
let currGuess, letters, dashArr, lives;

  /*----- cached elements  -----*/

const mainCont = document.querySelector('.main-container');
const guessText = document.querySelector('#guess-text')
const wrgLetters = document.querySelector('.wrong-letters');
const chosenWord = document.querySelector('.chosen-word');
const letterInput = document.querySelector('input');
const guessCont = document.querySelector('.guess-container');
const guessBtn = document.querySelector('#guess-btn');
const ngCont = document.querySelector('.new-game-container')
const newGameBtn = document.querySelector('.new-game-button');
const hideCont = document.querySelector('.hide-cont');
const canvas = document.querySelector('#canvas');
const gameText = document.querySelector('#game-text');
const wrgText = document.querySelector('#guessed-text');
const friends = document.querySelector('.friends');
  
  /*----- event listeners -----*/

newGameBtn.addEventListener('click', function(){
    ngCont.classList.toggle('hide');
    mainCont.classList.toggle('hide');
    guessCont.classList.toggle('hide');
    initialize();
})
  guessBtn.addEventListener('click', function(){
    checkLetter();
    checkWin();

    letterInput.value = '';
})

  /*----- functions -----*/

function isLetter(char){
    return char.toUpperCase() !== char.toLowerCase();
}

function checkWin(){
    console.log(lives);
    if (lives > 0 && chosenWord.innerHTML.indexOf('_') < 0){
        gameText.innerHTML = `YOU WIN! You kept ${lives} of your friends!! The word was <span>${currWord}</span>`;
        resultText();
    }
    else if(lives === 0){
        gameText.innerHTML = `All your "friends" left you.. The word was <span>${currWord}</span>`;
        resultText();
    }
}

function resultText(){
    ngCont.classList.toggle('hide');
    mainCont.classList.toggle('hide');
    guessCont.classList.toggle('hide');
}

function checkLetter(){
    let letterCount = 0;
    currGuess = letterInput.value;
    letters = currWord.split('');
    dashArr = chosenWord.innerText.split('');
    letters.forEach(function(letter, idx){
        if (isLetter(currGuess) && currGuess.length === 1){
            if (currGuess.toUpperCase() === letter){
                letterCount += 1;
                dashArr[idx] = letter;
                chosenWord.innerHTML = dashArr.join('');
            }
            else if(currGuess.toUpperCase() !== letter){
                //if the array doesnt contain the guessed letter throughout the whole array
                if (idx === (letters.length - 1) && letterCount === 0){
                    //if the letter doesnt exist in the wrongly guessed letters then add it to innertext
                    if (wrgLetters.innerHTML.indexOf(currGuess.toUpperCase()) < 0){
                        guessText.textContent = 'Wrong!';
                        setTimeout(function(){ guessText.textContent = "Guess a Letter" }, 1000);
                        loseLife();
                        wrgLetters.innerHTML += currGuess.toUpperCase();
                    }
                    else{
                        guessText.textContent = `Already guessed '${currGuess.toUpperCase()}'`
                        setTimeout(function(){ guessText.textContent = "Guess a Letter" }, 1000);
                    }
                }
            }
        }
        else{
            guessText.textContent = 'Invalid Input'
            setTimeout(function(){ guessText.textContent = "Guess a Letter"}, 1000);

        }
    })
}

//when you lose a life one of the friends disappears
function loseLife(){
    const currFriend = document.querySelector('#f' + lives);
    currFriend.classList.add('hide');
    lives -= 1;
}

function initFriends(){
    for (let i = 1; i < 7; i++){
        const currFriend = document.querySelector('#f' + i);
        currFriend.classList.remove('hide');
    }
}

function initialize(){
    lives = 6;
    initFriends();
    generateWord();
    wrgLetters.innerHTML = '';
}

function generateWord(){
    currWord = words[Math.floor(Math.random() * words.length)];
    chosenWord.innerHTML = currWord.replace(/./g , '<span class="dashes">_</span>');
}
