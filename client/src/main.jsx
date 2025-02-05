// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./pages/AuthLayout.jsx";
import NoAuthLayout from "./pages/NoAuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { StrictMode } from "react";
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<NoAuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
   </StrictMode>,

  
);
