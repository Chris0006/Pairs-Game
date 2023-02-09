'use strict';

let flips = 0;
let level = 1;
let rightGuesses = 0;
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; // pairs
let guesses = [];

// mess the numbers
function messTheNumbers(numArray){
    for (let i=0; i<numArray.length; i++){
        let randomIndex = Math.floor(Math.random()*numArray.length);
        let number = numArray.splice(0, 1);
        numArray.splice(randomIndex, 0, ...number);
    }
}



function startGame(){
    // messing the numbers
    messTheNumbers(numbers);

    // assign value to every button
    setTimeout(()=>{
    document.querySelectorAll('button').forEach(function(elmt, ind){
        elmt.dataset.value = numbers[ind];
        elmt.textContent = numbers[ind];
    })
},1000)

    // hide the values of every button
    setTimeout(()=>{
        document.querySelectorAll('button').forEach(function(btn){
            btn.textContent = "";
        })
    }, 3000)
}
startGame();

function checkPair(){
    if (guesses[0].textContent == guesses[1].textContent){
        rightGuesses++;
        if (rightGuesses==8){ // 8 pairs
            rightGuesses = 0;
            level++;
            document.querySelector('.level').textContent = level;

            // // clear previous level
            document.querySelectorAll('button').forEach(function(btn){
                btn.textContent = "";
            })
            
            startGame();
        }
    } else {
        guesses.forEach(function(elmt){
            setTimeout(()=>{
                elmt.textContent = ""
            }, 250)
        });
    }
    flips++;
    document.querySelector('.flips').textContent = flips;
    guesses = []; // reset
}

document.querySelectorAll('button').forEach(function(elmt){
    elmt.addEventListener('click', function(){

        elmt.textContent = elmt.dataset.value;
        guesses.push(elmt)

        if (guesses.length==2){
            checkPair();
        }
    })

})


