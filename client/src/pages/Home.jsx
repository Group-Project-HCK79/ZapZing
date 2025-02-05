import { Link } from "react-router";
import ChatPage from "../components/Chat";
import { useState } from "react";

export default function Home() {
  // const [team,setTeam] =useState('')
  // setTeam(localStorage.getItem('avatar'))
  // console.log(team, "SSSSSS");
  // console.log(setTeam,"aaaaa");
  
  
  return (
    <div className="flex h-screen pt-16">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-white p-4 relative">
        {/* Join Room Container */} 
        {/* <div>
          <img src={team} alt="team" />
        </div> */}
        <div className="bg-teal-300 p-6 rounded-2xl shadow-lg text-center w-90">
          <h2 className="text-2xl font-bold mb-6">Game Room</h2>
          <button className="bg-blue-500 text-white px-6 py-3 text-xl rounded-full shadow-md hover:bg-blue-600 transition">
            <Link to={'/room'}> Play</Link>
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