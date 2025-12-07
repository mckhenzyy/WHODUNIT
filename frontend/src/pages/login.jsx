import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showCard, setShowCard] = useState(false); // fade-in animation
  const [error, setError] = useState(""); // popup errors

  useEffect(() => {
    // Fade in login card on load
    setTimeout(() => setShowCard(true), 200);
  }, []);

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await fetch("http://localhost:5001/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Incorrect credentials");
//       setTimeout(() => setError(""), 2000);
//       return;
//     }

//     // Clear previous session
//     localStorage.removeItem("user");
//     localStorage.removeItem("username");

//     // Save logged-in user
//     localStorage.setItem("user", JSON.stringify(data.user));
//     localStorage.setItem("username", data.user.username);

//     window.location.href = "/dashboard";
//   } catch (err) {
//     setError("Server error. Try again later.");
//     setTimeout(() => setError(""), 2000);
//   }
// };


const handleLogin = async (e) => {
  e.preventDefault();

  try {
    // const API = import.meta.env.VITE_API_BASE_URL;
    // const res = await fetch(`${API}/api/auth/login`
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Incorrect credentials");
      setTimeout(() => setError(""), 2000);
      return;
    }

    // 📌 Save user properly
    await localStorage.setItem("user", JSON.stringify(data.user));

    // 📌 Redirect after saving
    window.location.href = "/dashboard";
  } catch (err) {
    setError("Server error. Try again later.");
    setTimeout(() => setError(""), 2000);
  }
};


  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* POPUP ERROR */}
      {error && (
        <div className="absolute top-6 z-20 bg-red-700/90 text-white px-6 py-3 rounded-xl shadow-lg animate-slideDown">
          {error}
        </div>
      )}

      {/* LOGIN CARD */}
      <div
        className={`
          relative z-10 w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-xl 
          border border-white/20 rounded-3xl p-8 sm:p-10 
          shadow-[0_0_50px_rgba(0,0,0,0.6)] transition-all duration-700
          ${showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="WHODUNIT"
            className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-glow"
          />
        </div>

        {/* HEADER */}
        <h1 className="text-center text-3xl font-extrabold text-white tracking-wide mb-3">
          LOGIN
        </h1>
        <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
          Welcome back, detective.
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          {/* USERNAME */}
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-red placeholder-gray-300 focus:outline-none backdrop-blur-md"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-red placeholder-gray-300 focus:outline-none backdrop-blur-md"
            required
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#990000] text-white py-3 rounded-xl font-bold tracking-wide shadow-lg transition"
          >
            LOG IN
          </button>
        </form>

        {/* DESCRIPTION */}
        <p className="text-xs text-center italic text-gray-400 mt-6">
          A mystery-solving game where every clue matters.
        </p>

        {/* SIGN UP LINK */}
        <p className="text-center text-sm text-gray-300 mt-4">
          New here?{" "}
          <Link to="/signup" className="text-[#ff9999] hover:text-white transition">
            Create an account.
          </Link>
        </p>

        <p className="text-center text-xs italic text-gray-500 mt-6">
          Powered by AK
        </p>
      </div>
    </div>
  );
}
