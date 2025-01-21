import React, { useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import LoginContext from "../LoginContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password,
      });
      const { access, refresh } = response.data;

      // Save tokens to localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Decode the token to get user details
      const decoded = jwtDecode(access);
      setToken(access);
      setUser({ username: decoded.username || decoded.sub || "User" });

      // Redirect to home
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
