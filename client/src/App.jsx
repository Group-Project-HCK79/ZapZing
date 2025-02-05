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
    const time = new Date();

    // Mengambil jam dan menit
    const hours = time.getHours().toString().padStart(2, "0"); // Menambahkan leading zero jika kurang dari 10
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Menambahkan leading zero jika kurang dari 10

    const formattedTime = `${hours}:${minutes}`; // Format waktu
    socket.emit("messages:create", {
      message,
      username: localStorage.getItem("username"),
      image: localStorage.getItem("avatar"),
      time: formattedTime,
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
  // const chatClass = username === storedUsername ? "chat-end" : "chat-start";
  return (
    <>
      <div id="container">
        <div id="chat">
          {messages.map(({ text, username, time, image }) => {
            // Ambil username dari localStorage
            const storedUsername = localStorage.getItem("username");

            // Tentukan kelas berdasarkan perbandingan username
            const chatClass =
              username === storedUsername ? "chat-end" : "chat-start";

            return (
              <div className={`chat ${chatClass}`} key={username + text}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={image} />
                  </div>
                </div>
                <div className="chat-header">
                  {username}
                  <time className="text-xs opacity-50">-{time}</time>
                </div>
                <div className="chat-bubble">{text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
        </div>

        {/* form input chat */}
        <form action="" id="form" onSubmit={handleSubmit}>
          <div class="chat-input-container">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              class="chat-input"
              placeholder="Type your message..."
            />
            <button class="send-btn">Send</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
