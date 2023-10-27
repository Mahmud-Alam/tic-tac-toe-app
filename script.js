const startScreen = document.getElementById("start-screen");
const gameBoard = document.getElementById("game-board");
const result = document.getElementById("result");
const chooseXButton = document.getElementById("choose-X");
const chooseOButton = document.getElementById("choose-O");
const restartGameButton = document.getElementById("restart-button");

let currentPlayer = "X";
let cells = new Array(9).fill("");

chooseXButton.addEventListener("click", () => chooseSymbol("X"));
chooseOButton.addEventListener("click", () => chooseSymbol("O"));

function chooseSymbol(symbol) {
  currentPlayer = symbol;
  startScreen.style.display = "none";
  gameBoard.style.display = "grid";
  createGameBoard();
}

function createGameBoard() {
  for (let i = 0; i < cells.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i));
    gameBoard.appendChild(cell);
  }
}

function makeMove(index) {
  if (cells[index] === "") {
    cells[index] = currentPlayer;
    gameBoard.children[index].innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      // We have a winner
      result.innerHTML = `<span class="result-message">"${currentPlayer}" wins!</span>`;
      gameBoard.style.pointerEvents = "none"; // Disable further moves
      restartGameButton.style.display = "block";
      // console.log('win!!!');
      restartGameButton.addEventListener("click", () => location.reload());

      return;
    }
  }

  if (!cells.includes("")) {
    // It's a draw
    result.innerHTML = `<span class="result-message">It's a draw!</span>`;
    restartGameButton.style.display = "block";
    // console.log('draw!!!');
    restartGameButton.addEventListener("click", () => location.reload());
  }
}

/*
function restartGame() {
    // Clear the board
    console.log('restart the game...');
    cells = new Array(9).fill("");
    const cellElements = gameBoard.getElementsByClassName("cell");
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].innerText = "";
    }

    // Reset the result message
    result.innerHTML = "";
    gameBoard.style.pointerEvents = "auto"; // Re-enable cell clicks
}
*/
