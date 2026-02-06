import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen bg-background text-white">
      <Routes>
        {/* Email verification route */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Auth / App route */}
        <Route
          path="/*"
          element={
            !user ? (
              mode === "login" ? (
                <Login switchToSignup={() => setMode("signup")} />
              ) : (
                <Signup switchToLogin={() => setMode("login")} />
              )
            ) : (
              <div className="p-8">
                <h1 className="text-2xl font-bold">
                  Developer Learning & Project Tracker
                </h1>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
