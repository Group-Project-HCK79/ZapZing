import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  const isAuth = localStorage.username;

  if (isAuth) {
    return (
      <>
      <Navbar/>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/login"} />;
}
