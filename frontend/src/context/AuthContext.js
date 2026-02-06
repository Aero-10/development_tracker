import { createContext, useContext, useState } from "react";
import { setAccessToken } from "../api/axios";
import { signup as signupApi, login as loginApi } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const token = await loginApi(email, password);
      setAccessToken(token);
      setUser({ email });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const token = await signupApi(email, password);
      setAccessToken(token);
      setUser({ email });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setAccessToken(null);
    setUser(null);

    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);