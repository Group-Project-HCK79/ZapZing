import { Navigate, Outlet } from "react-router";

export default function NoAuthLayout() {
  const isAuth = localStorage.username;
  const isAvatar = localStorage.avatar;

  if (!isAuth || !isAvatar) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/"} />;
}
