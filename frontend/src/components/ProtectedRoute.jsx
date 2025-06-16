// components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null: loading, true: authenticated, false: not

  useEffect(() => {
    const checkAccessToken = async () => {
      const token = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        const decode = jwtDecode(token);
        const exp = decode.exp;
        const now = Math.floor(Date.now() / 1000);

        if (exp < now) {
          const response = await api.post("api/token/refresh/", {
            refresh,
          });
          localStorage.setItem("access_token", response.data.access);
        }

        setIsAuth(true);
      } catch (err) {
        console.error("Token check failed:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuth(false);
      }
    };

    checkAccessToken();
  }, []);

  if (isAuth === null) {
    // Optional: show a loading spinner
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
