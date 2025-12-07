import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, []);
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* slight blur overlay for readability */}
      <div className="min-h-screen backdrop-blur-sm px-4 md:px-6 pt-6 md:pt-10">

        {/* NAVIGATION */}
        <div className="w-full flex justify-center mt-6 mb-10 px-4">
          <div className="bg-white/90 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow">

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex-1 text-center py-2 rounded-md font-semibold
                ${isActive ? "text-[#800000] underline underline-offset-4" : "text-black hover:underline"}`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex-1 text-center py-2 rounded-md font-semibold
                ${isActive ? "text-[#800000] underline underline-offset-4" : "text-black hover:underline"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex-1 text-center py-2 rounded-md font-semibold
                ${isActive ? "text-[#800000] underline underline-offset-4" : "text-black hover:underline"}`
              }
            >
              Profile
            </NavLink>

          </div>
        </div>


        <div className="h-8 md:h-10" />

        {/* CENTER LOGO */}
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="WHODUNIT logo"
            className="w-40 h-40 md:w-56 md:h-56 mb-6"
          />
        </div>

        {/* SOLO PLAYER CARD */}
        <div className="max-w-xl mx-auto px-2">
          <div className="bg-white/90 text-black rounded-2xl p-8 md:p-10 shadow-lg">

            <h3 className="text-center text-2xl md:text-3xl font-bold mb-6">
              Start Game
            </h3>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8 text-center">
              Solve AI-generated mystery cases at your own pace. Analyze clues,
              question suspects, and identify the culprit.
            </p>

            <div className="flex justify-center">
              <Link to="/soloGame/solo_story" className="w-2/3">
                <button className="w-full bg-red-800 hover:bg-red-900 text-white py-3 rounded-lg font-semibold transition">
                  ENTER
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-16 md:h-20" />

      </div>
    </div>
  );
}
