import ChatPage from "./components/Chat";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./pages/AuthLayout.jsx";
import NoAuthLayout from "./pages/NoAuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { StrictMode } from "react";
import { Game } from "./pages/Game.jsx";
import GameLayout from "./pages/AuthLayout copy.jsx";
export const SocketContext = createContext({ socket: null });

export default function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let newSocket = io("http://localhost:3000");
    console.log(newSocket);

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        <BrowserRouter>
          <Routes>
            <Route element={<NoAuthLayout />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<GameLayout />}>
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
}
