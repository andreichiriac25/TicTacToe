import "./TicTacToe.scss";

import { useState } from "react";

import {
  checkColumns,
  checkDiagonals,
  checkRows,
  generateBoard,
} from "../../utils/utils";
import Box from "../Box/Box";

const TicTacToe = ({ size }) => {
  const [player, setPlayer] = useState("x");
  const [board, setBoard] = useState(generateBoard(size));
  const [win, setWin] = useState("");

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

  const resetBoard = () => {
    const newBoard = board.map((row) => row.map(() => ""));
    setBoard([...newBoard]);
  };

  const checkBoardWin = () => {
    const { rowWinX, rowWinO } = checkRows(board);
    const { colWinX, colWinO } = checkColumns(board);
    const {
      primaryDiagonalX,
      primaryDiagonalO,
      secondaryDiagonalX,
      secondaryDiagonalO,
    } = checkDiagonals(board);

    if ((rowWinX || colWinX) && !(rowWinO || colWinO)) {
      setWin("x");
      return true;
    }

    if (!(rowWinX || colWinX) && (rowWinO || colWinO)) {
      setWin("o");
      return true;
    }

    if (
      (primaryDiagonalX || secondaryDiagonalX) &&
      !(primaryDiagonalO || secondaryDiagonalO)
    ) {
      setWin("x");
      return true;
    }

    if (
      !(primaryDiagonalX || secondaryDiagonalX) &&
      (primaryDiagonalO || secondaryDiagonalO)
    ) {
      setWin("o");
      return true;
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
