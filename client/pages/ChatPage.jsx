// npm i socket.io-client
import "../styles/ChatPage.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("andrea");

  // fetch data pake axios

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ message }, "<<< msg");
    // SOCKET I. kirim events
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
            className={username === localStorage.getItem("username") ? "bg-blue-300" : "bg-red-300"}
            style={{
              textAlign: username === "Beta" ? "right" : "left",
            }}
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
    </div>
  );
}
