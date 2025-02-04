import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import FightRoom from "./pages/fightRoom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/fight" element={<FightRoom />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
