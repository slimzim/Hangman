console.log("Welcome to Hangman!")

// Variables set to initial values

var wins = 0;
var losses = 0;
var guessesRemaining = 12
var userWins = ""
var hangmanArray = [];
var alreadyGuessed = [];

    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;


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
        scanGuess()

// This function determines if the user has already guessed that letter or not

    function scanGuess() {
        if (alreadyGuessed.includes(userGuess)) {
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
            playSound();
            console.log("Wins: " + wins)
            document.getElementById("wins").innerHTML = wins;
            reStartGame();
   
            
    }
}
    
    // When the user loses

    function loseGame(){
        document.getElementById("instructions").innerHTML = "You lose!"
        losses++;
        document.getElementById("losses").innerHTML = losses;
        reStartGame();
        }

    function reStartGame(){
        var delayInMilliseconds = 1000; 
        setTimeout(function() {
                console.log("Restarting Game...")
                guessesRemaining = 12;
                hangmanArray = [];
                alreadyGuessed = [];
                songChooser();
                wordToArray();
                currentWordInit();
                document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed;
                document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
            }, delayInMilliseconds);
        }

        function playSound() {
        console.log("playing sound")
        
        if (hangmanWord === "Drive My Car") {
            var audio = new Audio('./assets/audio/DriveMyCar.mp3');
            audio.play();
            document.getElementById("winningSrc").src="./assets/images/DriveMyCar.jpg"
        }
        if (hangmanWord === "All You Need Is Love") {
            var audio = new Audio('./assets/audio/AllYouNeedIsLove.mp3');
            document.getElementById("winningSrc").src="./assets/images/AllYouNeedIsLove.jpg"
            audio.play();
        }
        if (hangmanWord === "Eleanor Rigby") {
            var audio = new Audio('./assets/audio/EleanorRigby.mp3');
            document.getElementById("winningSrc").src="./assets/images/EleanorRigby.jpg"
            audio.play();
        }
        if (hangmanWord === "Help") {
            var audio = new Audio('./assets/audio/Help.mp3');
            document.getElementById("winningSrc").src="./assets/images/Help.jpg"
            audio.play();
        }
        if (hangmanWord === "I Am The Walrus") {
            var audio = new Audio('./assets/audio/IAmTheWalrus.mp3');
            document.getElementById("winningSrc").src="./assets/images/IAmTheWalrus.jpg"
            audio.play();  
        }  
        } 