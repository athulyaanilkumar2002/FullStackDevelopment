document.addEventListener("DOMContentLoaded", function () {
    let board = document.getElementById("board");
    let cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const restartBtn = document.getElementById("restart");

    let currentPlayer = "O";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

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

    function checkWinner() {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                return boardState[a];
            }
        }
        return null;
    }

    function getEmptyCells(board) {
        return board.reduce((emptyCells, cell, index) => {
            if (cell === "") emptyCells.push(index);
            return emptyCells;
        }, []);
    }

    function aiMove() {
        const emptyCells = getEmptyCells(boardState);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const moveIndex = emptyCells[randomIndex];
        boardState[moveIndex] = currentPlayer;
        cells[moveIndex].textContent = currentPlayer;
    }

    function handleCellClick(index) {
        if (!gameActive || boardState[index] !== "") return;

        boardState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        const winner = checkWinner();
        
        if (winner) {
            status.textContent = `Player ${winner} wins!`;
            gameActive = false;
        } else if (!boardState.includes("")) {
            status.textContent = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;

            if (currentPlayer === "O") {
                aiMove();
                const aiWinner = checkWinner();
                if (aiWinner) {
                    status.textContent = `Player ${aiWinner} (AI) wins!`;
                    gameActive = false;
                } else if (!boardState.includes("")) {
                    status.textContent = "It's a tie!";
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    status.textContent = `Player ${currentPlayer}'s turn`;
                }
            }
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            handleCellClick(index);
        });
    });

    restartBtn.addEventListener("click", () => {
        currentPlayer = "X";
        gameActive = true;
        boardState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        status.textContent = `Player ${currentPlayer}'s turn`;
    });

    status.textContent = `Player ${currentPlayer}'s turn`;
});
