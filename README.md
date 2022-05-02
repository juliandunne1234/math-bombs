<h1 align="center">Maths Bomb</h1>
<p>A game where the player has to answer three maths question correctly before the countdown timer elapses and the maths bomb explodes. Created as part of the Code Institue Portfolio 2: Javascript Essentials Milestone Project 

Live link - [Maths Bomb](https://juliandunne1234.github.io/math-bombs/)
</p>

***

<p align="center">

![Responsive images of website](assets/images/game-overall-responsive.jpg)
</p>

***

## Introduction
<p>Nowadays people don't have to rely on their own ability to perform calculations that are not always necessarily difficult. Instead prefererring to use a phone or even a watch to calculate the cost of the electricity and gas bill combined.</p>

<p>The computer obviously gives the correct answer however people are not relying on their own ability to perform calculations. Over time this ability is reduced.</p>

<p>The brain is similiar to any other muscle in the body and if parts of it are not used, over time capacity is reduced. Playing games such as this for a few minutes each day is a way to maintain and train your brain.</p>

***

## Table of Contents
* [Features](#Features)
* [Testing](#Testing)
* [Validator Testing](#validator-testing)
* [Technologies](#Technologies)
* [Deployment](#Deployment)
* [Issues List](#Issues-List)
* [Credits](#Credits)
***

## Features

### Landing Page
* The landing page gives the gamer an introduction on the rules of the game written in a chalk-style type font on a blackboard to give a education type setting.
* There is also a countdown timer and progress bar displayed.
* Smaller screen sizes displayed in column type layout.

<p align="center">

![Landing page](assets/images/game-responsive.jpg)

</p>

***

### Game Playing
* When the start button is selected the introduction is replaced with randomly generated numbers that are to be used to create a calculation to compute a value that is also provided.
* The countdown timer displayed in digital clock type style starts counting down.

<p align="center">

![Game started](assets/images/game-running-responsive.jpg)
</p>

***

### Answer Correctly to Continue
* Enter a calculation that correctly computes the required value using the randomly generated numbers provided and the game continues to the next question. The progress bar increments to show the players progress.
<p align="center">

![Game progression](assets/images/answer-correct.jpg)
</p>

***

### Answer Incorrectly or Timers Elapses
* If the calulation submitted does not equate the required value the bomb detonates.
* If the rules of the game are not followed the bomb detonates.
* If the countdown timer has elapsed the bomb detonates.

<p align="center">

![Game failed screen](assets/images/game-not-complete.jpg)
</p>

***

### Answer 3 Correctly in a Row
* There is three calculations to submit within the allowed time to complete the game.

<p align="center">

![Game complete screen](assets/images/game-complete.jpg)
</p>

***

### Each Screen Display
* Successful and unsuccessful attempts of the game.

<p align="center">

![Screen display variations](assets/images/game-displays.jpg)
</p>

***

## Testing
* Testing to confirm website functions and displays as expected using Google Chrome and Edge browsers. 
* Devtools device toolbar was used to confirm website is responsive and remains asthetically pleasing for the different standard screen sizes.
* Buttons, input elements, progress bar increment and countdown timer have all been tested to confirm everything functions as required.   
***

## Validator Testing
* HTML - no errors found when passing index.html, select-a-plan.html and signup.html content through the [W3C validator](https://validator.w3.org/nu/#textarea)

* CSS - no errors found when passing style.css content through the [Jigsaw validator](https://jigsaw.w3.org/css-validator/validator)

* JSHINT - no errors and 52 warnings found when passing script.js file through [jshint](https://jshint.com/). Warnings do not impact running of the game and are limitec to the following:
    * 	'let' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz)
    *   'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6')
    * 	'template literal syntax' is only available in ES6 (use 'esversion: 6')
    *   'eval can be hamrful' - see more on this in [Issues List](#Issues-List)

* Website accessibility is a key part of the project criteria. Devtools Lighthouse was used to confirm the colors and fonts used in each page are easy to read and accessible however the performance scores is low - see more on this in [Issues List](#Issues-List)

<p align="center">

![Lighthouse report](assets/images/lighthouse-report.jpg)
</p>

***

## Technologies Used
### Languages
* [HTML5](https://en.wikipedia.org/wiki/HTML5)
* [CSS](https://en.wikipedia.org/wiki/CSS)

### Libraries
* [Google Fonts](https://fonts.google.com/) - Import 'Fredericka the Great' and 'Open Sans'
* [Font Awesome](https://fontawesome.com/) - version 5.15.4

### Framework
* [GitHub](https://github.com/juliandunne1234/math-bombs) - Maths Bomb project repository
* [Gitpod](https://www.gitpod.io/) - open source developer platform used to create the website for the project
***

## Deployment
* The site was deployed to GitHub pages using the following steps: 
    * Open the GitHub repository and select Settings tab
    * Select Master Branch from the source section drop down menu
    * Live link - [Maths Bomb](https://juliandunne1234.github.io/math-bombs/)
***

## Issues List
* 'eval can be hamrful' - warning generated as part of the JSHINT code review of the javascript file. When writing the code it was understood that using the eval method in javascript is not desireable. A reason for this is that the code can become corrupted by third parties. An example of this can be seen in the game where if the user inputs "alert('I can avoid the game rules')" a pop up window with the alert message displayed appears in the window. This obviously is not meant to be a feature of the game. The game will ultimately fail once this alert window is closed however it does show a bug in the code that was not possible to completely eliminate.
* The Lighthouse report has given a performance score of 73. The low performance score is noticeable from the game load time. The report says the hero-image size is an issue however this had not been an issue in previous iterations of the game. It seems to have started when backgound white space was removed for the game window and max-width and media queries were modified.
***
* Resolved Issues:
    * Stopping the timer at 00.00 seconds
    * Maintaining the timer format 00.09 once the timer was below 10 seconds
    * Accessing the values entered by the user to create the calculation and not including operators inputted as part of the calculation
    * Creating a game that even if the player knows the formula to calculate the answer, that becuase of the added randomness the game maintains a moderate level of difficulty
***

## Credits
### Content

* The Love Maths walkthrough project with Code Institute was very helpful to use as a starting point for this project.
* Tutor support was also very helpful and advice taken from mentor sessions was used during development of the website
* The progress bar was created with help using a Udemy course
    * 50 Projects in 50 Days - HTML, CSS, Javascript: Section 3 - Progress Steps
* Setting up the countdown timer using setInterval and configuring the timer so that the format was maintained when the timer was less than 10 seconds was got from the following YouTube video: [Coding Challenge #6](https://www.youtube.com/watch?v=MLtAMg9_Svw&t=1055s)

### Media
* All images and the video used in this project were found on the [pexels](https://www.pexels.com/) website
* Fonts used were imported from [Google Fonts](https://fonts.google.com/)
* Gym dumbell icon used throughout the website is taken from [Font Awesome](https://fontawesome.com/)
* Pop up window displayed as part of the game is taken from [sweetalert2](https://sweetalert2.github.io/)
***