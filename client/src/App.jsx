import { BrowserRouter, Routes, Route } from "react-router";
import { ChatPage } from "../pages/ChatPage";
import { GamePage } from "../pages/GamePage";
import { GamePage2 } from "../pages/GamePage2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game2" element={<GamePage2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
