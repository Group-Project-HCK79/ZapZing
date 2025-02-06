import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChatPage from "../components/Chat";
import { PlayerCard } from "../components/PlayerCard";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Home() {
  const navigate = useNavigate();
  const [isRedReady, setIsRedReady] = useState(false);
  const [isBlueReady, setIsBlueReady] = useState(false);
  const [avatarRed, setAvatarRed] = useState("");
  const [avatarBlue, setAvatarBlue] = useState("");
  const [usernameRed, setUsernameRed] = useState("");
  const [usernameBlue, setUsernameBlue] = useState("");

  useEffect(() => {
    // socket.on("messages:response", (serverMessages) => {
    //   setMessages(serverMessages);
    // });
    
    // socket.on("login:failed", (message) => {
    //   Swal.fire({
    //     icon: "error",
    //     text: message,
    //   });
    // })
    socket.on("loginUser", (users) => {
      // localStorage.setItem('username', user1.username)
      console.log(users);
      socket.emit("populate:game:users", users)
      
      // localStorage.setItem('avatar', user1.avatar)
      
      // console.log("Current players:", user1, user2);
    });
    socket.on("ready:toggle:red:update", setIsRedReady);
    socket.on("ready:toggle:blue:update", setIsBlueReady);
    // socket.emit("player", )

    socket.on("populate:game:users:update", (gameUsers) => {
      console.log(gameUsers, "<<< RESPONSE DARI SERVER");
      
      setAvatarRed(gameUsers[0].avatar)
      setUsernameRed(gameUsers[0].username)
      if (gameUsers.length > 1) {
        setAvatarBlue(gameUsers[1].avatar)
        setUsernameBlue(gameUsers[1].username)
      }
    });

    socket.on("game:start", () => {
      navigate("/game");
    });

    return () => {
      socket.off("ready:toggle:red:update", setIsRedReady);
      socket.off("ready:toggle:blue:update", setIsBlueReady);
      socket.off("game:start");
    };
  }, []);

  const handlePlayClick = () => {
    socket.emit("game:start");
  };

  return (
    <div className="flex-grow">
      <div className="flex h-[90vh]">
        {/* Main Content */}
        <div className="flex-grow flex flex-col bg-[url(/src/assets/meledak.jpg)] bg-cover bg-no-repeat justify-center items-center">
          <div className="flex justify-between items-center gap-10">
            <PlayerCard team="red" socket={socket} avatar={avatarRed} username={usernameRed} />
            <div className="flex-none px-5 align-center">
              <img src="/src/assets/vs.png" className="w-40 ml-4" alt="fight" />
              <div className="p-6 rounded-2xl shadow-lg bg-black text-center">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Join Room
                </h2>
                <button
                  onClick={handlePlayClick}
                  disabled={!(isRedReady && isBlueReady)} // Disable unless both are ready
                  className={`px-6 py-3 text-xl rounded-full shadow-md transition ${
                    isRedReady && isBlueReady
                      ? "bg-red-500 hover:bg-blue-600 text-white"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  Play
                </button>
              </div>
            </div>
            <PlayerCard
              team="blue"
              avatar={avatarBlue}
              username={usernameBlue}
              socket={socket}
            />
          </div>
        </div>

        {/* Sidebar Chat */}
        <div className="w-80 bg-teal-100 shadow-lg border-l">
          <ChatPage />
        </div>
      </div>
    </div>
  );
}
