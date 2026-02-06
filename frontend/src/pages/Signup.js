import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { isPasswordValid } from "../utils/passwordRules";

const Signup = ({ switchToLogin }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!isPasswordValid(password)) {
      setError("Password does not meet security requirements");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        {confirmPassword && (
          <p
            className={`text-xs mt-1 ${
              password === confirmPassword
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {password === confirmPassword
              ? "Passwords match"
              : "Passwords do not match"}
          </p>
        )}

        {/* Error message block */}
        {error && (
          <div className="text-sm text-red-400 text-center bg-red-900/30 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Button with loading state */}
        <button className="btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-400">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-accent hover:underline font-medium"
        >
          Login
        </button>
      </p>
    </AuthLayout>
  );
};

export default Signup;