// npm i socket.io-client
import "../styles/ChatPage.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

class Player {
  constructor(username, team) {
    this.username = username;
    this.team = team;
    this.health = 10;
    this.power = 3;
  }
}

let bluePlayer = new Player("Beta", "blue");
let redPlayer = new Player("Alpha", "red");

export function GamePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [blueHealth, setBlueHealth] = useState(bluePlayer.health);
  const [redHealth, setRedHealth] = useState(redPlayer.health);
  // const [username, setUsername] = useState("andrea");

  // fetch data pake axios

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ message }, "<<< msg");
    // SOCKET I. kirim events

    if (message === "attack") {
      if (bluePlayer.username === localStorage.getItem("username")) {
        setRedHealth(redHealth - 3);
      } else if (redPlayer.username === localStorage.getItem("username")) {
        setBlueHealth(blueHealth - 3);
      }
    }

    socket.emit("messages:create", {
      message,
      username: localStorage.getItem("username"),
      // username: username,
    });

    setMessage("");
  };

  useEffect(() => {
    socket.on("messages:response", (serverMessages) => {
      setMessages(serverMessages);
    });

    // HISTORY I. ack
    socket.emit("messages:fetch", (serverMessages) => {
      // HISTORY IV. terima messages
      setMessages(serverMessages);
    });
  }, []);

  return (
    <div id="chatbox">
      <ul id="messages">
        {messages.map(({ text, username }, i) => (
          <li
            key={i}
            className={`${
              username === localStorage.getItem("username")
                ? "bg-blue-300 text-right"
                : "bg-red-300 text-left"
            }`}
          >
            {`${text} - ${username}`}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} id="form" action="">
        <input
          id="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // autocomplete="off"
        />
        <button>Send</button>
      </form>
      <div id="stats" className="flex justify-between">
        <p className="font-bold text-red-400">Health : {redHealth}</p>
        <p className="font-bold text-blue-400">{blueHealth} : Health</p>
      </div>
    </div>
  );
}
