import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* DARK OVERLAY */}
      <div className="min-h-screen bg-black/70 backdrop-blur-md px-6 py-10 flex flex-col items-center">

        {/* NAVIGATION */}
        <div className="w-full flex justify-center mt-6 mb-10 px-4">
          <div className="bg-white/90 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow">

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex-1 text-center py-2 font-semibold ${
                  isActive
                    ? "text-[#800000] underline underline-offset-4"
                    : "hover:underline"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex-1 text-center py-2 font-semibold ${
                  isActive
                    ? "text-[#800000] underline underline-offset-4"
                    : "hover:underline"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex-1 text-center py-2 font-semibold ${
                  isActive
                    ? "text-[#800000] underline underline-offset-4"
                    : "hover:underline"
                }`
              }
            >
              Profile
            </NavLink>

          </div>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="WHODUNIT Logo"
              className="w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-center text-2xl font-extrabold text-white tracking-wide mb-6 drop-shadow-lg">
            ABOUT WHODUNIT?
          </h1>

          {/* STORY / DESCRIPTION */}
          <div className="text-gray-200 text-center leading-relaxed text-1xl mb-10">
            <p>
              <strong className="text-white">WHODUNIT?</strong> is an AI-powered mystery-solving game 
              where every case challenges your logic, instincts, and detective skills.
            </p>

            <br />

            <p>
              Step into a world where clues hide in plain sight
              and every decision leads you closer — or further — from the truth.
            </p>

            <br />

            <p>
              WHODUNIT? turns every round into a thrilling race to uncover:
            </p>
          </div>

          {/* BULLET FEATURES (GAME UI STYLE) */}
          <div className="grid grid-cols-1 gap-4 mb-10">

            <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center shadow-lg">
              <p className="text-xl font-bold text-[#ff6666]">🔎 AI-Generated Cases</p>
              <p className="text-sm text-gray-300 mt-1">
                Every story is unique — no repeated mysteries.
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center shadow-lg">
              <p className="text-xl font-bold text-[#66ccff]">🧠 Logic-Based Gameplay</p>
              <p className="text-sm text-gray-300 mt-1">
                Analyze clues, question suspects, find contradictions.
              </p>
            </div>

          </div>

          {/* POWERED */}
          <p className="text-center text-gray-300 italic mb-12">
            Powered by AK
          </p>

          {/* CONTACT SECTION */}
          <div className="bg-white/20 backdrop-blur-xl p-6 rounded-xl border border-white/20">
            <h2 className="text-center text-2xl font-bold text-white mb-1">
              Need help?
            </h2>

            <p className="text-white text-center text-sm mb-4 italic mb-12">
              Contact the developers:
            </p>

            <div className="flex flex-col text-center gap-0">
              <a href="mailto:khezmangubat@gmail.com" className="text-white hover:text-white transition">
                khezmangubat@gmail.com
              </a>
              <a href="mailto:delapenasamalexies@gmail.com" className="text-white hover:text-white transition">
                delapenasamalexies@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
