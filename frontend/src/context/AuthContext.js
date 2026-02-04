import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/auth";
import { setAccessToken } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const token = await loginApi(email, password);
    setAccessToken(token);

    // decode minimal info (or fetch /me later)
    setUser({ email });
  };

  const logout = async () => {
    setAccessToken(null);
    setUser(null);

    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include"
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
