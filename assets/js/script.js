// Wait for the DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', function() {
    
    let startTimer = document.getElementById('start-bomb-timer');
    startTimer.addEventListener('click', startCountdown);
})

/**
 * Global time and interval variables
 */
var time = 59;
var interval;
var mathCount = 0;

/**
 * When the start button is selected
 * the 30 second countdown timer begins
 */
 function startCountdown() {
    interval = setInterval(countingDown, 1000);
    countingDown()
    startMath();
    finalCalculation();
    
    let submitButton = document.getElementById('submit-calc');
    submitButton.addEventListener('click', submitFinalCalc);
}

function countingDown() {
    time--;
    if (time >= 10) {
        document.getElementById('counter').innerHTML = `00:${time}`;
    } else if (time >= 1) {
        document.getElementById('counter').innerHTML = `00:0${time}`;
    } else {
        clearInterval(interval);
        bombExplodes();
    } 
}

/**
 * When the timer starts
 * the math question appears
 * in place of the introduction
 */
function startMath() {
    document.getElementById('math-bomb-intro').innerHTML = `
        <h2>Create the calculation...Any number can only be used once</h2>
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

    document.getElementById('start-box').innerHTML = `
        <button id="submit-calc">SUBMIT ANSWER</button>
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
        j = Math.floor(Math.random() * i)
        k = indexToSort[i]
        indexToSort[i] = indexToSort[j]
        indexToSort[j] = k
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
        alert("correct");
        mathCount++;
        if (mathCount < 3) {
            startMath();
            finalCalculation();
            document.getElementById('answer-box').innerHTML = "";
            let submitButton = document.getElementById('submit-calc');
            submitButton.addEventListener('click', submitFinalCalc);
        } else {
            alert("You have defused the bomb!!");
            clearInterval(interval);
            gameComplete();
        }
        
    } else {
        alert("Quick...get out of here!");
        clearInterval(interval);
        bombExplodes();
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
    return emptyValues
}

function arrayComparison(numIntArray, randomIntArray) {
    
    for(let i = 0; i < randomIntArray.length; i++){
        let val = randomIntArray[i]
        let foundIndex = numIntArray.indexOf(val)
        if(foundIndex != -1){
            numIntArray.splice(foundIndex, 1)
        }
    }
    if (numIntArray.length > 0) {
        alert("Elements provided can only be used one...you are unlucky this time");
        clearInterval(interval);
        bombExplodes();
    }
}

/**
 * User has run out of time
 * without finishing the game
 */
function bombExplodes() {
    
    document.getElementById('container').innerHTML = `
        <div id="game-over">
            <video src="assets/videos/bomb-detonates.mp4" controls="" autoplay width="100%" height="100%">
                <h2>GAME....OVER</h2>
            </video>
        </div>
    </div> 
    `;
}

function gameComplete() {
    
    document.getElementById('container').innerHTML = `
        <div id="game-complete">
            <video src="assets/videos/game-complete-placeholder.mp4" controls="" autoplay width="100%" height="100%">
                <h2>GAME....OVER</h2>
            </video>
        </div>
    </div> 
    `;
}