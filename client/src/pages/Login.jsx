import { useState } from "react";
import { useNavigate, Link, data } from "react-router";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  console.log(username);
  console.log(avatar);

  function handleLogin(e) {
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
      localStorage.setItem("username", username);
      localStorage.setItem("avatar", avatar);
      navigate("/");
    } catch (err) {
      console.log(err.name);
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
        <div className="flex flex-col items-center justify-center w-full max-w-2xl p-10 space-y-6 bg-emerald-100 bg-opacity-75 rounded-lg shadow-lg">
          {/* Component: Card with form */}
          <form
            onSubmit={handleLogin}
            className="overflow-hidden bg-white rounded-lg shadow-lg text-slate-500 shadow-slate-200 w-full max-w-2xl"
          >
            {/* Body */}
            <div className="p-8">
              <header className="mb-6 text-center">
                <h3 className="text-2xl font-medium text-slate-700">Login</h3>
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
                    className="peer relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none border-slate-200 text-slate-500 invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                    Username
                  </label>
                  <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                    <span>Use your preferred username</span>
                  </small>
                </div>
              </div>
            </div>
            {/* Action base sized basic button */}
            <div className="flex justify-end p-6 bg-slate-50">
              <input
                type="submit"
                value="Login"
                className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
              />
            </div>
          </form>
          {/* End Card with form */}
          {/* Component: Rounded full base sized basic grouped avatars */}
          <div className="flex flex-col items-center justify-center w-full p-10 space-y-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Choose Your Avatar!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Feel free to choose one to your liking by clicking on an image
            </p>
            <div className="flex -space-x-4">
              <a
                onClick={() => setAvatar("https://robohash.org/sdagedf")}
                href="#"
                aria-label="Avatar 1"
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg"
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
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg"
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
                className="relative inline-flex items-center justify-center w-32 h-32 text-lg text-white rounded-full bg-gray-200 shadow-lg"
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
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg"
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
                className="relative inline-flex items-center justify-center w-32 h-32 text-white rounded-full bg-gray-200 shadow-lg"
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
        </div>
      </div>
    </>
  );
}
