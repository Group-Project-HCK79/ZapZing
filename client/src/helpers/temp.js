import { useEffect, useState, useRef } from "react";
import { ControlledHealthBar } from "../components/HealthBar";

const GRID_SIZE = 10;
const DAMAGE = 10;
const PUNCH_COOLDOWN = 500; // Cooldown time in milliseconds

const getRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

const generateInitialGrid = () => {
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({ canPass: true, slot: {} }))
  );

  const wallCount = 15;
  let wallsAdded = 0;

  while (wallsAdded < wallCount) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    const isStartingPosition =
      (x === 1 && y === 3) ||
      (x === 7 && y === 5) ||
      (x === 4 && y === 2) ||
      (x === 6 && y === 8);

    if (!isStartingPosition && grid[y][x].canPass) {
      grid[y][x].canPass = false;
      wallsAdded++;
    }
  }

  return grid;
};

class Player {
  constructor({ color, health, sprite, isAI }) {
    this.color = color;
    this.position = getRandomPosition();
    this.health = health;
    this.sprite = sprite;
    this.isAI = isAI;
    this.isAttacking = false;
    this.isHurt = false;
    this.isAlive = true;
    this.lastPunchTime = 0;
  }
}

export function GameFour() {
  const punchSoundRef = useRef(null);

  useEffect(() => {
    punchSoundRef.current = new Audio("/sounds/punch.mp3");
  }, []);

  const initialPlayers = [
    new Player({
      color: "red",
      health: 100,
      sprite: "/assets/redPlayer.png",
      isAI: false,
    }),
    new Player({
      color: "blue",
      health: 100,
      sprite: "/assets/bluePlayer.png",
      isAI: true,
    }),
    new Player({
      color: "green",
      health: 100,
      sprite: "/assets/greenPlayer.png",
      isAI: true,
    }),
    new Player({
      color: "yellow",
      health: 100,
      sprite: "/assets/yellowPlayer.png",
      isAI: true,
    }),
  ];

  const [grids, setGrids] = useState(generateInitialGrid());
  const playersRef = useRef(initialPlayers);
  const [, forceUpdate] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const keyPressed = useRef(null);
  const moveInterval = useRef(null);

  const handleKeyDown = (e) => {
    if (!gameStarted || gameOver) return;
    if (keyPressed.current) return;

    const redPlayer = playersRef.current[0];
    if (!redPlayer.isAlive) return;

    if (["w", "a", "s", "d"].includes(e.key)) {
      keyPressed.current = e.key;
      movePlayer(e.key, 0);
      moveInterval.current = setInterval(() => movePlayer(e.key, 0), 200);
    } else if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      punch(0, e.key);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === keyPressed.current) {
      clearInterval(moveInterval.current);
      keyPressed.current = null;
    }
  };

  const movePlayer = (key, playerIndex) => {
    const newPlayers = [...playersRef.current];
    const player = { ...newPlayers[playerIndex] };

    if (!player.isAlive) return;

    let newX = player.position.x;
    let newY = player.position.y;

    if (key === "w" && player.position.y > 0) newY -= 1;
    if (key === "a" && player.position.x > 0) newX -= 1;
    if (key === "s" && player.position.y < GRID_SIZE - 1) newY += 1;
    if (key === "d" && player.position.x < GRID_SIZE - 1) newX += 1;

    if (grids[newY][newX].canPass && !isCellOccupied(newX, newY, playerIndex)) {
      player.position = { x: newX, y: newY };
      player.isHurt = false;
      newPlayers[playerIndex] = player;
      playersRef.current = newPlayers;
      updateGrid();
    }
  };

  const isCellOccupied = (x, y, currentIndex) => {
    return playersRef.current.some(
      (player, index) =>
        index !== currentIndex &&
        player.isAlive &&
        player.position.x === x &&
        player.position.y === y
    );
  };

  const punch = (playerIndex, directionKey) => {
    const now = Date.now();
    const players = [...playersRef.current];
    const attacker = players[playerIndex];

    if (!attacker.isAlive || now - attacker.lastPunchTime < PUNCH_COOLDOWN)
      return;

    attacker.lastPunchTime = now;

    const { x, y } = attacker.position;
    let targetX = x;
    let targetY = y;
    let knockbackX = x;
    let knockbackY = y;

    if (directionKey === "ArrowUp" && y > 0) targetY -= 1;
    if (directionKey === "ArrowDown" && y < GRID_SIZE - 1) targetY += 1;
    if (directionKey === "ArrowLeft" && x > 0) targetX -= 1;
    if (directionKey === "ArrowRight" && x < GRID_SIZE - 1) targetX += 1;

    punchSoundRef.current.play(); // Play punch sound

    const targetIndex = players.findIndex(
      (p, idx) =>
        idx !== playerIndex &&
        p.isAlive &&
        p.position.x === targetX &&
        p.position.y === targetY
    );

    attacker.isAttacking =
      directionKey === "ArrowLeft" || directionKey === "ArrowDown" ? "L" : "R";
    forceUpdate((prev) => prev + 1);

    setTimeout(() => {
      attacker.isAttacking = false;
      forceUpdate((prev) => prev + 1);
    }, 200);

    if (targetIndex !== -1) {
      players[targetIndex].health -= DAMAGE;
      players[targetIndex].isHurt = true;

      knockbackX = targetX + (targetX - x);
      knockbackY = targetY + (targetY - y);

      if (
        knockbackX >= 0 &&
        knockbackX < GRID_SIZE &&
        knockbackY >= 0 &&
        knockbackY < GRID_SIZE &&
        grids[knockbackY][knockbackX].canPass &&
        !isCellOccupied(knockbackX, knockbackY, targetIndex)
      ) {
        players[targetIndex].position = { x: knockbackX, y: knockbackY };
      }

      setTimeout(() => {
        players[targetIndex].isHurt = false;
        forceUpdate((prev) => prev + 1);
      }, 200);

      if (players[targetIndex].health <= 0) {
        players[targetIndex].isAlive = false;
        checkForWinner();
      }
    }

    playersRef.current = players;
    updateGrid();
  };

  const checkForWinner = () => {
    const alivePlayers = playersRef.current.filter((player) => player.isAlive);
    if (alivePlayers.length === 1) {
      setWinner(alivePlayers[0].color);
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (!gameStarted) return;

    const aiIndexes = [1, 2, 3];
    const hardAiIndex = aiIndexes[Math.floor(Math.random() * aiIndexes.length)];

    const aiIntervals = playersRef.current
      .map((player, index) => {
        if (player.isAI) {
          return setInterval(() => {
            if (!player.isAlive || gameOver) return;

            if (index === hardAiIndex) {
              hardAiBehavior(index);
            } else {
              const shouldPunch = Math.random() < 0.3;
              if (shouldPunch) {
                aiPunch(index);
              } else {
                const directions = ["w", "a", "s", "d"];
                const randomDirection =
                  directions[Math.floor(Math.random() * directions.length)];
                movePlayer(randomDirection, index);
              }
            }
          }, 300);
        }
        return null;
      })
      .filter(Boolean);

    return () => aiIntervals.forEach(clearInterval);
  }, [gameStarted]);

  const hardAiBehavior = (aiIndex) => {
    const aiPlayer = playersRef.current[aiIndex];
    const targets = playersRef.current.filter(
      (p, idx) => idx !== aiIndex && p.isAlive
    );
    if (targets.length === 0) return;

    const nearestTarget = targets.reduce((closest, player) => {
      const distance =
        Math.abs(player.position.x - aiPlayer.position.x) +
        Math.abs(player.position.y - aiPlayer.position.y);
      const closestDistance =
        Math.abs(closest.position.x - aiPlayer.position.x) +
        Math.abs(closest.position.y - aiPlayer.position.y);
      return distance < closestDistance ? player : closest;
    }, targets[0]);

    const dx = nearestTarget.position.x - aiPlayer.position.x;
    const dy = nearestTarget.position.y - aiPlayer.position.y;

    if (Math.abs(dx) + Math.abs(dy) === 1) {
      if (dx === 1) punch(aiIndex, "ArrowRight");
      if (dx === -1) punch(aiIndex, "ArrowLeft");
      if (dy === 1) punch(aiIndex, "ArrowDown");
      if (dy === -1) punch(aiIndex, "ArrowUp");
    } else {
      if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx > 0) movePlayer("d", aiIndex);
        else movePlayer("a", aiIndex);
      } else {
        if (dy > 0) movePlayer("s", aiIndex);
        else movePlayer("w", aiIndex);
      }
    }
  };

  const aiPunch = (aiIndex) => {
    const aiPlayer = playersRef.current[aiIndex];
    const adjacentPlayers = getAdjacentPlayers(aiPlayer, aiIndex);

    if (adjacentPlayers.length > 0) {
      const target =
        adjacentPlayers[Math.floor(Math.random() * adjacentPlayers.length)];
      punch(aiIndex, target.directionKey);
    }
  };

  const getAdjacentPlayers = (aiPlayer, aiIndex) => {
    const { x, y } = aiPlayer.position;
    const directions = [
      { dx: 0, dy: -1, directionKey: "ArrowUp" },
      { dx: 0, dy: 1, directionKey: "ArrowDown" },
      { dx: -1, dy: 0, directionKey: "ArrowLeft" },
      { dx: 1, dy: 0, directionKey: "ArrowRight" },
    ];

    return directions
      .map(({ dx, dy, directionKey }) => {
        const adjacentX = x + dx;
        const adjacentY = y + dy;
        const target = playersRef.current.find(
          (p, idx) =>
            idx !== aiIndex &&
            p.isAlive &&
            p.position.x === adjacentX &&
            p.position.y === adjacentY
        );
        return target ? { ...target, directionKey } : null;
      })
      .filter(Boolean);
  };

  const updateGrid = () => {
    const newGrid = grids.map((row) =>
      row.map((cell) => ({ ...cell, slot: {} }))
    );

    playersRef.current.forEach((player) => {
      if (player.isAlive) {
        newGrid[player.position.y][player.position.x].slot = player;
      }
    });

    setGrids(newGrid);
    forceUpdate((prev) => prev + 1);
  };

  const DrawGrids = () => {
    return (
      <div className="flex flex-wrap w-[400px] h-[400px] bg-white">
        {grids.map((row, y) =>
          row.map((grid, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-10 h-10 relative flex justify-center items-center ${!grid.canPass ? "bg-gray-700" : ""
                }`}
            >
              {grid.slot && (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={
                      grid.slot.isHurt
                        ? `/assets/${grid.slot.color}Hurt.png`
                        : grid.slot.isAttacking
                          ? `/assets/${grid.slot.color}Punch${grid.slot.isAttacking}.png`
                          : grid.slot.sprite
                    }
                    alt=""
                    className=""
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  const PlayerHealth = () => {
    return (
      <div className="mb-4">
        {playersRef.current.map((player) => (
          <ControlledHealthBar
            key={player.color}
            hp={player.health}
            maxHp={100}
            color={player.color}
          />
        ))}
      </div>
    );
  };

  const startGame = () => {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
      if (countdown === 0) {
        clearInterval(countdownInterval);
        setGameStarted(true);
      } else {
        setWinner(countdown);
        countdown--;
      }
    }, 1000);
  };

  const restartGame = () => {
    setGrids(generateInitialGrid());
    playersRef.current = initialPlayers.map((player) => new Player(player));
    setGameStarted(false);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-[#374254] relative"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <PlayerHealth />
      <DrawGrids />
      <p className="mt-4 text-gray-500">
        Use WASD to move the red player. Use Arrow Keys to punch. One AI will
        aggressively rush the nearest player!
      </p>

      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center text-white text-4xl">
          {typeof winner === "number" ? (
            `${winner}...`
          ) : (
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
            >
              Start Game
            </button>
          )}
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white text-4xl">
          <div className="mb-4">{winner} wins!</div>
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-green-500 rounded-lg shadow-lg hover:bg-green-600"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
