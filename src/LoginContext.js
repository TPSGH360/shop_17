import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setToken(storedToken);
          setUser({
            username:
              decoded.username || decoded.sub || decoded.email || "User",
          });
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
