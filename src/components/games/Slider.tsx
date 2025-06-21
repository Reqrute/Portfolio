import { useState, useEffect } from "react";
import "../../styles/slider.css";

const imageURL =
  "https://images.unsplash.com/photo-1745933115134-9cd90e3efcc7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function SliderPuzzle() {
  const [size, setSize] = useState(3);
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  const totalTiles = size * size;

  useEffect(() => {
    generateBoard();
  }, [size]);

  useEffect(() => {
  if (tiles.length && isSolvedBoard(tiles)) {
    setIsSolved(true);
  }
}, [tiles]);

  const generateBoard = () => {
    const initial = [...Array(totalTiles).keys()];
    let shuffled = shuffle([...initial]);

    while (!isSolvable(shuffled) || isSolvedBoard(shuffled)) {
      shuffled = shuffle([...initial]);
    }

    setTiles(shuffled);
    setEmptyIndex(shuffled.indexOf(totalTiles - 1));
    setIsSolved(false);
  };

  const shuffle = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const isSolvedBoard = (arr: number[]) =>
    arr.every((val, idx) => val === idx);

const isSolvable = (arr: number[]) => {
  const invCount = arr.reduce((acc, curr, i) => {
    for (let j = i + 1; j < arr.length; j++) {
      if (curr !== totalTiles - 1 && arr[j] !== totalTiles - 1 && curr > arr[j]) {
        acc++;
      }
    }
    return acc;
  }, 0);

  const emptyRow = Math.floor(arr.indexOf(totalTiles - 1) / size);
  const emptyRowFromBottom = size - emptyRow;

  if (size % 2 === 1) {
    return invCount % 2 === 0;
  } else {
    return (invCount + emptyRowFromBottom) % 2 === 1;
  }
};


  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);
    }
  };

  return (
    <div className="slider-game" id="slider-game">
      <h2>Скользящая головоломка</h2>

      <div className="controls">
        <select
          className="select-size"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          disabled={isSolved}
        >
          {[3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n * n} плиток
            </option>
          ))}
        </select>
        <button className="reset-button-slider" onClick={generateBoard}>
          Перемешать
        </button>
      </div>

      <div
        className="slider-board"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={`${tile}-${index}`}
            className={`tile ${tile === totalTiles - 1 && !isSolved ? "empty" : ""}`}
            onClick={() => handleTileClick(index)}
            style={{
              backgroundImage: `url(${imageURL})`,
              backgroundSize: `${size * 100}% ${size * 100}%`,
              backgroundPosition: `${(tile % size) * (100 / (size - 1))}% ${
                Math.floor(tile / size) * (100 / (size - 1))
              }%`,
              opacity: tile === totalTiles - 1 && !isSolved ? 0 : 1,
              cursor: isSolved ? "default" : "pointer",
            }}
          />
        ))}
      </div>

      {isSolved && <p className="status">🎉 Головоломка решена!</p>}
    </div>
  );
}
