import logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#1c1b1c] flex flex-col md:flex-row">

      {/* UNIVERSAL LOGO – One logo for all screens */}
      <div
        className="
          flex justify-center items-center
          mt-10 mb-4
          md:mt-0 md:mb-0 
          md:absolute 
          md:right-[18%] lg:right-[15%]
          md:top-1/2 md:-translate-y-1/2
          transition-all duration-500 ease-in-out
        "
      >
        <img
          src={logo}
          alt="Logo"
          className="
            w-20 h-20
            md:w-82 md:h-82
            lg:w-92 lg:h-92
            drop-shadow-xl
            transition-all duration-500
          "
        />
      </div>

      {/* LOGIN CARD */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl p-10 md:p-12 shadow-lg">
          <h1 className="text-center text-3xl font-bold mb-1">LOG IN</h1>
          <p className="text-center text-gray-700 mb-6">
            We are happy to see you again!
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Please enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#a6a6a6] text-white placeholder-white/70 focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Please enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#a6a6a6] text-white placeholder-white/70 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              LOG IN
            </button>
          </form>

          <div className="mt-3 text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          <hr className="my-6 border border-gray-300" />

          <p className="text-xs text-center italic text-gray-600 mb-4">
            A multiplayer and single-player web game where players solve
            AI-generated fictional crimes by analyzing clues, interrogating
            suspects, and using logic to identify the culprit.
          </p>

          <p className="text-center text-sm mb-6">
            Want to be part?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up.
            </Link>
          </p>

          <p className="text-center text-xs italic text-gray-600">
            Powered by AK
          </p>
        </div>
      </div>
    </div>
  );
}
