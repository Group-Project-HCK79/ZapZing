import { useContext, useState } from "react";
import { useNavigate, Link, data } from "react-router";
// import { SocketContext } from "../App";
import Swal from "sweetalert2";
import { io } from "socket.io-client";

export default function Login() {
  // const socketContext = useContext(SocketContext);
  // const socket = socketContext?.socket;
  const socket = io("http://localhost:3000");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  console.log(username);
  console.log(avatar);

  function handleLogin(e) {
    e.preventDefault();
    try {
      e.preventDefault();
      if (!username || !avatar) {
        throw { name: "Authentication" };
      }
      //   if (!avatar) {
      //     Swal.fire({
      //       icon: "error",
      //       text: "Please choose your avatar",
      //     });
      //   }
      socket.emit("login:user", {
        username,
        avatar,
      });
      localStorage.setItem("username", username);
      localStorage.setItem("avatar", avatar);
      navigate("/");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: "Please fill username and avatar",
      });
    }
  }
  return (
    <>
      {/* <form onSubmit={handleLogin}>
        <p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="input your username..."
          />
        </p>
        <p>
          <input
            onChange={(e) => setAvatar(e.target.value)}
            type="text"
            placeholder="input your avatar..."
          />
        </p>
        <p>
          <input type="submit" value="Login" />
        </p>
      </form> */}

      <div className="bg-grey flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl p-10 space-y-6 bg-sky-400 bg-opacity-75 rounded-lg shadow-lg">
          {/* Component: Rounded full base sized basic grouped avatars */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center w-full p-10 space-y-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Choose Your Avatar!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Feel free to choose one to your liking by clicking on an image
            </p>
            <div className="flex -space-x-4">
              <a
                onClick={() => setAvatar("https://robohash.org/sdagedf")}
                href="#"
                aria-label="Avatar 1"
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg focus:bg-red-500 focus:border-red-500"
              >
                <img
                  src="https://robohash.org/sdagedf"
                  alt="Avatar 1"
                  title="Avatar 1"
                  width={128}
                  height={128}
                  className="max-w-full border-4 border-white rounded-full"
                />
              </a>
              <a
                onClick={() => setAvatar("https://robohash.org/Xsghdf")}
                href="#"
                aria-label="Avatar 2"
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg focus:bg-green-500 focus:border-green-500"
              >
                <img
                  src="https://robohash.org/Xsghdf"
                  alt="Avatar 2"
                  title="Avatar 2"
                  width={128}
                  height={128}
                  className="max-w-full border-4 border-white rounded-full"
                />
              </a>
              <a
                onClick={() => setAvatar("https://robohash.org/rhXwh")}
                href="#"
                aria-label="Avatar 3"
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg focus:bg-amber-950 focus:border-amber-950"
              >
                <img
                  src="https://robohash.org/rhXwh"
                  alt="Avatar 3"
                  title="Avatar 3"
                  width={128}
                  height={128}
                  className="max-w-full border-4 border-white rounded-full"
                />
              </a>
              <a
                onClick={() => setAvatar("https://robohash.org/13ErtqE")}
                href="#"
                aria-label="Avatar 4"
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg focus:bg-orange-400 focus:border-orange-400"
              >
                <img
                  src="https://robohash.org/13ErtqE"
                  alt="Avatar 4"
                  title="Avatar 4"
                  width={128}
                  height={128}
                  className="max-w-full border-4 border-white rounded-full"
                />
              </a>
              <a
                onClick={() => setAvatar("https://robohash.org/12fEESNgw")}
                href="#"
                aria-label="Avatar 5"
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg focus:bg-fuchsia-700 focus:border-fuchsia-700"
              >
                <img
                  src="https://robohash.org/12fEESNgw"
                  alt="Avatar 5"
                  title="Avatar 5"
                  width={128}
                  height={128}
                  className="max-w-full border-4 border-white rounded-full"
                />
              </a>
            </div>
          </div>
          {/* End Rounded full base sized basic grouped avatars */}

          {/* Component: Card with form */}
          <form
            onSubmit={handleLogin}
            className="overflow-hidden bg-slate-50 rounded-lg text-slate-500 w-full max-w-2xl"
          >
            {/* Body */}
            <div className="p-8">
              <header className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Input Your Username!</h2>
              </header>
              <div className="flex flex-col space-y-6">
                {/* Input field */}
                <div className="relative">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="bg-white peer relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none border-slate-200 text-slate-500 invalid:border-sky-500 invalid:text-sky-500 focus:border-sky-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-invalid:text-sky-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-sky-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                    Username
                  </label>
                  <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-sky-500">
                    <span>Use your preferred username</span>
                  </small>
                </div>
              </div>
            </div>

            {/* Action base sized basic button */}
            <div className="flex justify-end p-6">
              <button
                type="submit"
                value="Login"
                className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-sky-500 hover:bg-sky-600 active:bg-sky-700 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none"
              >Let's Go!</button>
            </div>
          </form>
          {/* End Card with form */}


        </div>
      </div>
    </>
  );
}
