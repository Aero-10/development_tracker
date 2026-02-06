import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token missing");
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus("success");
        setMessage("Email verified successfully. You can now log in.");
        // Redirect after 2 seconds
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      });
  }, [token, navigate]);

  return (
    <AuthLayout title="Email verification">
      {status === "loading" && (
        <p className="text-center text-gray-400">
          Verifying your email...
        </p>
      )}

      {status === "success" && (
        <div className="text-green-400 text-center">
            {message}
            <p className="text-sm text-gray-400 mt-4 text-center">
            You can now log in.
            </p>
        </div>

      )}

      {status === "error" && (
        <div className="text-red-400 text-center">
          {message}
        </div>
      )}
    </AuthLayout>
  );
};

export default VerifyEmail;