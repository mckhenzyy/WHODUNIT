import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Dashboard() { // component
  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* Tab pill (centered) */}
        <div className="flex justify-center">
          <div className="bg-gray-200 text-black text-lg rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow-sm">

            {/* My Score */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex-1 text-left py-2 px-10 rounded-md
                hover:underline hover:underline-offset-4 hover:decoration-2
                active:underline active:underline-offset-4 active:decoration-2
                ${isActive ? "text-orange-500 font-semibold" : "text-black"}`
              }
            >
              About
            </NavLink>

            {/* Home */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex-1 text-center py-2 px-5 rounded-md
                active:decoration-2
                ${isActive ? "text-orange-500 font-semibold" : "text-black"}`
              }
            >
              Home
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex-1 text-right py-2 px-10 rounded-md
                hover:underline hover:underline-offset-4 hover:decoration-2
                active:underline active:underline-offset-4 active:decoration-2
                ${isActive ? "text-orange-500 font-semibold" : "text-black"}`
              }
            >
              Profile
            </NavLink>

          </div>
        </div>


        {/* big vertical spacing */}
        <div className="h-8" />

        {/* Centered logo */}
        <div className="flex flex-col items-center">
          <img src={logo} alt="WHODUNIT logo" className="w-20 h-20 w-24 h-34 md:w-54 md:h-64 mb-6" />
        </div>

        {/* Cards row */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Card 1 */}
            <div className="bg-gray-200 text-black rounded-2xl p-10 shadow-lg mx-4 lg:mx-0">
              <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">Multi-Player</h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-8">
                A shared mystery-solving arena where you and other players team up, compete, or outsmart each other by studying clues, questioning suspects, and racing to uncover the real culprit first.
              </p>

              <div className="flex justify-center">
                <Link to="/multiGame/multiplayer" className="w-2/3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
                    ENTER
                  </button>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-200 text-black rounded-2xl p-10 shadow-lg mx-4 lg:mx-0">
              <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">Solo Player</h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-8">
                A private investigation mode where you solve AI-generated cases at your own pace, analyze every detail, and sharpen your detective skills without time pressure or competition.
              </p>

              <div className="flex justify-center">
                <Link to="/soloGame/solo_story" className="w-2/3">
                  <button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition">
                    ENTER
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* bottom breathing space */}
        <div className="h-12" />
      </div>
    </div>
  );
}
