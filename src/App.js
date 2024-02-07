import "./App.scss";

import { useState } from "react";

import TicTacToe from "./components/TicTacToe/TicTacToe";

function App() {
  const [size, setSize] = useState(0);
  const [input, setInput] = useState("");

  return (
    <div className="App">
      <div>
        <label htmlFor="size">Size </label>
        <input
          type="text"
          name="size"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button onClick={() => setSize(input)}>Create New Table</button>

      {size > 2 ? (
        <TicTacToe size={size} />
      ) : (
        <div style={{ color: "red", paddingTop: "20px" }}>
          Add a size of at least 3
        </div>
      )}
    </div>
  );
}

export default App;
