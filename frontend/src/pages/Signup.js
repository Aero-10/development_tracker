import { useState } from "react";
import { signup } from "../api/auth";
import { setAccessToken } from "../api/axios";
import AuthLayout from "../components/AuthLayout";

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signup(email, password);
    setAccessToken(token);
  };

  return (
    <AuthLayout title="Create account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-accent">
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </p>
    </AuthLayout>
  );
};

export default Signup;
