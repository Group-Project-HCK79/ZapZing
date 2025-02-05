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
    <>
      <nav className="w-full bg-blue-400 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={logo} className="h-10" alt="ZapZing Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
           <b> ZapZing</b>
          </span>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8">
             
              <li>
                <button className="btn bg-blue-800" onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
