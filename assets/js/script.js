// Wait for the DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', function() {
    
    let startTimer = document.getElementById('start-bomb-timer');
    startTimer.addEventListener('click', startCountdown);
})

/**
 * When the start button is selected
 * the 30 second countdown timer begins
 */
function startCountdown() {
    
    let time = 30;
    let interval = setInterval(countingDown, 1000);

    startMath();

    function countingDown() {
        time--;
        if (time >= 10) {
            document.getElementById('counter').innerHTML = `00:${time}`;
        } else if (time >= 1) {
            document.getElementById('counter').innerHTML = `00:0${time}`;
        } else {
            clearInterval(interval);
            document.getElementById('counter').innerHTML = `00:00`;
        } 
    }
}

/**
 * When the timer starts
 * the math question appears
 * in place of the introduction
 */
function startMath() {
    document.getElementById('math-bomb-intro').innerHTML = `
        <h2>Create the calculation...</h2>
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
            <div id="answer-box"></div>
        </div>
    `;
    
    let calculatedAnswer = finalCalculation();
}

/**
 * Function that calculates the number to be formulated
 * as part of the maths bomb game
 */
function finalCalculation() {
    let randomNumbers = randomNumberGenerator();
    let randomIndex = randomIndexGenerator();

    let calculatedValue = randomNumbers[(randomIndex[0])] + randomNumbers[(randomIndex[1])] + randomNumbers[(randomIndex[2])] * randomNumbers[(randomIndex[3])];

    document.getElementById('answer-box').innerHTML = calculatedValue;

    console.log(randomNumbers);
    console.log(randomIndex);
    console.log(calculatedValue);
}

/**
 * 
 * Create a list of random numbers
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
 * Create an index list and sort index elements randomly
 * drop the last two elements in the randomly sorted list
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
