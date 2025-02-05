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
      if (!username) {
        Swal.fire({
          icon: "error",
          text: "Username is required",
        });
      }
      if (!avatar) {
        Swal.fire({
          icon: "error",
          text: "Please choose your avatar",
        });
      }
      localStorage.setItem("username", username);
      localStorage.setItem("avatar", avatar);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
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
      </form>
    </>
  );
}
