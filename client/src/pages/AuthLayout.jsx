import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const isAuth = localStorage.username;

  if (isAuth) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/login"} />;
}
