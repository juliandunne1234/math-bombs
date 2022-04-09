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
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
        </div>
        <div class="math-calc-values">
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
        </div>
        <div id="math-calc-answer">
            <div id="equal-sign">=</div>
            <div id="answer-box"></div>
        </div>
    `;

}

