import { useState } from "react";
import bg from "../assets/bg.jpg"; 
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();


    // const res = await fetch("http://localhost:5001/api/auth/reset-password"
    const API = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${API}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, code, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setTimeout(() => setError(""), 2000);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center px-6 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bg})` }}
    >
        
    
              
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-lg">

        <h2 className="text-white text-xl font-bold mb-4">Reset Password</h2>

        {!success ? (
          <>
            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20"
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New password"
              className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full mb-6 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/20"
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              onClick={handleReset}
              className="w-full bg-[#800000] hover:bg-[#990000] text-white py-3 rounded-xl font-bold transition"
            >
              Save Password
            </button>
          </>
        ) : (
          <p className="text-green-400">Password updated! Redirecting...</p>
        )}
      </div>
    </div>
  );
}
