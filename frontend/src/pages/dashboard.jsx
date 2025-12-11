import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg"; 
import Leaderboard from "../pages/leaderboard.jsx";

export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay for better readability */}
      <div className="min-h-screen bg-gradient-to-b from-black/80 via-black/60 to-black/80 px-4 md:px-6 pt-6 md:pt-10">

        {/* NAVIGATION (unchanged as requested) */}
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

        {/* ANIMATED LOGO SECTION */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-800/20 via-transparent to-red-800/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            {/* Pulsing ring */}
            <div className="absolute -inset-2 border-2 border-red-700/30 rounded-full animate-ping opacity-20"></div>
            
            <img
              src={logo}
              alt="WHODUNIT logo"
              className="w-40 h-40 md:w-56 md:h-56 relative z-10 transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
            />
          </div>
          
        </div>

        {/* GAME CARDS SECTION - Added more margin bottom for breathing space */}
        <div className="max-w-4xl mx-auto mb-24"> {/* Changed from mb-16 to mb-24 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10"> {/* Changed from gap-8 to gap-10 */}
            
            {/* SOLO PLAY CARD - Left Side */}
            <div className="relative group">
              {/* Crime scene tape effect */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold px-6 py-1 text-sm tracking-wider rotate-1 shadow-lg z-20">
                NEW CASE FILE
              </div>
              
              <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black rounded-2xl p-8 shadow-2xl shadow-black/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    Start Investigation
                  </h3>
                  
                  <div className="h-1 w-24 bg-gradient-to-r from-red-800 to-red-600 mb-6 rounded-full"></div>
                  
                  <p className="text-gray-700 leading-relaxed mb-8 text-lg font-light">
                    Enter a world of mystery. Analyze clues, interrogate suspects, and uncover hidden truths in AI-generated detective cases.
                  </p>

                  <Link to="/soloGame/solo_story" className="block">
                    <button className="w-full bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white py-4 rounded-xl font-bold text-lg tracking-wider hover:shadow-2xl hover:shadow-red-900/50 transform hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
                      <span className="relative z-10">BEGIN INVESTIGATION →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* CASE HISTORY CARD - Right Side */}
            <div className="relative group">
              {/* Evidence label */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold px-6 py-1 text-sm tracking-wider -rotate-1 shadow-lg z-20">
                CASE ARCHIVES
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-8 shadow-2xl shadow-black/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-700/50">
                {/* File folder texture */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Review Cases
                  </h3>
                  
                  <div className="h-1 w-24 bg-gradient-to-r from-gray-600 to-gray-500 mb-6 rounded-full"></div>
                  
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">
                    Revisit your past investigations. Study your successes, learn from mistakes, and track your detective career progression.
                  </p>

                  <Link to="/history" className="block">
                    <button className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-4 rounded-xl font-bold text-lg tracking-wider hover:shadow-2xl hover:shadow-gray-900/50 transform hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden border border-gray-600/50">
                      <span className="relative z-10">VIEW CASE HISTORY →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </Link>
                </div>
                
                {/* File stack decoration */}
                <div className="absolute bottom-4 right-4 opacity-20">
                  <div className="flex space-x-1">
                    <div className="w-3 h-4 bg-gray-600 transform rotate-6"></div>
                    <div className="w-3 h-4 bg-gray-600 transform -rotate-3"></div>
                    <div className="w-3 h-4 bg-gray-600 transform rotate-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERBOARD SECTION - Updated with better background */}
        <div className="max-w-4xl mx-auto px-4 pb-24">
          <div className="relative group">
            {/* Evidence board glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-900/15 via-black/30 to-red-900/15 rounded-3xl blur-xl opacity-60"></div>
            
            {/* Main container with evidence board texture */}
            <div className="relative bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-900/80 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/70 overflow-hidden border border-gray-700/40 backdrop-blur-sm">
              
              

              <div className="relative z-10">
                {/* Header with police evidence board style */}
                <div className="text-center mb-8">
                  <div className="inline-block relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#800000]/20 to-transparent rounded-lg blur-sm"></div>
                    <h3 className="text-xl md:text-s font-bold bg-gradient-to-r text-white 
                    ">
                      BATAK LEADERBOARD
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-0 italic max-w-md mx-auto">
                    Only the sharpest detectives earn a spot on the evidence board
                  </p>
                  
              
                </div>

                {/* Leaderboard Component */}
                <Leaderboard />

                {/* Bottom section */}
                <div className="mt-12 pt-6 border-t border-gray-800/50">
                  <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="flex items-center mr-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-green-400 font-medium">LIVE UPDATES</span>
                      </div>
                    </div>
                    <div className="text-gray-400 italic text-sm">
                      Your next case could put you on the board...
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Evidence stamp decoration */}
              <div className="absolute bottom-8 right-8 opacity-5 pointer-events-none">
                <div className="text-6xl font-black text-red-800 rotate-12">TOP SECRET</div>
              </div>

              {/* Corner tape effects */}
              <div className="absolute top-4 left-4 w-4 h-0.5 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
              <div className="absolute top-4 left-4 w-0.5 h-4 bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
              <div className="absolute top-4 right-4 w-4 h-0.5 bg-gradient-to-l from-yellow-500/50 to-transparent"></div>
              <div className="absolute top-4 right-4 w-0.5 h-4 bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* FLOATING ELEMENTS FOR IMMERSION */}
        <div className="fixed bottom-8 left-8 opacity-20 hover:opacity-40 transition-opacity duration-300 pointer-events-none">
          <div className="w-16 h-20 bg-gradient-to-b from-amber-900/20 to-transparent border border-amber-800/30 transform rotate-12"></div>
        </div>
        
        <div className="fixed top-20 right-8 opacity-10 pointer-events-none">
          <div className="text-2xl">🔍</div>
        </div>

      </div>
    </div>
  );
}