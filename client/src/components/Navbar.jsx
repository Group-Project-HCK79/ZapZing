import { Link, useNavigate } from "react-router";
import logo from "../assets/ZapZing.png";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogOut(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }
  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg h-16 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto h-full px-4">
        <div className="flex items-center gap-4">
          <img src={logo} className="h-10 hover:scale-105 transition-transform" alt="ZapZing Logo" />
          <span className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
            <a className="no-underline"> ZapZing</a>
          </span>
        </div>
        
        <div className="md:block" id="navbar-default">
          <button 
            onClick={handleLogOut}
            className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold
                     hover:bg-blue-50 transition-colors duration-200
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
