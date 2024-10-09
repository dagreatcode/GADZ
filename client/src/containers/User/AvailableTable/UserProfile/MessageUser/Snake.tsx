import React, { useState, useEffect, useCallback } from "react";
import styles from "./Snake.module.css";

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
    setFood(getRandomFoodPosition([[0, 0]]));
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    document.body.classList.add("no-scroll");
  };

  const resetGame = () => {
    setGameStarted(false);
    setSnake([[0, 0]]);
    setFood([]);
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    document.body.classList.remove("no-scroll");
  };

  const getRandomFoodPosition = (snakePositions: number[][]): number[] => {
    let newFood: number[];

    do {
      newFood = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
    } while (
      snakePositions.some(
        // eslint-disable-next-line no-loop-func
        (segment) => segment[0] === newFood[0] && segment[1] === newFood[1]
      )
    );

    return newFood;
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
      setFood(getRandomFoodPosition(newSnake));
      setScore((prev) => prev + 1);
    } else {
      newSnake.pop(); // Remove the tail if not eating
    }

    // Check for game over conditions
    const isCollision = (head: number[], snake: number[][]) => {
      return (
        head[0] < 0 ||
        head[0] >= boardSize ||
        head[1] < 0 ||
        head[1] >= boardSize ||
        snake
          .slice(1)
          .some((segment) => segment[0] === head[0] && segment[1] === head[1])
      );
    };

    if (isCollision(head, newSnake)) {
      setGameOver(true);
      document.body.classList.remove("no-scroll");
    } else {
      setSnake(newSnake);
    }
  }, [snake, direction, food, gameOver]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [direction]
  );

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(moveSnake, 200);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearInterval(interval);
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (gameOver) {
      document.body.classList.remove("no-scroll");
    }
  }, [gameStarted, gameOver, moveSnake, handleKeyDown]);

  return (
    <div className={styles.snakeGame}>
      <h3 className={styles.h3}>Play Snake Game!</h3>
      <button
        className={styles.button}
        onClick={startGame}
        disabled={gameStarted}
      >
        Start Game
      </button>
      <button
        className={styles.button}
        onClick={resetGame}
        disabled={!gameStarted}
      >
        Reset Game
      </button>
      <div
        className={styles.gameBoard}
        style={{
          width: `${boardSize * cellSize}px`,
          height: `${boardSize * cellSize}px`,
        }}
      >
        {Array.from({ length: boardSize }).map((_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {Array.from({ length: boardSize }).map((_, colIndex) => {
              const isSnake = snake.some(
                (segment) => segment[0] === colIndex && segment[1] === rowIndex
              );
              const isFood = food[0] === colIndex && food[1] === rowIndex;
              return (
                <div
                  key={colIndex}
                  className={`${styles.cell} ${isSnake ? styles.snake : ""} ${isFood ? styles.food : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className={styles.gameOver}>Game Over! Your score: {score}</div>
      )}
      <div className={styles.score}>Score: {score}</div>
    </div>
  );
};

export default Snake;
