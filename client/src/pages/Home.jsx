import ChatPage from "../components/Chat";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-white p-4 relative">
        {/* Join Room Container */}
        <div className="bg-teal-300 p-6 rounded-2xl shadow-lg text-center w-96">
          <h2 className="text-2xl font-bold mb-6">Join Room</h2>
          <button className="bg-blue-500 text-white px-6 py-3 text-xl rounded-full shadow-md hover:bg-blue-600 transition">
            Play
          </button>
        </div>
      </div>

      {/* Sidebar Chat */}
      <div className="w-80 bg-teal-100 shadow-lg border-l">
        <ChatPage />
      </div>
    </div>
  );
}