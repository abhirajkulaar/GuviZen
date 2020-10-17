
# Trivia Quiz Game

This project can be used to create a quiz game by consuming API from https://opentdb.com/.

### Structure

The project is split across pages based on functionality 

###### index.html
Contains simple bootstrap buttons to 
1. Navigate to game.html(to play the game) 
OR
2. Navigate to highscores.html(to show highscores)

###### game.html

Here's where you can actually play the game
all JS code for this is present in script.js along with the fetch command to get the list of all questions
By default it is hardcoded with URL to get 10 computer science medium questions

It works by getting the list of all questions in a array stored globally
then a function exists to move to next question while maintianing current question number globally as well

After completing all questions score is saved in **session storage** user is moved to end.html

###### end.html
Here user can view his score and save it.
It is saved to the **local storage** after user enters his name

###### highscores.html

Here all the scores all pulled from local storage and displayed in decreasing order.

## Usage
User can just pull all the files and run on a local live server or deploy.
Any adjustments to the questionaaire can be easily made bt generating corresponding link from https://opentdb.com/
and replacing link in script.src with mentioned link.
