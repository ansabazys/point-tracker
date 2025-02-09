import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("token") || null);



  // ✅ Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "https://point-tracker-api.vercel.app/api/admin/login",
        { username, password },
        { withCredentials: true }
      );

      const newToken = res.data.token;
      setAdmin(newToken);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axios.post(
        "https://point-tracker-api.vercel.app/api/admin/logout",
        {},
        { withCredentials: true }
      );
      setAdmin(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
