 /*----- constants -----*/

const words = {
    'APHAGIA': 'difficulty or pain in swallowing',
    'GRUMMET': 'any of various rings or eyelets of metal or the like', 
    'VITALS': 'those bodily organs that are essential to life, as the brain, heart, liver, lungs, and stomach', 
    'SUBLIME': 'supreme or outstanding', 
    'ECONOMIC': 'pertaining to the production, distribution, and use of income, wealth, and commodities', 
    'AVALANCHE': 'a large mass of snow, ice, etc., detached from a mountain slope and sliding or falling suddenly downward', 
    'NOVEL': 'a fictitious prose narrative of considerable length and complexity',
    'NOTORIOUS': 'widely and unfavorably known', 
    'QUINTESSENTIAL': 'of the pure and essential essence of something', 
    'ANOMALOUS': 'deviating from or inconsistent with the common order, form, or rule; irregular; abnormal:'
}

//array containing keys of the object words
const wordsArr = Object.keys(words); 

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
const gameText = document.querySelector('#game-text');
const wrgText = document.querySelector('#guessed-text');
const friends = document.querySelector('.friends');
const hint = document.querySelector('#hint');
const definition = document.querySelector('#definition');
  
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
    frown();

    letterInput.value = '';
})

  /*----- functions -----*/

function initialize(){
    lives = 6;
    definition.innerText = '';
    wrgLetters.innerHTML = '';
    initFriends();
    generateWord();
    displayDefinition();
    frown();
}

function initFriends(){
    for (let i = 1; i < 7; i++){
        const currFriend = document.querySelector('#f' + i);
        currFriend.classList.remove('hide');
    }
}

function generateWord(){
    currWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    chosenWord.innerHTML = currWord.replace(/./g , '<span class="dashes">_</span>');
}

function displayDefinition(){
    definition.innerText += " " + words[currWord];
}

function frown(){
    const mouth = document.querySelector('#mouth');
    if (lives < 4){
        mouth.style.transform = 'rotate(.25turn)';
    }
    else{
        mouth.style.transform = 'rotate(-.25turn)';
    }
}
//check if input matches any letters in the chosen word 
function checkLetter(){
    //
    let letterCount = 0;
    currGuess = letterInput.value;
    letters = currWord.split(''); //splits the current word into array
    dashArr = chosenWord.innerText.split(''); //splits the dashes from html into array
    
    //iterate through letters array
    letters.forEach(function(letter, idx){
        //if input is a letter and a single char
        if (isLetter(currGuess) && currGuess.length === 1){
            //if letter is in chosenword array, then lettercount + 1(checks for dupes) and reveal letters
            if (currGuess.toUpperCase() === letter){
                letterCount += 1;
                dashArr[idx] = letter;
                chosenWord.innerHTML = dashArr.join('');
            }
            //if letter is not in the chosen word
            else if(currGuess.toUpperCase() !== letter){
                //if the array doesnt contain the guessed letter throughout the whole array
                if (idx === (letters.length - 1) && letterCount === 0){
                    //if the letter doesnt already exist in wrong letters then add to wrong letters list and lose a life(friend)
                    if (wrgLetters.innerHTML.indexOf(currGuess.toUpperCase()) < 0){
                        guessText.textContent = 'Wrong!';
                        setTimeout(function(){ guessText.textContent = "Guess a Letter" }, 1000);
                        loseLife();
                        wrgLetters.innerHTML += currGuess.toUpperCase();
                    }
                    // else tell the user it's been already guessed
                    else{
                        guessText.textContent = `Already guessed '${currGuess.toUpperCase()}'`
                        setTimeout(function(){ guessText.textContent = "Guess a Letter" }, 1000);
                    }
                }
            }
        }
        //else say invalid input
        else{
            guessText.textContent = 'Invalid Input'
            setTimeout(function(){ guessText.textContent = "Guess a Letter"}, 1000);

        }
    })
}

//check if input is a single non symbol char
function isLetter(char){
    return char.toUpperCase() !== char.toLowerCase();
}

//when you lose a life one of the friends disappears
function loseLife(){
    const currFriend = document.querySelector('#f' + lives);
    currFriend.classList.add('hide');
    lives -= 1;
}

//detects if you have won or lost
function checkWin(){
    console.log(lives);
    if (lives > 0 && chosenWord.innerHTML.indexOf('_') < 0){
        gameText.innerHTML = `YOU WIN! You kept ${lives} of your friends!! The word was <span>${currWord}</span>`;
        toggleResult();
    }
    else if(lives === 0){
        gameText.innerHTML = `All your "friends" left you.. The word was <span>${currWord}</span>`;
        toggleResult();
    }
}

//show or hide game text
function toggleResult(){
    ngCont.classList.toggle('hide');
    mainCont.classList.toggle('hide');
    guessCont.classList.toggle('hide');
}