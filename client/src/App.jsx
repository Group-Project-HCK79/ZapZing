// npm i socket.io-client
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [username, setUsername] = useState("andrea");

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
    <>
      <ul id="messages">
        {messages.map(({ text, username }, i) => (
          <li
            key={i}
            style={{
              textAlign:
                username === localStorage.getItem("username")
                  ? "right"
                  : "left",
            }}
          >
            {text}
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
    </>
  );
}

export default App;
