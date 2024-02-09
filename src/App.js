import "./App.scss";

import { useEffect, useState } from "react";

import TicTacToe from "./components/TicTacToe/TicTacToe";

const INPUT_SIZE_ERROR = "Add a size of at least 3";
const INVALID_INPUT_ERROR = "Invalid input, please only use numeric characters";

function App() {
  const [size, setSize] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError(size < 3 ? INPUT_SIZE_ERROR : "");
  }, [size]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!parseInt(input, 10)) {
      setError(INVALID_INPUT_ERROR);
      return;
    }

    setSize(input);
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setError(parseInt(value, 10) < 3 ? INPUT_SIZE_ERROR : "");
    setInput(value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="size" className="board-label">
            Input a n size size of the board
          </label>
          <input
            type="text"
            name="size"
            className="board-input"
            value={input}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="board-create">
          Create New Table
        </button>
      </form>

      {!error ? (
        <TicTacToe size={size} />
      ) : (
        <div style={{ color: "red", paddingTop: "20px" }}>{error}</div>
      )}
    </div>
  );
}

export default App;
