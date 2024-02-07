import "./Box.scss";

const Box = ({ rowIndex, colIndex, onClick, player }) => {
  const handleClick = () => {
    if (!player) {
      onClick(rowIndex, colIndex);
    }
  };

  return (
    <div className="box" onClick={handleClick} key={`${rowIndex}-${colIndex}`}>
      {player === "x" && (
        <div className="tick" key={`tick-${rowIndex}-${colIndex}`}>
          X
        </div>
      )}
      {player === "o" && (
        <div className="zero" key={`zero-${rowIndex}-${colIndex}`}>
          O
        </div>
      )}
    </div>
  );
};

export default Box;
