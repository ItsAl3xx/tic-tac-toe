// app.js

// Selects the tic-tac-toe board and the turn indicator heading
const board = document.getElementById('ticTacToeBoard');
const turnIndicator = document.getElementById('turnIndicator');

// Sets the initial state of the game
let isXTurn = true;

// Adds click event listeners to each cell on the board
board.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
    cell.addEventListener('click', function() {
        // If the cell is already filled, ignore the click
        if (cell.textContent.trim() !== '') return;

        // Fill the cell with X or O based on whose turn it is
        cell.textContent = isXTurn ? 'X' : 'O';

        // Check for a win or a draw
        if (checkWin()) {
            alert(`${isXTurn ? 'X' : 'O'} wins!`);
            resetBoard();
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            resetBoard();
        } else {
            // Toggle the turn
            isXTurn = !isXTurn;
            turnIndicator.textContent = `${isXTurn ? 'X' : 'O'}'s Turn`;
        }
    });
});

// Checks if the current player has won
function checkWin() {
    const cells = [...board.querySelectorAll('.tic-tac-toe-cell')];
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check for matching patterns for a win
    return patterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent === cells[b].textContent &&
               cells[b].textContent === cells[c].textContent &&
               cells[a].textContent.trim() !== '';
    });
}

// Checks if all cells are filled and the game is a draw
function checkDraw() {
    return [...board.querySelectorAll('.tic-tac-toe-cell')]
        .every(cell => cell.textContent.trim() !== '');
}

// Resets the game board
function resetBoard() {
    board.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
        cell.textContent = '';
    });
    isXTurn = true;
    turnIndicator.textContent = 'X\'s Turn';
}

// Selects the restart button and adds a click event listener to reset the game
document.getElementById('resetButton').addEventListener('click', resetBoard);
