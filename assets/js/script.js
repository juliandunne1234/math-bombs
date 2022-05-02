// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function() {
    
    let startTimer = document.getElementById('start-bomb-timer');
    startTimer.addEventListener('click', startCountdown);
});

// Global variables 
let time = 59;
let interval;
let mathCount = 0;
let currentProgress = 1;

// select the reset button to reload the game
let resetButton = document.getElementById('reset-timer');
    resetButton.addEventListener('click',() => {window.location.reload()})

// select the help button to for the game rules
let helpButton = document.getElementById('game-help');
    helpButton.addEventListener('click', gameInstruction);

// function called to start the game
function startCountdown() {
    interval = setInterval(countingDown, 1000);
    countingDown();
    startMath();
    finalCalculation();
    
    // select the submit button to submit your calculation
    let submitButton = document.getElementById('submit-calc');
    submitButton.addEventListener('click', submitFinalCalc);

    // the calculation can also be submitted by pressing enter
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitFinalCalc();
        }
    })

    resetButton.addEventListener('click',() => {window.location.reload()});
}

// Digital timer displays the time remaining
function countingDown() {
    time--;
    if (time >= 10) {
        document.getElementById('counter').innerHTML = `00:${time}`;
    } else if (time >= 0) {
        document.getElementById('counter').innerHTML = `00:0${time}`;
    } else {
        clearInterval(interval);
        bombExplodes();
        setTimeout(() => {window.location.reload()}, 10500)
    } 
}

// Function that replaces the html introduction with the game layout
function startMath() {
    document.getElementById('math-bomb-intro').innerHTML = `
        <h2>Create the calculation... Each element value can only be used once</h2>
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

    // User can enter the calulcation wihout having to select the answer box
    document.getElementById('answer-box').focus();

    // Submit button replaces the Start button
    document.getElementById('start-box').innerHTML = `
        <button id="submit-calc">SUBMIT</button>
    `;
    
}

/**
 * Function that calculates the computer 
 * generated number required to play the game
 */
function finalCalculation() {
    let randomNumbers = randomNumberGenerator();
    let randomIndex = randomIndexGenerator();

    let calculatedValue = randomNumbers[(randomIndex[0])] + randomNumbers[(randomIndex[1])] + randomNumbers[(randomIndex[2])] * randomNumbers[(randomIndex[3])];

    document.getElementById('calculated-number').innerHTML = calculatedValue;
    return calculatedValue;
}

/**
 * Function that generates random array of numbers
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
 * Function that returns randomly sorted array
 * without the last 2 random elements in the
 * array removed
 */
function randomIndexGenerator() {
    let randomSortedIndex = randomSortIndex();
    return randomSortedIndex.splice(0, 5);
}

/**
 * Function to randomly sort array of elements
 * of values 0 - 6 dropping the last two elements 
 * in the randomly sorted array 
 */
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
 * Function that calculates the equation 
 * entered in the answer-box by the player
 */
function submitFinalCalc() {
    // let submitFinalValue = eval(document.getElementById('answer-box').value);
    let submitFinalValue = submittedValue();

    calculatedValues();
    
    // The value generated by the game
    let calculatedNumber = parseInt(document.getElementById('calculated-number').innerHTML);
    
    // if the calculation equals to the computer generated value then proceed
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
    // else the value entered is incorrect and the game ends  
    } else {
        clearInterval(interval);
        bombExplodes();
        setTimeout(() => {window.location.reload()}, 10500);
    }
}

// Function to evaluate the equation entered by the player
function submittedValue() {
    let submitVal = eval(document.getElementById('answer-box').value);
    return submitVal;
}

// Function to calculate the equation entered by the user  
function calculatedValues() {
    let calcElements = document.getElementById('answer-box').value;
    let numStrArray = calcElements.replace(/[^0-9]/g, ", ").split(',');
    let numIntArray = strToInt(numStrArray);
    let randomIntArray = emptyClass();
    return arrayComparison(numIntArray, randomIntArray);
}

// Function to convert calculation inputted as a string to array of integers 
function strToInt(numStrArray) {
    let numIntArray = [];
    for (let i = 0; i < numStrArray.length; i++) {
                       
        if (parseInt(numStrArray[i])) {
            numIntArray.push(parseInt(numStrArray[i]));
        }
    } 
    return numIntArray;
}

// Function to create array of integers provided by the game
function emptyClass() {

    let emptyValues = [];
    let emptyItems = document.getElementsByClassName('empty');
    
    for (let i = 0; i < emptyItems.length; i++) {
        emptyValues.push(parseInt(emptyItems[i].innerHTML));
    }
    return emptyValues;
}

/**
 * Function that compares both arrays of integers
 * Array of integers input by user
 * Array of integers provided by the game
 */
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

// Progress bar to show current progress
function updateProgressBar() {
    let progressSquares = document.querySelectorAll('.square');
    progressSquares.forEach((square, idx) => {
        if (idx < currentProgress) {
            square.classList.add('active');
        }
    });
}

// Function to explain the rules of the game when Help is selected
function gameInstruction() {
    Swal.fire({
        html: `
            <div id="pop-up-help">
                <p>
                    Use the element values provided once. The same number can appear more than once in a different box and can be used if required.
                </p>
            </div>
        `});
}

// User has run out of time without finishing the game
function bombExplodes() {
    Swal.fire({
        timer: 10500,
        html: `
            <div id="pop-up-bomb">
                <p>
                    Quick....get out of here!
                    <video src="assets/videos/bomb-detonates.mp4" controls="" autoplay id="video-game-over">
                    </video>
                </p>
            </div>
    `});
}

// Function to show user has completed the game
function gameComplete() {
    document.getElementById('math-bomb-intro').innerHTML = `
        <h2 id="game-over-message">You have finished the game...You must be some kind of Math genius!!!</h2>
    `;
}