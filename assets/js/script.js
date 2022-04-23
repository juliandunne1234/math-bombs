// Wait for the DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', function() {
    
    let startTimer = document.getElementById('start-bomb-timer');
    startTimer.addEventListener('click', startCountdown);
});

/**
 * Global variables used as part of the project
 */
let time = 59;
let interval;
let mathCount = 0;
let currentProgress = 1;

let resetButton = document.getElementById('reset-timer');
    resetButton.addEventListener('click',() => {window.location.reload()})

let helpButton = document.getElementById('game-help');
    helpButton.addEventListener('click', gameInstruction);

/**
 * When the start button is selected
 * the countdown timer begins
 */
 function startCountdown() {
    interval = setInterval(countingDown, 1000);
    countingDown();
    startMath();
    finalCalculation();
    
    let submitButton = document.getElementById('submit-calc');
    submitButton.addEventListener('click', submitFinalCalc);

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitFinalCalc();
        }
    })

    resetButton.addEventListener('click',() => {window.location.reload()});
}

/**
 * Countdown digital timer display
 */
function countingDown() {
    time--;
    if (time >= 10) {
        document.getElementById('counter').innerHTML = `00:${time}`;
    } else if (time >= 1) {
        document.getElementById('counter').innerHTML = `00:0${time}`;
    } else {
        clearInterval(interval);
        bombExplodes();
        setTimeout(() => {window.location.reload()}, 10500)
    } 
}

/**
 * When the timer starts
 * the math question appears
 * in place of the introduction
 */
function startMath() {
    document.getElementById('math-bomb-intro').innerHTML = `
        <h2>Create the calculation...Each element value can only be used once</h2>
        <div id="math-calc-answer">
            <div id="calculated-number"></div>
        </div>
        <div class="math-calc-values">
            <div id="box1" class="empty"></div>
            <div id="box2" class="empty"></div>
            <div id="box3" class="empty "></div>
            <div id="box4" class="empty"></div>
            <div id="box5" class="empty"></div>
            <div id="box6" class="empty"></div>
            <div id="box7" class="empty"></div>
        </div>
        <div id="math-calc-answer">
            <div id="equal-sign">=</div>
            <input type="text" id="answer-box">
        </div>
    `;

    document.getElementById('answer-box').focus();

    document.getElementById('start-box').innerHTML = `
        <button id="submit-calc">SUBMIT</button>
    `;
    
}

/**
 * Function that calculates the answer
 * as part of the maths bomb game
 */
function finalCalculation() {
    let randomNumbers = randomNumberGenerator();
    let randomIndex = randomIndexGenerator();

    let calculatedValue = randomNumbers[(randomIndex[0])] + randomNumbers[(randomIndex[1])] + randomNumbers[(randomIndex[2])] * randomNumbers[(randomIndex[3])];

    document.getElementById('calculated-number').innerHTML = calculatedValue;
    return calculatedValue;
}

/**
 * Generate random numbers
 * the first number is in range 1 - 100
 * remaining numbers are in range 1 - 10
 */
function randomNumberGenerator() {
    let randomNumbers = [];
    for (let i = 0;  i < 7; i++) {
        if (i === 0) {
            let randomNumber = Math.floor(Math.random() * 100) + 1;
            document.getElementsByClassName('empty')[i].innerHTML = randomNumber;
            randomNumbers.push(randomNumber);  
        } else {
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            document.getElementsByClassName('empty')[i].innerHTML = randomNumber;
            randomNumbers.push(randomNumber); 
        } 
    }
    return randomNumbers;
}

/**
 * Functions to randomly sort array of index elements 
 * drop last two elements in the randomly sorted array 
 */
function randomIndexGenerator() {
    let randomSortedIndex = randomSortIndex();
    return randomSortedIndex.splice(0, 5);
}

