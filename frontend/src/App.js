import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import { ItemsProvider } from "./context/ItemsContext";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />; // redirect to login
  return <ItemsProvider>{children}</ItemsProvider>;
};

const App = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen bg-background text-white">
      <Routes>
        {/* Email verification */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Auth routes */}
        <Route
          path="/"
          element={
            !user ? (
              mode === "login" ? (
                <Login switchToSignup={() => setMode("signup")} />
              ) : (
                <Signup switchToLogin={() => setMode("login")} />
              )
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
