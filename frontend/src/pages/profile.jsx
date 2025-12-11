// import { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import bg from "../assets/bg.jpg";

// export default function Profile() {
//   // TEMPORARY DATA → backend can replace later
//   const [fullname] = useState("Khezy Gwen Mangubat");
//   const [username] = useState("kzmangubat");

//   const [winStreak] = useState(4);
//   const [gamesPlayed] = useState(23);

//   const [wins] = useState({
//     day: 1,
//     week: 5,
//     month: 12,
//   });

//   const [losses] = useState({
//     day: 0,
//     week: 2,
//     month: 5,
//   });

//   const [tab, setTab] = useState("day"); // day | week | month
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat text-white"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       {/* DARK OVERLAY */}
//       <div className="min-h-screen bg-black/70 backdrop-blur-md px-6 py-10 flex flex-col items-center">

//         {/* NAVIGATION */}
//         <div className="w-full flex justify-center mb-10 px-4">
//           <div className="bg-white/90 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow">
//             <NavLink
//               to="/about"
//               className={({ isActive }) =>
//                 `flex-1 text-center py-2 font-semibold ${
//                   isActive
//                     ? "text-[#800000] underline underline-offset-4"
//                     : "hover:underline"
//                 }`
//               }
//             >
//               About
//             </NavLink>
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex-1 text-center py-2 font-semibold ${
//                   isActive
//                     ? "text-[#800000] underline underline-offset-4"
//                     : "hover:underline"
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/profile"
//               className={({ isActive }) =>
//                 `flex-1 text-center py-2 font-semibold ${
//                   isActive
//                     ? "text-[#800000] underline underline-offset-4"
//                     : "hover:underline"
//                 }`
//               }
//             >
//               Profile
//             </NavLink>
//           </div>
//         </div>

//         {/* MAIN PROFILE CARD */}
//         <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">

//           {/* HEADER */}
//           <div className="flex flex-col items-center mb-8">
//             <FaUserCircle className="text-gray-300" size={120} />
//             <h1 className="text-3xl font-bold mt-4 tracking-wide">{fullname}</h1>
//             <p className="text-gray-300 text-sm">Username: {username}</p>
//           </div>

//           {/* WIN STREAK */}
//           <div className="text-center mb-10">
//             <h2 className="text-xl font-semibold text-gray-300 tracking-wider">
//               WIN STREAK
//             </h2>

//             <div className="mt-3 text-6xl font-extrabold text-[#ff4d4d] drop-shadow-lg">
//               {winStreak}
//             </div>

//             <p className="text-gray-400 text-sm mt-1">🔥 Keep it going!</p>
//           </div>

//           {/* STATS GRID */}
//           <div className="grid grid-cols-3 gap-4 mb-10">
//             <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
//               <p className="ttext-sm text-gray-300">Games Played</p>
//               <p className="text-3xl font-bold text-orange-400">{gamesPlayed}</p>
//             </div>

//             <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
//               <p className="text-sm text-gray-300">Wins ({tab})</p>
//               <p className="text-3xl font-bold text-green-400">{wins[tab]}</p>
//             </div>

//             <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
//               <p className="text-sm text-gray-300">Losses ({tab})</p>
//               <p className="text-3xl font-bold text-red-400">{losses[tab]}</p>
//             </div>
//           </div>

//           {/* TABS */}
//           <div className="flex justify-center gap-3 mb-10">
//             {["day", "week", "month"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm transition ${
//                   tab === t
//                     ? "bg-[#800000] text-white shadow-lg"
//                     : "bg-white/20 border border-white/20 text-gray-300 hover:bg-white/30"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           {/* LOGOUT BUTTON */}
//           <button
//             onClick={() => navigate("/")}
//             className="w-full bg-red-700 hover:bg-red-900 text-white py-3 rounded-xl font-bold tracking-wide transition shadow-lg"
//           >
//             LOG OUT
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username;

  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("day"); // day | week | month

  // useEffect(() => {
  //   if (!username) {
  //     navigate("/");
  //     return;
  //   }

  //   // axios.get(`http://localhost:5001/api/auth/profile/${username}`)
  //   //   .then((res) => setProfile(res.data))
  //   //   .catch(() => navigate("/"));
  // const API = import.meta.env.VITE_API_BASE_URL;

  // axios.get(`${API}/api/auth/profile/${username}`)
  //   .then((res) => setProfile(res.data))
  //   .catch(() => navigate("/dashboard"));
  //   }, [username, navigate]);

  useEffect(() => {
  if (!username) {
    navigate("/");
    return;
  }

  // axios.get(`http://localhost:5001/api/auth/profile/${username}`
  const API = import.meta.env.VITE_API_BASE_URL;

  axios.get(`${API}/api/auth/profile/${username}`)
    .then((res) => setProfile(res.data))
    .catch(() => navigate("/dashboard"));
}, [username, navigate]);

  // if (!profile) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-white text-lg">
  //       Loading profile...
  //     </div>
  //   );
  // }

if (!profile) {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen bg-black/70 backdrop-blur-md px-6 py-10 flex flex-col items-center">

        {/* Skeleton Profile Card */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl animate-pulse">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full mb-4"></div>

            <div className="w-40 h-4 bg-white/20 rounded-full mb-2"></div>
            <div className="w-28 h-3 bg-white/10 rounded-full"></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="h-20 bg-white/20 rounded-xl"></div>
            <div className="h-20 bg-white/20 rounded-xl"></div>
            <div className="h-20 bg-white/20 rounded-xl"></div>
          </div>

          {/* Buttons */}
          <div className="w-full h-12 bg-white/20 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}



  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* DARK OVERLAY */}
      <div className="min-h-screen bg-black/70 backdrop-blur-md px-6 py-10 flex flex-col items-center">

        {/* NAVIGATION */}
        <div className="w-full flex justify-center mb-10 px-4">
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

        {/* MAIN PROFILE CARD */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">

          {/* HEADER */}
          <div className="flex flex-col items-center mb-8">
            <FaUserCircle className="text-gray-300" size={120} />
            <h1 className="text-3xl font-bold mt-4 tracking-wide">
              {profile.fullname}
            </h1>
            <p className="text-gray-300 text-sm">Username: {profile.username}</p>
          </div>

          {/* WIN STREAK */}
          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-gray-300 tracking-wider">
              WIN STREAK
            </h2>

            <div className="mt-3 text-6xl font-extrabold text-[#ff4d4d] drop-shadow-lg">
              {profile.win_streak}
            </div>

            <p className="text-gray-400 text-sm mt-1">
              {profile.win_streak > 0 ? "🔥 Keep going!" : "No active streak"}
            </p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
              <p className="text-sm text-gray-300">Games Played ({tab})</p>
              <p className="text-3xl font-bold text-orange-400">
                {profile.stats?.[tab]?.games ?? 0}
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
              <p className="text-sm text-gray-300">Wins ({tab})</p>
              <p className="text-3xl font-bold text-green-400">
                {profile?.stats?.[tab]?.wins ?? 0}
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
              <p className="text-sm text-gray-300">Losses ({tab})</p>
              <p className="text-3xl font-bold text-red-400">
                {profile?.stats?.[tab]?.losses ?? 0}
              </p>
            </div>
          </div>

          {/* TABS */}
          <div className="flex justify-center gap-3 mb-10">
            {["day", "week", "month"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm transition ${
                  tab === t
                    ? "bg-[#800000] text-white shadow-lg"
                    : "bg-white/20 border border-white/20 text-gray-300 hover:bg-white/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="w-full bg-red-700 hover:bg-red-900 text-white py-3 rounded-xl font-bold tracking-wide transition shadow-lg"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}
