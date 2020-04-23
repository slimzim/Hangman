console.log("Welcome to Hangman!")

var wins = 0;
var guessesRemaining = ""
var userWins = ""
var hangmanArray = [];
var alreadyGuessed = [];
console.log("Already Guessed:" + alreadyGuessed)

initialize();

function initialize(){
    guessesRemaining = 12;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("wins").innerHTML = wins;
}

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

wordToArray();

function wordToArray(){
    
     for (i = 0; i < hangmanWord.length; i++){
        var letterAt = hangmanWord.charAt(i);
        hangmanArray.push(letterAt);
        }
        hangmanArray = hangmanArray.map(function(x){ return x.toUpperCase() })
        console.log(hangmanArray)
}


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
        console.log(guessSuccess)

    






        
// userGuess is compared to every index in hangmanArray

    for (i = 0; i < hangmanArray.length; i++){    
        

    if (userGuess === hangmanArray[i]) {
        wordDisplay.splice(i, 1, userGuess)
        document.getElementById("currentWord").innerHTML = wordDisplay.join(""); 
        console.log(wordDisplay);
        guessSuccess = true;
        }
    

    else if (i === hangmanArray.length-1) {
        console.log("Running turnResults function...")
        turnResults()
    }

// Results of the guess are displayed
    
    function turnResults() {

    if (guessSuccess === true) {
        document.getElementById("instructions").innerHTML = userGuess + " is in the word!"
        console.log("Guesses Remaining: " + guessesRemaining)
        console.log(guessSuccess)
        didYouWin()
        
    }

    else if (guessSuccess === false) {
        document.getElementById("instructions").innerHTML = userGuess + " is not in the word!"
        guessesRemaining--;
        document.getElementById("guessesRemaining").innerHTML = guessesRemaining
        console.log("Guesses Remaining: " + guessesRemaining) 
        alreadyGuessed.push(userGuess);
        console.log(alreadyGuessed);
        document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed.join(" ")
    }

    }
}

// scan wordDisplay array for _

        function didYouWin(){
    
            if (wordDisplay.includes("_ ")) {
                console.log("_ still exists")
            }
            else {
                console.log("user wins")
                document.getElementById("instructions").innerHTML = "You win!"
                wins++;
            }
            
        }
            
        }
    
    
    
    
    
    
    



    
    
    



// if no _, user Wins

// if _, compare letter to already guessed array

// if userGuess is in alreadyGuessed, break the function

// if userGuess is not in alreadyGuessed, add it, decrease guessesRemaining by 1




    
