import ChatPage from "./pages/ChatPage";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Login from "./pages/Login";

export const SocketContext = createContext({ socket: null });

export default function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        <Login />
      </SocketContext.Provider>
    </>
  );
}
