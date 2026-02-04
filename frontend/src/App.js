import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  if (!user) {
    return mode === "login" ? (
      <Login switchToSignup={() => setMode("signup")} />
    ) : (
      <Signup switchToLogin={() => setMode("login")} />
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Developer Learning & Project Tracker
      </h1>
    </div>
  );
};

export default App;
