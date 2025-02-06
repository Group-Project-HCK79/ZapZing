import { useEffect, useState } from "react";

export function PlayerCard({ team, socket, avatar, username }) {
  const [isRedChecked, setIsRedChecked] = useState(false);
  const [isBlueChecked, setIsBlueChecked] = useState(false);
  const [forbidCheckRed, setForbidCheckRed] = useState(false);
  const [forbidCheckBlue, setForbidCheckBlue] = useState(false);

  const checkHandler = () => {
    console.log(!forbidCheckRed, !isBlueChecked);

    if (team === "red" && !forbidCheckRed) {
      socket.emit("ready:toggle:red", !isRedChecked);
    } else if (team === "blue" && !forbidCheckBlue) {
      socket.emit("ready:toggle:blue", !isBlueChecked);
    }
  };

  useEffect(() => {
    socket.on("ready:toggle:red:save", (resRedChecked) => {
      if (resRedChecked) {
        localStorage.setItem("team", "red");
        setForbidCheckBlue(true);
      } else {
        localStorage.removeItem("team");
        setForbidCheckBlue(false);
      }
    });
    socket.on("ready:toggle:red:update", (resRedChecked) => {
      setIsRedChecked(resRedChecked);
    });
    socket.on("ready:toggle:red:forbid", (resRedChecked) => {
      console.log("Forbid", resRedChecked);
      setForbidCheckRed(resRedChecked);
    });

    socket.on("ready:toggle:blue:save", (resBlueChecked) => {
      if (resBlueChecked) {
        localStorage.setItem("team", "blue");
        setForbidCheckRed(true);
      } else {
        localStorage.removeItem("team");
        setForbidCheckRed(false);
      }
    });
    socket.on("ready:toggle:blue:update", (resBlueChecked) => {
      setIsBlueChecked(resBlueChecked);
    });
    socket.on("ready:toggle:blue:forbid", (resBlueChecked) => {
      console.log("Forbid", resBlueChecked);
      setForbidCheckBlue(resBlueChecked);
    });
  }, []);

  return (
    <>
      <div className="card card-compact bg-base-100 w-fit shadow-xl ">
        <figure>
          <img
            className="rounded-full h-80 w-80"
            src={avatar}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Join as {team}</h2>
          <p>{username}</p>
          <div className="card-actions justify-end">
            <label>Ready</label>
            <input
              type="checkbox"
              checked={team === "red" ? isRedChecked : isBlueChecked}
              onChange={checkHandler}
              className="checkbox checkbox-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}
