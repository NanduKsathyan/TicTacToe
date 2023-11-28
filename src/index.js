const BOARD_WIDTH = 3;
let currentPlayer = 1;
let numberOfMove = 0;
let boardState = generateBoardState();
const heading = document.getElementById("game-heading");
const restartButton = document.getElementById("restart");
const gameSquares = document.querySelectorAll(".game-square");

restartButton.style.display = "none";

gameSquares.forEach((gamrSquarere, i) =>
  gamrSquarere.addEventListener("click", () => {
    let row = Math.floor(i / BOARD_WIDTH);
    let colum = Math.floor(i % BOARD_WIDTH);
    makeMove(gamrSquarere, row, colum);
  })
);

restartButton.addEventListener("click", resetGame);

function makeMove(gamrSquarere, row, colum) {
  gamrSquarere.textContent = currentPlayer === 1 ? "X" : "O";
  gamrSquarere.disabled = true;
  numberOfMove++;
  boardState[row][colum] = currentPlayer;
  if (didPlayerWin(currentPlayer)) {
    heading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numberOfMove >= BOARD_WIDTH * BOARD_WIDTH) {
    heading.textContent = `It's a tie game !`;
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeading();
  }
}

function didPlayerWin(currentPlayer) {
  const rows = [0, 1, 2];
  const wonHorizontal = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const column = [0, 1, 2];
  const wonVerically = column?.some((col) => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  const wonTopLeftToBottomRight =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;

  const wonTopRightToBottomLeft =
    boardState[0][2] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][0] === currentPlayer;

  return (
    wonHorizontal ||
    wonVerically ||
    wonTopLeftToBottomRight ||
    wonTopRightToBottomLeft
  );
}

function endGame() {
  restartButton.style.display = "block";
  gameSquares.forEach((square) => {
    square.disabled = true;
  });
}

function setCurrentPlayerHeading() {
  heading.textContent = `Player ${currentPlayer}'s Turn`;
}

function generateBoardState() {
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill());
}

function resetGame() {
  boardState = generateBoardState();
  currentPlayer = 1;
  numberOfMove = 0;
  restartButton.style.display = "none";
  gameSquares.forEach((square) => {
    square.textContent = "";
    square.disabled = false;
  });
}
