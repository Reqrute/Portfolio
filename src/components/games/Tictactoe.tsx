import { useState, useEffect } from "react";

import "../../styles/tictactoe.css"

type Symbol = "X" | "O";
type Difficulty = "easy" | "medium" | "hard";

type WinnerCheck = { player: Symbol; line: number[] } | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const initialBoard = Array<Symbol | null>(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Symbol>("X");
  const [playerSymbol, setPlayerSymbol] = useState<Symbol>("X");
  const [winner, setWinner] = useState<Symbol | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [gameStarted, setGameStarted] = useState(false);

  const aiSymbol = playerSymbol === "X" ? "O" : "X";

  useEffect(() => {
    if (gameStarted && currentPlayer === aiSymbol && !winner) {
      const timeout = setTimeout(() => makeAIMove(), 500);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, winner, board, gameStarted, difficulty]);

  const updateBoard = (index: number, symbol: Symbol) => {
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.player);
      setWinningLine(result.line);
    } else if (newBoard.every(Boolean)) {
      setWinner(null);
      setWinningLine(null);
    } else {
      setCurrentPlayer(symbol === "X" ? "O" : "X");
    }
  };

  const handleClick = (index: number) => {
    if (!gameStarted || board[index] || winner || currentPlayer !== playerSymbol) return;
    updateBoard(index, playerSymbol);
  };

  const makeAIMove = () => {
    let move: number | null = null;

    switch (difficulty) {
      case "easy":
        move = getRandomMove();
        break;
      case "medium":
        move = getWinningMove(aiSymbol) ?? getWinningMove(playerSymbol) ?? getRandomMove();
        break;
      case "hard":
        move = getBestMove(aiSymbol);
        break;
    }

    if (move !== null) updateBoard(move, aiSymbol);
  };

  const getEmptyIndices = () => board.reduce<number[]>((acc, val, idx) => val === null ? [...acc, idx] : acc, []);

  const getRandomMove = () => {
    const empties = getEmptyIndices();
    return empties.length ? empties[Math.floor(Math.random() * empties.length)] : null;
  };

  const checkWinner = (b: (Symbol | null)[]): WinnerCheck => {
    for (const line of LINES) {
      const [a, b1, c] = line;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return { player: b[a], line };
      }
    }
    return null;
  };

  const getWinningMove = (player: Symbol) => {
    return getEmptyIndices().find(idx => {
      const copy = [...board];
      copy[idx] = player;
      return checkWinner(copy)?.player === player;
    }) ?? null;
  };

  const getBestMove = (player: Symbol): number | null => {
    const opponent = player === "X" ? "O" : "X";

    const minimax = (b: (Symbol | null)[], current: Symbol): number => {
      const result = checkWinner(b);
      if (result) return result.player === player ? 10 : -10;
      if (b.every(Boolean)) return 0;

      const moves = getEmptyIndices();
      const scores = moves.map(move => {
        const copy = [...b];
        copy[move] = current;
        return minimax(copy, current === player ? opponent : player);
      });

      return current === player ? Math.max(...scores) : Math.min(...scores);
    };

    return getEmptyIndices().reduce((best, idx) => {
      const copy = [...board];
      copy[idx] = player;
      const score = minimax(copy, opponent);
      if (best === null || score > best.score) {
        return { index: idx, score };
      }
      return best;
    }, null as { index: number, score: number } | null)?.index ?? null;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine(null);
    setCurrentPlayer("X");
    setGameStarted(false);
  };

  const startGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine(null);
    setCurrentPlayer("X");
    setGameStarted(true);
    if (playerSymbol === "O") setCurrentPlayer("X");
  };

  return (
    <div className="game">
      <h2>Крестики-нолики с ИИ</h2>

      <label className="difficulty-label">
        Играть за:&nbsp;
        <select value={playerSymbol} onChange={e => setPlayerSymbol(e.target.value as Symbol)} disabled={gameStarted}>
          <option value="X">X (первый)</option>
          <option value="O">O (второй)</option>
        </select>
      </label>

      <label className="difficulty-label">
        Уровень ИИ:&nbsp;
        <select value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)} disabled={gameStarted}>
          <option value="easy">Легкий</option>
          <option value="medium">Средний</option>
          <option value="hard">Сложный</option>
        </select>
      </label>

      {!gameStarted && (
        <button className="reset-button" onClick={startGame}>Начать игру</button>
      )}

      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`cell ${winningLine?.includes(i) ? "winning-cell" : ""} ${cell ? "filled" : ""}`}
            onClick={() => handleClick(i)}
            role="button"
            tabIndex={0}
            aria-label={`Клетка ${i + 1}, ${cell ?? "пустая"}`}
            onKeyDown={e => { if (e.key === "Enter") handleClick(i); }}
          >
            {cell}
          </div>
        ))}
      </div>

      {gameStarted && (
        <>
          <div className="status">
            {winner ? `Победил: ${winner}` : board.every(Boolean) ? "Ничья!" : `Ходит: ${currentPlayer === playerSymbol ? "Ты" : "ИИ"} (${currentPlayer})`}
          </div>
          <button className="reset-button" onClick={resetGame}>Сброс</button>
        </>
      )}
    </div>
  );
}