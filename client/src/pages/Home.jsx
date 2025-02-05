import ChatPage from "../components/Chat";

export default function Home() {
 




  return<>
  <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-grow bg-white p-4">
        <h1 className="text-2xl font-bold">Welcome to Home</h1>
        <p>Main content goes here...</p>
      </div>

      {/* Sidebar Chat */}
      <div className="w-80 bg-gray-100 shadow-lg border-l">
        <ChatPage />
      </div>
    </div>
  </>
}
