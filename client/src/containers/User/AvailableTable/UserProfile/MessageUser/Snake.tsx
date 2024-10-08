import React, { useState, useEffect, useCallback } from "react";
import './Snake.css';

const Snake: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [snake, setSnake] = useState<number[][]>([[0, 0]]);
  const [food, setFood] = useState<number[]>([]);
  const [direction, setDirection] = useState<string>("RIGHT");
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const boardSize = 20;
  const cellSize = 20;

  const startGame = () => {
    setGameStarted(true);
    setSnake([[0, 0]]);
    setFood(generateFood());
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    document.body.classList.add('no-scroll'); // Prevent scrolling
  };

  const resetGame = () => {
    setGameStarted(false);
    setSnake([[0, 0]]);
    setFood([]);
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    document.body.classList.remove('no-scroll'); // Enable scrolling
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    return [x, y];
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = [...newSnake[0]];

    switch (direction) {
      case "UP":
        head[1] -= 1;
        break;
      case "DOWN":
        head[1] += 1;
        break;
      case "LEFT":
        head[0] -= 1;
        break;
      case "RIGHT":
        head[0] += 1;
        break;
    }

    newSnake.unshift(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(generateFood());
      setScore((prev) => prev + 1);
    } else {
      newSnake.pop();
    }

    if (
      head[0] < 0 ||
      head[0] >= boardSize ||
      head[1] < 0 ||
      head[1] >= boardSize ||
      newSnake.slice(1).some(segment => segment[0] === head[0] && segment[1] === head[1])
    ) {
      setGameOver(true);
      document.body.classList.remove('no-scroll'); // Enable scrolling on game over
    } else {
      setSnake(newSnake);
    }
  }, [snake, direction, food, gameOver]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  }, [direction]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(moveSnake, 200);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearInterval(interval);
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (gameOver) {
      document.body.classList.remove('no-scroll'); // Ensure scrolling is enabled if the game is over
    }
  }, [gameStarted, gameOver, moveSnake, handleKeyDown]); // Added moveSnake and handleKeyDown here

  return (
    <div className="snake-game">
      <h3>Play Snake Game!</h3>
      <button onClick={startGame} disabled={gameStarted}>Start Game</button>
      <button onClick={resetGame} disabled={!gameStarted}>Reset Game</button>
      <div className="game-board" style={{ width: `${boardSize * cellSize}px`, height: `${boardSize * cellSize}px` }}>
        {Array.from({ length: boardSize }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: boardSize }).map((_, colIndex) => {
              const isSnake = snake.some(segment => segment[0] === colIndex && segment[1] === rowIndex);
              const isFood = food[0] === colIndex && food[1] === rowIndex;
              return (
                <div
                  key={colIndex}
                  className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over! Your score: {score}</div>}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Snake;
