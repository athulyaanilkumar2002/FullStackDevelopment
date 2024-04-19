document.addEventListener("DOMContentLoaded", function() {
    const wordDisplay = document.getElementById("word-display");
    const keypad = document.getElementById("keypad");
    const guessHistory = document.getElementById("guess-history");

    const words = ["HELLO", "WORLD", "JAVASCRIPT", "PROGRAMMING", "COMPUTER", "SCIENCE"]; // Array of words
    let word = getRandomWord(words); // Get a random word from the array
    let guesses = [];

    // Initialize the word display with underscores
    wordDisplay.textContent = "_".repeat(word.length);

    // Function to handle user guesses
    function handleGuess(letter) {
        if (!guesses.includes(letter)) {
            guesses.push(letter);
            const wordSoFar = word.split("").map(char => guesses.includes(char) ? char : "_").join("");
            wordDisplay.textContent = wordSoFar;

            if (wordSoFar === word) {
                alert("Congratulations! You guessed the word "+word);
                resetGame();
            } else if (guesses.length === word.length+5) {
                alert("Sorry, you've run out of guesses.");
                resetGame();
            }
        }
    }

    // Function to reset the game
    function resetGame() {
        guesses = [];
        word = getRandomWord(words); // Get a new random word
        wordDisplay.textContent = "_".repeat(word.length);
    }

    // Function to get a random word from an array
    function getRandomWord(wordArray) {
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        return wordArray[randomIndex];
    }

    // Event listener for keypad buttons
    keypad.addEventListener("click", function(event) {
        if (event.target.classList.contains("key")) {
            const letter = event.target.textContent;
            handleGuess(letter);
        }
    });
});
        document.addEventListener("DOMContentLoaded", function () {
    const goToPageBtn = document.getElementById("goToindex");

    goToPageBtn.addEventListener("click", function () {
        // Change "page.html" to the URL of the page you want to navigate to
        window.location.href = "index.html";
    });
});