import { useNavigate } from "react-router";
import ChatPage from "../components/Chat";
import Navbar from "../components/Navbar";
import { PlayerCard } from "../components/PlayerCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-grow">
      {/* <Navbar /> */}
      <div className="flex h-[90vh] ">
        {/* Main Content */}
        <div className="flex-grow flex flex-col  bg-[url(/src/assets/meledak.jpg)]   bg-cover bg-no-repeat justify-center items-center">
          <div className="flex justify-between items-center gap-10 ">
            <PlayerCard team="Red" />
            <div className="flex-none px-5 align-center">
              <img src="/src/assets/vs.png" className="w-40 ml-4" alt="fight" />
              <div className="p-6 rounded-2xl shadow-lg bg-black text-center ">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Join Room
                </h2>
                <button
                  onClick={() => navigate("/game")}
                  className="bg-red-500 text-white px-6 py-3 text-xl rounded-full shadow-md hover:bg-blue-600 transition"
                >
                  Play
                </button>
              </div>
            </div>
            <PlayerCard team="Blue" />
          </div>
          {/* Join Room Container */}
        </div>

        {/* Sidebar Chat */}
        <div className="w-80 bg-teal-100 shadow-lg border-l">
          <ChatPage />
        </div>
      </div>
    </div>
  );
}
