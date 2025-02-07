import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import { ControlledHealthBar } from "../components/HealthBar";

const socket = io("http://server.danizrafidz.my.id");
const arrays = Array.from({ length: 10 }, (_, i) => i);

export function Game() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const team = localStorage.getItem("team");
  const opponentTeam = team === "red" ? "blue" : "red";
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState({
    red: {
      position: 2,
      health: 100,
      sprite: "/assets/redPlayer.png",
      canPunch: true,
      isDead: false,
      power: 5,
    },
    blue: {
      position: 7,
      health: 100,
      sprite: "/assets/bluePlayer.png",
      canPunch: true,
      isDead: false,
      power: 5,
    },
  });

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  function handleRestart() {
    setPlayers({
      red: { ...players.red, position: 2, health: 100, isDead: false },
      blue: { ...players.blue, position: 7, health: 100, isDead: false },
    });
  }

  useEffect(() => {
    function handleKeyDown(e) {
      setPlayers((prev) => {
        if (prev.red.isDead || prev.blue.isDead) return prev;

        let newPlayers = { red: { ...prev.red }, blue: { ...prev.blue } };

        const resetAction = (time) => {
          setTimeout(() => {
            setPlayers((prev) => {
              let resetPlayers = {
                red: {
                  ...prev.red,
                  sprite: "/assets/redPlayer.png",
                  canPunch: true,
                },
                blue: {
                  ...prev.blue,
                  sprite: "/assets/bluePlayer.png",
                  canPunch: true,
                },
              };
              socket.emit("action:punch:reset", resetPlayers);
              return resetPlayers;
            });
          }, time);
        };

        if (e.key === "a") {
          newPlayers[team].position = Math.max(
            0,
            newPlayers[team].position - 1
          );
          newPlayers[team].sprite = `/assets/${team}MoveL.png`;
          socket.emit("action:move:left", newPlayers);
          resetAction(200);
        }

        if (e.key === "d") {
          newPlayers[team].position = Math.min(
            arrays.length - 1,
            newPlayers[team].position + 1
          );
          newPlayers[team].sprite = `/assets/${team}MoveR.png`;
          socket.emit("action:move:right", newPlayers);
          resetAction(200);
        }

        if ((e.key === "k" || e.key === "l") && newPlayers[team].canPunch) {
          newPlayers[team].sprite =
            e.key === "k"
              ? `/assets/${team}PunchL.png`
              : `/assets/${team}PunchR.png`;
          newPlayers[team].canPunch = false;

          if (
            (e.key === "k" &&
              newPlayers[team].position ===
                newPlayers[opponentTeam].position + 1) ||
            (e.key === "l" &&
              newPlayers[team].position ===
                newPlayers[opponentTeam].position - 1)
          ) {
            newPlayers[opponentTeam].sprite =
              e.key === "k"
                ? `/assets/${opponentTeam}Hurt.png`
                : `/assets/${opponentTeam}Hurt.png`;
            newPlayers[opponentTeam].health = Math.max(
              0,
              newPlayers[opponentTeam].health - newPlayers[team].power
            );
            if (newPlayers[opponentTeam].health === 0) {
              newPlayers[opponentTeam].isDead = true;
            }
          }

          socket.emit("action:punch", newPlayers);
          resetAction(500);
        }

        return newPlayers;
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading]);

  useEffect(() => {
    socket.on("action:update", (updatedPlayers) => {
      setPlayers(updatedPlayers); // Ensure React re-renders
    });

    return () => {
      socket.off("action:update");
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-3xl">
        Loading Game...
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[url(/assets/arenaBg2.jpg)]">
      <div className="text-white text-3xl font-bold mb-10">ZapZing</div>
      <div className="border-5 flex flex-col justify-between h-100 bg-[url(/assets/arenaBg1.jpg)]">
        <div id="stats" className="flex justify-between px-4">
          <div className="flex flex-col">
            <p className="font-bold text-red-400 self-end">Red</p>
            <ControlledHealthBar
              hp={players.red.health}
              maxHp={100}
              color="red"
            />
          </div>
          <div>
            {players[team].isDead || players[opponentTeam].isDead ? (
              <p
                className={`font-bold text-3xl mt-40 text-${
                  players[team].isDead ? opponentTeam : team
                }-400`}
              >
                {players[team].isDead ? opponentTeam : team} wins
              </p>
            ) : (
              <div>
                <img
                  src="/assets/redVsBlue.png"
                  className="w-20 h-20"
                  alt="Fight"
                />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-blue-400">Blue</p>
            <ControlledHealthBar
              hp={players.blue.health}
              maxHp={100}
              color="blue"
            />
          </div>
        </div>
        <div className="flex">
          {arrays.map((_, position) => (
            <div key={position} className="w-20 h-20 border-b">
              {players.red.position === position && (
                <img
                  className="absolute"
                  src={players.red.sprite}
                  alt="Red Player"
                />
              )}
              {players.blue.position === position && (
                <img
                  className="absolute"
                  src={players.blue.sprite}
                  alt="Blue Player"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 text-black rounded-2xl p-2 cursor-pointer mt-10"
      >
        Back to lobby?
      </button>
      <button
        onClick={handleRestart}
        className="bg-red-300 text-black rounded-2xl p-2 cursor-pointer mt-3"
      >
        Restart
      </button>
    </div>
  );
}
