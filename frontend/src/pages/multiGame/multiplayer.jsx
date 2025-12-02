import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Multiplayer() { // component

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* Tab pill (centered) */}
        <div className="flex justify-center">
          <div className="bg-gray-200 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow-sm">

            <Link to="/multiGame/multiplayer" className="w-2/3 text-left px-5">
              <button className="flex-1 text-left py-2 px-5 text-orange-500 font-semibold rounded-md hover:decoration-2 active:underline active:decoration-2">
                MULTI-PLAYER GAME
              </button>
            </Link>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex-1 text-right py-2 px-10 rounded-md
                hover:underline hover:underline-offset-4 hover:decoration-2
                active:underline active:underline-offset-4 active:decoration-2
                ${isActive ? "text-orange-500" : "text-black"}`
              }
            >
              Home
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
              <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">Create Game Room</h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-8">
                Set up your own interactive mystery room, customize the challenge, and invite friends or teammates to join you as you tackle clues and uncover the truth together.
              </p>

              <div className="flex justify-center">
                <Link to="/multiGame/created_room" className="w-2/3">
                  <button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition">
                    CREATE
                  </button>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-200 text-black rounded-2xl p-10 shadow-lg mx-4 lg:mx-0">
              <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">Join Game Room</h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-8">
                Enter an existing game session, collaborate or compete with others, and jump straight into solving a live case full of clues, twists, and suspects waiting to be exposed.
              </p>

              <div className="flex justify-center">
                <Link to="/multiGame/multi_join" className="w-2/3">
                  <button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition">
                    JOIN
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