function randomSortIndex() {
    let indexToSort = [0, 1, 2, 3, 4, 5, 6];
    for (let i = 0; i < indexToSort.length; i++) {
        let j = Math.floor(Math.random() * i);
        let k = indexToSort[i];
        indexToSort[i] = indexToSort[j];
        indexToSort[j] = k;
    }
    let randomSortedIndex = indexToSort;
    return randomSortedIndex;
}

/**
 * Functions that calculate the equation 
 * entered in the answer-box and submitted 
 * via the submit button
 */
function submitFinalCalc() {
    let submitFinalValue = eval(document.getElementById('answer-box').value);
    calculatedValues();
    
    let calculatedNumber = parseInt(document.getElementById('calculated-number').innerHTML);
    if (submitFinalValue === calculatedNumber) {
        mathCount++;
        currentProgress++;
        updateProgressBar();
        if (mathCount < 3) {
            startMath();
            finalCalculation();
            document.getElementById('answer-box').innerHTML = "";
            let submitButton = document.getElementById('submit-calc');
            submitButton.addEventListener('click', submitFinalCalc);
            
            document.getElementById("answer-box").addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    submitFinalCalc();
                }
            })

        } else {
            clearInterval(interval);
            gameComplete();
        }
        
    } else {
        
        clearInterval(interval);
        bombExplodes();
        setTimeout(() => {window.location.reload()}, 10500);
    }
}

function calculatedValues() {
    let calcElements = document.getElementById('answer-box').value;
    let numStrArray = calcElements.replace(/[^0-9]/g, ", ").split(',');
    let numIntArray = strToInt(numStrArray);
    let randomIntArray = emptyClass();
    arrayComparison(numIntArray, randomIntArray);
}

/** 
* Function to convert array of strings to array of numbers 
*/
function strToInt(numStrArray) {
    let numIntArray = [];
    for (let i = 0; i < numStrArray.length; i++) {
                       
        if (parseInt(numStrArray[i])) {
            numIntArray.push(parseInt(numStrArray[i]));
        }
    } 
    return numIntArray;
}

/**
 * Function that create list of integers
 * from empty class html values
 */
function emptyClass() {

    let emptyValues = [];
    let emptyItems = document.getElementsByClassName('empty');
    
    for (let i = 0; i < emptyItems.length; i++) {
        emptyValues.push(parseInt(emptyItems[i].innerHTML));
    }
    return emptyValues;
}

function arrayComparison(numIntArray, randomIntArray) {
    
    for(let i = 0; i < randomIntArray.length; i++){
        let val = randomIntArray[i];
        let foundIndex = numIntArray.indexOf(val);
        if(foundIndex != -1){
            numIntArray.splice(foundIndex, 1);
        }
    }
    if (numIntArray.length > 0) {
        clearInterval(interval);
        bombExplodes();
        setTimeout(() => {window.location.reload()}, 10500)
    }
}

/**
 * Progress bar to show current progress
 */
function updateProgressBar() {
    let progressSquares = document.querySelectorAll('.square');
    progressSquares.forEach((square, idx) => {
        if (idx < currentProgress) {
            square.classList.add('active');
        }
    });
}

/**
 * Help button to explain
 * the rules of the game
 */
function gameInstruction() {
    Swal.fire({
        html: `
            <div id="pop-up-help">
                Create the calculation. Only use an element once. Different elements can contain the same number and can be used accordingly.
            </div>
        `});
}

/**
 * User has run out of time
 * without finishing the game
 */
 function bombExplodes() {
    Swal.fire({
        timer: 10500,
        html: `
            <div id="pop-up-bomb">
                Quick....get out of here!
                <video src="assets/videos/bomb-detonates.mp4" controls="" autoplay id="video-game-over">
                    <h2>GAME....OVER</h2>
                </video>
            </div>
    `});
 }

/**
 * User has finished the game
 * before the time elapses
 */
function gameComplete() {
    document.getElementById('math-bomb-intro').innerHTML = `
        <h2 id="game-over-message">You have finished the game...You must be some kind of Math genius!!!</h2>
    `;
}