//array containing 10 words


const words = ['APHAGIA', 'GRUMMET', 'VITALS', 'SUBLIME', 'ECONOMIC', 'AVALANCHE', 'NOVEL', 'NOTORIOUS', 'QUINTESSENTIAL', 'ANOMALOUS'];
let currWord = '';


const mainCont = document.querySelector('.main-container');
const guessCont = document.querySelector('.guess-container')
const wrgGuess = document.querySelector('.wrong-guesses');
const hiddenWord = document.querySelector('.hidden-word');
const letterInput = document.querySelector('input');
const guessBtn = document.querySelector('#guess-btn');
const hideCont = document.querySelector('.hide-cont');
const canvas = document.querySelector('#canvas');


//seems like these dont work for some reason?
// let wrgText = wrgGuess.innerText;
// let hiddenText = hiddenWord.innerText;

function isLetter(char){
    return char.toUpperCase() !== char.toLowerCase();
}

//make sure to hide this button until new game button is clicked
guessBtn.addEventListener('click', function(){
    let currGuess = letterInput.value;
    let letters = currWord.split('');
    let dashArr = hiddenWord.innerText.split('');
    letters.forEach(function(letter, idx){
        if (isLetter(currGuess)){
            if (currGuess.toUpperCase() === letter){
                dashArr[idx] = letter;
                hiddenWord.innerHTML = dashArr.join('');
            }
            else if(currGuess.toUpperCase() !== letter){
                //this should appear near the input window instead of in the console
                console.log("WRONG!");
                
                //for some reason using touppercase messes up this code so bad? 
                //then put the wrong guess in the wrong guess container
                if (wrgGuess.innerHTML.indexOf(currGuess) < 0){
                    wrgGuess.innerHTML += currGuess;
                }
            }
        }
        else{
            console.log("Invalid input")
        }
    })
    letterInput.value = '';
})

function initialize(){
    let lives = 6;
    //hide guess container until new game pressed
    guessCont.classList.add('hide-cont');

    //find out how to replace text with something else when game is initilalized, over the guess container
    //also when new game is pressed remove hide-cont class

    // function newGame(){
    //     ///add code that renders when new game is pressed
    // }
    
}


function generateWord(){
    currWord = words[Math.floor(Math.random() * words.length)];
    // hiddenText = currWord;
    hiddenWord.innerHTML = currWord.replace(/./g , '<span class="dashes">_</span>');

}


function canvasCreator(){
    const context = canvas.getContext('2d');

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.width = window.innerHeight;
    })


// const canvas = document.getElementById('canvas1');

function drawLine(fromX, fromY, toX, toY){
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
}

function head(){
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
}

function body(){
    drawLine(70, 40, 70, 80);
}

function leftArm(){
    drawLine(70, 50, 50, 70);
}

function rightArm(){
    drawLine(70 ,50 ,90 ,70);  
}

function leftLeg(){
    drawLine(70, 80, 50, 110);
}

function rightLeg(){
    drawLine(70, 80, 90, 110);
}
}

//draw man
function drawMan (){

}

ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 5;
ctx.beginPath();
// x, y, dist of curved line from the starting point, start angle
// (where it will start drawing the circle), the circle?
// (fromx, fromy, tox, toy)
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.stroke();

//dashes- 2608