document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    // Function to handle player's move
    function handlePlayerMove(index) {
        if (board[index] === "") {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins!`);
                resetGame();
                return;
            }
            if (checkDraw()) {
                alert("It's a draw!");
                resetGame();
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    // Function to check if the game is a draw
    function checkDraw() {
        return board.every(cell => cell !== "");
    }

    // Function to check if the current player wins
    function checkWin(player) {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winningCombos.some(combo => {
            return combo.every(index => board[index] === player);
        });
    }

    // Function to reset the game
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
    }

    // Event listeners for player clicks
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handlePlayerMove(index));
    });

    // Event listener for restart button
    restartButton.addEventListener("click", resetGame);
});

