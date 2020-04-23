console.log("Welcome to Hangman!")

// Variables set to initial values


var wins = 0;
var guessesRemaining = ""
var userWins = ""
var hangmanArray = [];
var alreadyGuessed = [];
var duplicateGuess = false;

initialize();

function initialize(){
    guessesRemaining = 12;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("wins").innerHTML = wins;
}

// A word is randomly chosen from the beatlesSongs array for this round


var beatlesSongs = [
    "Help", 
    "I Am The Walrus", 
    "All You Need Is Love", 
    "Eleanor Rigby", 
    "Drive My Car" 
]

var hangmanWord = songChooser();

function songChooser() {
    hangmanWord = beatlesSongs[Math.floor(Math.random() * beatlesSongs.length)];
    console.log("Word for This Round: ", hangmanWord);
    return hangmanWord;
  }


// Word is then converted to an array of individual letters and spaces

wordToArray();

function wordToArray(){
    
     for (i = 0; i < hangmanWord.length; i++){
        var letterAt = hangmanWord.charAt(i);
        hangmanArray.push(letterAt);
        }
        hangmanArray = hangmanArray.map(function(x){ return x.toUpperCase() })
        console.log(hangmanArray)
}

// A second array is created to be displayed as blank spaces 


currentWordInit();

function currentWordInit(){
    
    wordDisplay = [];
    
    for (i = 0; i < hangmanArray.length; i++){
        
        if (hangmanArray[i] !== " ") {
        wordDisplay.push("_ ");
        }

        else if (hangmanArray[i] === " ") {
            wordDisplay.push("&nbsp");
        }
        
        document.getElementById("currentWord").innerHTML = wordDisplay.join("");
    }

}   
    
// User presses a key, text value is stored in a variable, compare function is launched

    document.onkeyup = function(event) {
        var userGuess = event.key.toUpperCase();
        console.log("User Guess: ", userGuess);
        var guessSuccess = false;
        userWins = false;

// This function determines if the user has already guessed that letter or not

    function scanGuess() {
        if (alreadyGuessed.includes(userGuess) && alreadyGuessed.length > 1) {
            console.log("duplicate guess")
            document.getElementById("instructions").innerHTML = "You already guessed " + userGuess + "!";         
        }
    }

// userGuess is compared to every index in hangmanArray, and blank spaces are replaced with the letter.

    for (i = 0; i < hangmanArray.length; i++){    
        

    if (userGuess === hangmanArray[i]) {
        wordDisplay.splice(i, 1, userGuess)
        document.getElementById("currentWord").innerHTML = wordDisplay.join(""); 
        console.log(wordDisplay);
        guessSuccess = true;
        }
    }

    console.log("Running turnResults function...")
        turnResults()

// Results of the guess are displayed
    
    function turnResults() {

    if (guessSuccess === true) {
        document.getElementById("instructions").innerHTML = userGuess + " is in the word!"
        console.log("Guesses Remaining: " + guessesRemaining)
        didYouWin()
        
    }

    else if (guessSuccess === false) {
        document.getElementById("instructions").innerHTML = userGuess + " is not in the word!"
        guessesRemaining--;
        if (guessesRemaining < 1) {
            loseGame();
        }
        document.getElementById("guessesRemaining").innerHTML = guessesRemaining
        console.log("Guesses Remaining: " + guessesRemaining) 
        alreadyGuessed.push(userGuess);
        console.log(alreadyGuessed);
        document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed.join(" ")  
    }

    }
}

// This function determines if the user has won.

    function didYouWin(){

        if (wordDisplay.includes("_ ")) {
            console.log("_ still exists");
        }
        
        else {
            console.log("user wins");
            document.getElementById("instructions").innerHTML = "You win!"
            wins++;
            console.log("Wins: " + wins)
            document.getElementById("wins").innerHTML = wins;
   
            
    }
}
    
    // When the user loses

    function loseGame(){
        document.getElementById("instructions").innerHTML = "You lose!"
        
        
        }
