import { Link, useNavigate } from "react-router";
import logo from "../assets/ZapZing.png";
import { io } from "socket.io-client";

export default function Navbar() {
  const socket = io("http://localhost:3000");
  const navigate = useNavigate();
  function handleLogOut(e) 
  {
    e.preventDefault();
    socket.emit("logoutHandle",localStorage.getItem("username") )
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="w-full bg-blue-400 border-gray-200 dark:bg-gray-900 sticky top-0 h-fit z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center py-2 justify-between mx-auto ">
          <img src={logo} className="h-12" alt="ZapZing Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <b> ZapZing</b>
          </span>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <button
              className="btn bg-red-500 text-black hover:text-white "
              onClick={handleLogOut}
            >
              Log Out
            </button>
            {/* <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8">
             
              <li>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
