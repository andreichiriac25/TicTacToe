export const generateBoard = (size) => {
  const board = [];

  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push("");
    }
  }

  return board;
};

const transpose = (board) => {
  const newBoard = board[0].map((col, colIndex) =>
    board.map((row) => row[colIndex])
  );

  return newBoard;
};

export const checkRows = (board) => {
  const lineWinX = board.some((row) => row.every((col) => col === "x"));
  const lineWinO = board.some((row) => row.every((col) => col === "o"));

  return { lineWinX, lineWinO };
};

export const checkColumns = (board) => {
  const transposedBoard = transpose(board);

  const colWinX = transposedBoard.some((row) =>
    row.every((col) => col === "x")
  );
  const colWinO = transposedBoard.some((row) =>
    row.every((col) => col === "o")
  );

  return { colWinX, colWinO };
};

export const checkDiagonals = (board) => {
  let primaryDiagonalX = true;
  let primaryDiagonalO = true;
  let secondaryDiagonalX = true;
  let secondaryDiagonalO = true;

  for (let i = 0; i < board.length; i++) {
    if (board[i][i] !== "x") {
      primaryDiagonalX = false;
    }

    if (board[i][i] !== "o") {
      primaryDiagonalO = false;
    }

    if (board[i][board.length - i - 1] !== "x") {
      secondaryDiagonalX = false;
    }

    if (board[i][board.length - i - 1] !== "o") {
      secondaryDiagonalO = false;
    }
  }

  return {
    primaryDiagonalX,
    primaryDiagonalO,
    secondaryDiagonalX,
    secondaryDiagonalO,
  };
};
