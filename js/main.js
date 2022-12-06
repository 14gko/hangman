 /*----- constants -----*/

// connect loselife to wrong guesses maybe make a new variable to count losses not including dupes of a letter
//figure out how to hide and unhide stuff so the game flows better
//fix the wrong! thing? like ??
//why jquery doesnt seem to work?

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

  //seems like these dont work for some reason?
  // let wrgText = wrgGuess.innerText;
  // let hiddenText = hiddenWord.innerText;
  
  /*----- event listeners -----*/

newGameBtn.addEventListener('click', function(){
    ngCont.classList.toggle('hide');
    mainCont.classList.toggle('hide');
    guessCont.classList.toggle('hide');
    initialize();
})
  
  //make sure to hide this button until new game button is clicked
guessBtn.addEventListener('click', function(){
    //put functions in here
    checkLetter();
    checkWin();

    letterInput.value = '';
    //i have to incorporate lives and figure out why letterinput.value = '' isnt working
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
                //this should appear near the input window instead of in the console
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
                
                //for some reason using touppercase messes up this code so bad? 
                //then put the wrong guess in the wrong guess container
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
    //hide guess container until new game pressed
    // guessCont.classList.add('hide');
    //make new game button

    //find out how to replace text with something else when game is initilalized, over the guess container
    //also when new game is pressed remove hide-cont class

    // function newGame(){
    //     ///add code that renders when new game is pressed
    // }
    
}

function generateWord(){
    currWord = words[Math.floor(Math.random() * words.length)];
    // hiddenText = currWord;
    chosenWord.innerHTML = currWord.replace(/./g , '<span class="dashes">_</span>');

}

// generateWord();

// --------------------------------------------------------------

// function canvasCreator(){
//     const context = canvas.getContext('2d');

//     window.addEventListener('resize', function(){
//         canvas.width = window.innerWidth;
//         canvas.width = window.innerHeight;
//     })

// // const canvas = document.getElementById('canvas1');

// function drawLine(fromX, fromY, toX, toY){
//     context.moveTo(fromX, fromY);
//     context.lineTo(toX, toY);
//     context.stroke();
// }

// function head(){
//     context.beginPath();
//     context.arc(70, 30, 10, 0, Math.PI * 2, true);
//     context.stroke();
// }

// function body(){
//     drawLine(70, 40, 70, 80);
// }

// function leftArm(){
//     drawLine(70, 50, 50, 70);
// }

// function rightArm(){
//     drawLine(70 ,50 ,90 ,70);  
// }

// function leftLeg(){
//     drawLine(70, 80, 50, 110);
// }

// function rightLeg(){
//     drawLine(70, 80, 90, 110);
// }
// }

// //draw man
// function drawMan (){

// }

// ctx.fillStyle = 'white';
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 5;
// ctx.beginPath();
// // x, y, dist of curved line from the starting point, start angle
// // (where it will start drawing the circle), the circle?
// // (fromx, fromy, tox, toy)
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.stroke();

// //dashes- 2608