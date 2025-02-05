
import ChatPage from "./pages/ChatPage";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({ socket: null });

export default function App() {
  const [socket, setSocket] = useState();
  useEffect(() => {
    let socket = io("http://localhost:3000");
    setSocket(socket)
  }, []);
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        <ChatPage />
      </SocketContext.Provider>
    </>
  );
