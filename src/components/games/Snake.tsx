import { useEffect, useState } from "react";
import "../../styles/snake.css";

const BOARD_SIZE = 10;
const SPEED = 150;

type Direction = "up" | "down" | "left" | "right";

export default function SnakeGame() {
  const [snake, setSnake] = useState<number[]>([
    Math.floor((BOARD_SIZE * BOARD_SIZE) / 2),
  ]);
  const [direction, setDirection] = useState<Direction>("right");
  const [nextDirections, setNextDirections] = useState<Direction[]>([]);
  const [food, setFood] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [tick, setTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;
    const interval = setInterval(() => setTick((t) => t + 1), SPEED);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPaused]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;
    moveSnake();
  }, [tick]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver || isPaused) return;

      const lastDir = nextDirections[0] || direction;
      const opposite: Record<Direction, Direction> = {
        up: "down",
        down: "up",
        left: "right",
        right: "left",
      };

      const addDirection = (newDir: Direction) => {
        if (newDir !== lastDir && newDir !== opposite[lastDir]) {
          setNextDirections((prev) => [...prev, newDir]);
        }
      };

      switch (e.code) {
        case "KeyW":
          addDirection("up");
          break;
        case "KeyS":
          addDirection("down");
          break;
        case "KeyA":
          addDirection("left");
          break;
        case "KeyD":
          addDirection("right");
          break;
        case "KeyQ":
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, nextDirections, gameStarted, gameOver, isPaused]);

  useEffect(() => {
    if (gameStarted && food === null) {
      generateFood();
    }
  }, [gameStarted, food]);

  const moveSnake = () => {
    let actualDirection = direction;

    if (nextDirections.length) {
      actualDirection = nextDirections[0];
      setNextDirections((prev) => prev.slice(1));
      setDirection(actualDirection);
    }

    setSnake((prev) => {
      const head = prev[0];
      let newHead = head;

      switch (actualDirection) {
        case "up":
          newHead = head - BOARD_SIZE;
          if (newHead < 0) newHead = head + BOARD_SIZE * (BOARD_SIZE - 1);
          break;
        case "down":
          newHead = head + BOARD_SIZE;
          if (newHead >= BOARD_SIZE * BOARD_SIZE) newHead = head % BOARD_SIZE;
          break;
        case "left":
          newHead = head % BOARD_SIZE === 0 ? head + BOARD_SIZE - 1 : head - 1;
          break;
        case "right":
          newHead =
            (head + 1) % BOARD_SIZE === 0 ? head - BOARD_SIZE + 1 : head + 1;
          break;
      }

      if (prev.includes(newHead)) {
        setGameOver(true);
        setGameStarted(false);
        return prev;
      }

      const ateFood = newHead === food;

      if (ateFood) {
        setScore((s) => s + 1);
        generateFood([newHead, ...prev]);
        return [newHead, ...prev];
      } else {
        return [newHead, ...prev.slice(0, -1)];
      }
    });
  };

  const generateFood = (occupied: number[] = snake) => {
    let newFood: number;
    do {
      newFood = Math.floor(Math.random() * BOARD_SIZE * BOARD_SIZE);
    } while (occupied.includes(newFood));
    setFood(newFood);
  };

  const startGame = () => {
    setSnake([Math.floor((BOARD_SIZE * BOARD_SIZE) / 2)]);
    setDirection("right");
    setNextDirections([]);
    setFood(null);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setTick(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    if (!gameStarted || gameOver) return;
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="snake-game" id="snake">
      <h2>Игра Змейка</h2>

      {!gameStarted ? (
        <>
          <button className="reset-button" onClick={startGame}>
            Начать игру
          </button>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#aaa" }}>
            Управление: W A S D. Q — Пауза
          </p>
        </>
      ) : (
        <button className="reset-button" onClick={togglePause}>
          {isPaused ? "Продолжить" : "Пауза"}
        </button>
      )}

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
        aria-label="Игровое поле змейки"
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
          let className = "cell";
          if (snake[0] === i) className += " head";
          else if (snake.includes(i)) className += " body";
          else if (food === i) className += " food";

          return <div key={i} className={className} />;
        })}
      </div>

      <div className="status">
        {gameOver
          ? `Игра окончена! Счёт: ${score}`
          : isPaused
          ? "⏸ Игра на паузе"
          : `Счёт: ${score}`}
      </div>
    </div>
  );
}
