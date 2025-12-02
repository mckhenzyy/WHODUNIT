import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white flex flex-col items-center px-6 py-10">

      {/* TAB MENU */}
      <div className="w-full max-w-3xl mb-10">
        <div className="bg-gray-200 text-black rounded-xl px-2 py-1 flex items-center justify-between shadow-sm">

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-md
              ${isActive ? "text-orange-500 font-bold underline underline-offset-4 decoration-2" 
              : "text-black hover:underline hover:underline-offset-4"}`
            }
          >
            About
          </NavLink>

          {/* Home */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-md
              ${isActive ? "text-orange-500 font-bold underline underline-offset-4 decoration-2" 
              : "text-black hover:underline hover:underline-offset-4"}`
            }
          >
            Home
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-md
              ${isActive ? "text-orange-500 font-bold underline underline-offset-4 decoration-2" 
              : "text-black hover:underline hover:underline-offset-4"}`
            }
          >
            Profile
          </NavLink>

        </div>
      </div>

      {/* MAIN CARD — EXPANDS NATURALLY */}
      <div
        className="
          bg-white text-black rounded-2xl shadow-xl 
          w-full max-w-3xl 
          p-10 md:p-12 
          flex flex-col items-center
        "
      >

        {/* LOGO */}
        <div className="bg-black rounded-full p-4 shadow-md mb-6">
          <img
            src={logo}
            alt="WHODUNT logo"
            className="w-16 h-16 md:w-24 md:h-24"
          />
        </div>

        {/* HEADER */}
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-6 tracking-wide">
          ABOUT WHODUNT?
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-700 leading-relaxed text-center mb-10 text-base md:text-lg px-2">
          Who has done it? <strong>[WHODUNT?]</strong>: The AI-Generated Mystery Web Game. A light, interactive mystery game where players
          uncover the suspect using clues, quick reasoning, and fun deduction.
          It brings excitement to group settings by encouraging teamwork,
          reactions, and friendly mind games — but it can also be enjoyed solo with
          <strong> AI</strong>, letting you experience mystery-solving anytime.
          <br /><br />
          Whether you're hanging out with friends, hosting an event, or playing alone,
          WHODUNT? delivers an immersive and enjoyable experience that keeps everyone
          curious, engaged, and guessing until the final reveal.
        </p>

        <p className="text-center text-gray-700 italic mb-10 text-base md:text-lg">
          Powered by AK
        </p>

        {/* CONTACT CARD */}
        <div className="bg-gray-100 p-6 rounded-xl shadow w-full">

          <h2 className="text-center text-xl md:text-2xl font-bold mb-3">
            Need help?
          </h2>

          <p className="text-gray-700 text-center text-sm md:text-base mb-2">
            Contact us at:
          </p>

          <div className="flex flex-col gap-1 text-center text-sm md:text-base">

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=khezmangubat@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              khezmangubat@gmail.com
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=delapenasamalexies@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              delapenasamalexies@gmail.com
            </a>

          </div>
        </div>
      </div>

    </div>
  );
}
