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

