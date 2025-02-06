import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { SocketContext } from "../App";

// const socket = io("http://localhost:3000");

export default function ChatPage() {
  const { socket } = useContext(SocketContext);
  console.log(socket);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("masuk handleSubmit");
    if (!message.trim()) return;
    const time = new Date();
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("masuk handleSubmit");

    socket.emit("messages:create", {
      message,
      username: localStorage.getItem("username"),
      image: localStorage.getItem("avatar"),
      time: formattedTime,
    });

    setMessage("");
  };

  useEffect(() => {
    socket?.on("messages:response", (serverMessages) => {
      setMessages(serverMessages);
    });

    socket?.emit("messages:fetch", (serverMessages) => {
      setMessages(serverMessages);
    });
  }, [socket]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-auto p-4 bg-blue-200">
        {messages.map(({ text, username, time, image }) => {
          const storedUsername = localStorage.getItem("username");
          const chatClass =
            username === storedUsername
              ? "chat-end text-black"
              : "chat-start text-black";

          return (
            <div className={`chat ${chatClass}`} key={username + text}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-gray-200">
                  <img alt="User Avatar" src={image} />
                </div>
              </div>
              <div className="chat-header">
                {username}
                <time className="text-xs opacity-50">-{time}</time>
              </div>
              <div className="chat-bubble text-white">{text}</div>
              <div className="chat-footer opacity-50 text-black">Delivered</div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <form
        id="form"
        onSubmit={handleSubmit}
        className="p-2 bg-gray-200 border-t rounded-xl"
      >
        <div className="flex bg-white p-2 rounded">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="flex-grow p-2 border rounded text-black"
            placeholder="Type your message..."
          />
          <button className="send-btn p-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
