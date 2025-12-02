import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Multi_Join() {

  const [joinCode, setJoinCode] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleJoin = () => {
    if (joinCode !== "1234") {
      setAlertOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* Tab pill */}
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
          <img src={logo} alt="WHODUNIT logo" className="w-20 h-20 md:w-54 md:h-64 mb-6" />
        </div>

        {/* Cards row */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Card 1 - DISABLED */}
            <div className="bg-gray-300 text-gray-500 rounded-2xl p-10 shadow-lg mx-4 lg:mx-0 opacity-60">
              <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">Create Game Room</h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                A multiplayer and single-player web game where players solve
                AI-generated fictional crimes by analyzing clues, interrogating
                suspects, and using logic to identify the culprit.
              </p>

              <div className="flex justify-center">
                <button
                  disabled
                  className="w-2/3 bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  ENTER
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-200 text-black rounded-2xl p-10 shadow-lg mx-4 lg:mx-0">
              <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">Join Game Room</h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-8">
                A multiplayer and single-player web game where players solve
                AI-generated fictional crimes by analyzing clues, interrogating
                suspects, and using logic to identify the culprit.
              </p>

              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Please enter room code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#DB5B2A] text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>

              {/* JOIN BUTTON */}
              <div className="flex justify-center">
                <button
                  onClick={handleJoin}
                  className="w-full bg-gray-300 hover:bg-orange-600 hover:text-white text-black py-3 rounded-lg font-semibold transition"
                >
                  JOIN ROOM
                </button>
              </div>

              {/* CANCEL BUTTON */}
              <div className="flex justify-center mt-3">
                <Link to="/multiGame/multiplayer" className="w-full">
                  <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold transition">
                    Cancel
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* bottom breathing space */}
        <div className="h-12" />

      </div>

      {/* ALERT MODAL */}
      {alertOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
          <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-lg shadow-xl md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-center text-lg font-bold mb-4">
              Room code does not exist.
            </h2>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setAlertOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Try again
              </button>

              <Link to="/multiGame/multiplayer">
                <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
