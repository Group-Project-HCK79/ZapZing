import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const arrays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function GamePage2() {
  const [players, setPlayers] = useState({
    red: {
      position: 2,
      health: 10,
      sprite: "/src/assets/redPlayer.png",
    },
    blue: {
      position: 7,
      health: 10,
      sprite: "/src/assets/bluePlayer.png",
    },
  });
  const [canPunch, setCanPunch] = useState(true);
  const [isGame, setIsGame] = useState(false);
  const team = localStorage.getItem("team");
  const opponentTeam = team === "red" ? "blue" : "red";

  useEffect(() => {
    function handleKeyDown(e) {
      setPlayers((prev) => {
        let newPlayers = {
          red: { ...prev.red },
          blue: { ...prev.blue },
        };

        if (e.key === "a") {
          newPlayers[team].position = Math.max(
            0,
            newPlayers[team].position - 1
          );
          console.log(players[team].position, "<<< BERUBAH");

          socket.emit("action:move:left", newPlayers);
        }

        if (e.key === "d") {
          newPlayers[team].position = Math.min(
            arrays.length - 1,
            newPlayers[team].position + 1
          );
          console.log(players[team].position, "<<< BERUBAH");
          socket.emit("action:move:right", newPlayers);
        }

        if (e.key === "k" && canPunch) {
          if (
            newPlayers[team].health <= 0 ||
            newPlayers[opponentTeam].health <= 0
          ) {
            setIsGame(true);
          } else {
            newPlayers[team].sprite = `/src/assets/${team}PunchL.png`;
            setCanPunch(false);

            if (
              newPlayers[team].position >=
                newPlayers[opponentTeam].position - 1 &&
              newPlayers[team].position <= newPlayers[opponentTeam].position + 1
            ) {
              newPlayers[
                opponentTeam
              ].sprite = `/src/assets/${opponentTeam}Hurt.png`;
              newPlayers[opponentTeam].health -= 1;
            }

            setTimeout(() => {
              setPlayers((prev) => {
                let resetPlayers = {
                  red: { ...prev.red },
                  blue: { ...prev.blue },
                };
                resetPlayers[team].sprite = `/src/assets/${team}Player.png`;
                resetPlayers[
                  opponentTeam
                ].sprite = `/src/assets/${opponentTeam}Player.png`;
                return resetPlayers;
              });
            }, 300);

            setTimeout(() => {
              setCanPunch(true);
            }, 500);
          }
        }
        return newPlayers;
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    socket.on("action:move:left:response", (serverPlayers) => {
      setPlayers(serverPlayers);
    });

    socket.on("action:move:right:response", (serverPlayers) => {
      setPlayers(serverPlayers);
    });

    // if (e.key === "k" && canPunch) {
    //   newPlayers[team].sprite = `/src/assets/${team}PunchL.png`;
    //   setCanPunch(false);

    //   if (
    //     newPlayers[team].position >= newPlayers[opponentTeam].position - 1 &&
    //     newPlayers[team].position <= newPlayers[opponentTeam].position + 1
    //   ) {
    //     newPlayers[
    //       opponentTeam
    //     ].sprite = `/src/assets/${opponentTeam}Hurt.png`;
    //     if (newPlayers[opponentTeam].health <= 0) {
    //       setIsGame(true);
    //     } else {
    //       newPlayers[opponentTeam].health -= 1;
    //     }
    //   }

    //   setTimeout(() => {
    //     setPlayers((prev) => {
    //       let resetPlayers = {
    //         red: { ...prev.red },
    //         blue: { ...prev.blue },
    //       };
    //       resetPlayers[team].sprite = `/src/assets/${team}Player.png`;
    //       resetPlayers[
    //         opponentTeam
    //       ].sprite = `/src/assets/${opponentTeam}Player.png`;
    //       return resetPlayers;
    //     });
    //   }, 300);

    //   setTimeout(() => {
    //     setCanPunch(true);
    //   }, 500);
    // }
  }, []);

  return (
    <div>
      <div className="flex py-10">
        {arrays.map(function (el, position) {
          if (position === players.red.position) {
            return (
              <div key={position} className=" w-20 h-20 border-b">
                <img src={players.red.sprite} alt="Red Player" />
              </div>
            );
          } else if (position === players.blue.position) {
            return (
              <div key={position} className=" w-20 h-20 border-b">
                <img src={players.blue.sprite} alt="Blue Player" />
              </div>
            );
          } else {
            return <div key={position} className=" w-20 h-20 border-b"></div>;
          }
        })}
      </div>
      <div id="stats" className="flex justify-between px-4">
        <p className="font-bold text-red-400">
          Red Health : {players.red.health}
        </p>
        {isGame ? (
          players[opponentTeam].health <= 0 ? (
            <p className={`font-bold text-${team}-400`}>{team} wins</p>
          ) : (
            <p className={`font-bold text-${opponentTeam}-400`}>
              {opponentTeam} wins
            </p>
          )
        ) : (
          <p className="font-bold text-black"></p>
        )}
        <p className="font-bold text-blue-400">
          {players.blue.health} : Blue Health
        </p>
      </div>
    </div>
  );
}
