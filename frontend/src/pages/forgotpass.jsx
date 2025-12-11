import { useState } from "react";
import bg from "../assets/bg.jpg"; 
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();



// const res = await fetch("http://localhost:5001/api/auth/request-reset"
  const API = import.meta.env.VITE_API_BASE_URL;
  const res = await fetch(`${API}/api/auth/request-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
    if (res.ok) setSent(true);
  };


  return (
    <div className="min-h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center px-6 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${bg})` }}
        >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-sm text-center shadow-[0_0_50px_rgba(0,0,0,0.6)]">

        {!sent ? (
          <>
            <h2 className="text-white text-xl font-bold mb-4">Forgot Password?</h2>

            <p className="text-gray-300 text-sm mb-6">
              Enter the email attached to your account.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none backdrop-blur-md"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#990000] text-white py-3 rounded-xl font-bold tracking-wide shadow-lg transition"
              >
                Send Reset Link
              </button>
            </form>

            <Link to="/" className="text-gray-300 hover:text-white text-sm mt-6 block">
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-white text-xl font-bold mb-4">Email Sent!</h2>
            <p className="text-gray-300 text-sm mb-6">
              Check your mail for the reset code and link.
            </p>

            <Link
              to="/"
              className="w-full bg-[#800000] hover:bg-[#990000] text-white py-3 rounded-xl font-bold tracking-wide shadow-lg transition block mt-4"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
