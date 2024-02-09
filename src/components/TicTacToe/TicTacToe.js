import "./TicTacToe.scss";

import { useCallback, useEffect, useState } from "react";

import {
  checkColumns,
  checkDiagonals,
  checkRows,
  generateBoard,
} from "../../utils/utils";
import Box from "../Box/Box";

const checkBoard = (board) => {
  const { rowWinX, rowWinO } = checkRows(board);
  const { colWinX, colWinO } = checkColumns(board);
  const {
    primaryDiagonalX,
    primaryDiagonalO,
    secondaryDiagonalX,
    secondaryDiagonalO,
  } = checkDiagonals(board);

  if ((rowWinX || colWinX) && !(rowWinO || colWinO)) {
    return { xWins: true, oWins: false };
  }

  if (!(rowWinX || colWinX) && (rowWinO || colWinO)) {
    return { xWins: false, oWins: true };
  }

  if (
    (primaryDiagonalX || secondaryDiagonalX) &&
    !(primaryDiagonalO || secondaryDiagonalO)
  ) {
    return { xWins: true, oWins: false };
  }

  if (
    !(primaryDiagonalX || secondaryDiagonalX) &&
    (primaryDiagonalO || secondaryDiagonalO)
  ) {
    return { xWins: false, oWins: true };
  }

  return {
    xWins: false,
    oWins: false,
  };
};

const TicTacToe = ({ size }) => {
  const [player, setPlayer] = useState("x");
  const [board, setBoard] = useState([]);
  const [win, setWin] = useState("");

  useEffect(() => {
    resetBoard();
    setBoard(generateBoard(size));
  }, [size]);

  const resetBoard = useCallback(() => {
    const newBoard = board.map((row) => row.map(() => ""));
    setBoard([...newBoard]);
  }, [board]);

  const handleBoxClick = (row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = player;
    setBoard(newBoard);
    setPlayer((prev) => (prev === "x" ? "o" : "x"));
    setWin("");

    const playerWin = checkBoardWin();

    if (playerWin) {
      setTimeout(() => resetBoard(), 3000);
    }
  };

  const checkBoardWin = () => {
    const { xWins, oWins } = checkBoard(board);

    if (xWins) {
      setWin("x");
      return true;
    }

    if (oWins) {
      setWin("o");
    }

    return false;
  };

  return size ? (
    <div className="tic-tac-toe">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <Box
              rowIndex={rowIndex}
              colIndex={colIndex}
              onClick={handleBoxClick}
              player={col}
              key={`box-${rowIndex}-${colIndex}`}
            />
          ))}
        </div>
      ))}

      {win && (
        <div style={{ color: "red", paddingTop: "20px" }}>
          Player {win} has won!
        </div>
      )}
    </div>
  ) : null;
};

export default TicTacToe;
