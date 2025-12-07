// import logo from "../../assets/logo.png";
// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// export default function Created_Room() {
//   // TEMP — backend will replace later
//   const [roomCode] = useState(312345);

//   return (
//     <div className="min-h-screen bg-[#1c1b1c] text-white">

//       <div className="max-w-6xl mx-auto px-6 pt-8">

//         {/* ======================== NAVBAR (UNCHANGED) ======================== */}
//         <div className="flex justify-center">
//           <div className="bg-gray-200 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow-sm">

//             <Link to="/multiGame/multiplayer" className="w-2/3 text-left px-5">
//               <button className="flex-1 text-left py-2 px-5 text-orange-500 font-semibold rounded-md">
//                 MULTI-PLAYER GAME
//               </button>
//             </Link>

//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex-1 text-right py-2 px-10 rounded-md
//                 hover:underline hover:underline-offset-4 hover:decoration-2
//                 active:underline active:underline-offset-4 active:decoration-2
//                 ${isActive ? "text-orange-500" : "text-black"}`
//               }
//             >
//               Home
//             </NavLink>

//           </div>
//         </div>

//         {/* spacing */}
//         <div className="h-8" />

//         {/* LOGO */}
//         <div className="flex flex-col items-center">
//           <img
//             src={logo}
//             alt="WHODUNIT logo"
//             className="w-20 h-20 md:w-40 md:h-40 mb-6"
//           />
//         </div>

//         {/* CARD */}
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-center">

//             <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg mx-5 lg:mx-0 w-full max-w-xl flex flex-col items-center">

//               <h3 className="text-center text-2xl lg:text-3xl font-bold mb-6">
//                 GAME ROOM CREATED
//               </h3>

//               <p className="text-sm text-gray-700 text-center leading-relaxed mb-8">
//                 To share room, please provide this room code. This is only valid for 5 minutes. <br />
//                 Game room must consist of at least 3 players. Otherwise, this game room will vanish after 5 minutes.
//               </p>

//               <h3 className="text-center text-3xl font-bold mb-8">
//                 {roomCode}
//               </h3>

//               <div className="w-full flex flex-col gap-3">
//                 <Link to="/multiGame/waiting_room">
//                   <button className="w-full bg-[#DB5B2A] hover:bg-[#c25727] text-white py-3 rounded-lg font-semibold transition">
//                     PROCEED
//                   </button>
//                 </Link>

//                 <Link to="/multiGame/multiplayer">
//                   <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold transition">
//                     Cancel
//                   </button>
//                 </Link>
//               </div>

//             </div>

//           </div>
//         </div>

//         {/* bottom spacing */}
//         <div className="h-12" />

//       </div>
//     </div>
//   );
// }




// import logo from "../../assets/logo.png";
// import { Link, NavLink, useParams } from "react-router-dom";

// export default function Created_Room() {

//   const { roomId } = useParams();

//   return (
//     <div className="min-h-screen bg-[#1c1b1c] text-white">

//       <div className="max-w-6xl mx-auto px-6 pt-8">

//         {/* Navbar */}
//         <div className="flex justify-center">
//           <div className="bg-gray-200 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow-sm">

//             <Link to="/multiGame/multiplayer" className="w-2/3 text-left px-5">
//               <button className="text-orange-500 font-semibold">
//                 MULTI-PLAYER GAME
//               </button>
//             </Link>

//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `py-2 px-10 rounded-md 
//                 ${isActive ? "text-orange-500" : "text-black"}`
//               }
//             >
//               Home
//             </NavLink>

//           </div>
//         </div>

//         <div className="h-8" />

//         {/* LOGO */}
//         <div className="flex flex-col items-center">
//           <img src={logo} className="w-20 h-20 md:w-40 md:h-40 mb-6" />
//         </div>

//         {/* CARD */}
//         <div className="max-w-xl mx-auto bg-gray-200 text-black rounded-2xl p-7 shadow-lg flex flex-col items-center">

//           <h3 className="text-3xl font-bold mb-6 text-center">
//             GAME ROOM CREATED
//           </h3>

//           <p className="text-sm text-gray-700 text-center mb-8">
//             Share this room code. Valid for 5 minutes.
//             Room must have at least 3 players.
//           </p>

//           {/* REAL ROOM CODE */}
//           <h3 className="text-center text-3xl font-bold mb-8">
//             {roomId}
//           </h3>

//           <div className="w-full flex flex-col gap-3">
            
//             <Link to={`/multiGame/waiting_room/${roomId}`}>
//               <button className="w-full bg-[#DB5B2A] hover:bg-[#c25727] text-white py-3 rounded-lg font-semibold">
//                 PROCEED
//               </button>
//             </Link>

//             <Link to="/multiGame/multiplayer">
//               <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
//                 Cancel
//               </button>
//             </Link>

//           </div>

//         </div>

//         <div className="h-12" />

//       </div>
//     </div>
//   );
// }




// frontend/src/pages/multiGame/created_room.jsx
import logo from "../../assets/logo.png";
import { Link, NavLink, useParams } from "react-router-dom";

export default function Created_Room() {
  const { roomId } = useParams();

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex justify-center">
          <div className="bg-gray-200 text-black rounded-xl px-2 py-1 flex items-center w-full max-w-3xl justify-between shadow-sm">
            <Link to="/multiGame/multiplayer" className="w-2/3 text-left px-5">
              <button className="text-orange-500 font-semibold">MULTI-PLAYER GAME</button>
            </Link>
            <NavLink to="/dashboard" className={({ isActive }) => `py-2 px-10 rounded-md ${isActive ? "text-orange-500" : "text-black"}`}>Home</NavLink>
          </div>
        </div>

        <div className="h-8" />
        <div className="flex flex-col items-center"><img src={logo} className="w-20 h-20 md:w-40 md:h-40 mb-6" /></div>

        <div className="max-w-xl mx-auto bg-gray-200 text-black rounded-2xl p-7 shadow-lg flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-6 text-center">GAME ROOM CREATED</h3>
          <p className="text-sm text-gray-700 text-center mb-8">Share this room code. Valid for 5 minutes. Room must have at least 3 players.</p>
          <h3 className="text-center text-3xl font-bold mb-8">{roomId}</h3>

          <div className="w-full flex flex-col gap-3">
            <Link to={`/multiGame/waiting_room/${roomId}`}>
              <button className="w-full bg-[#DB5B2A] hover:bg-[#c25727] text-white py-3 rounded-lg font-semibold">PROCEED</button>
            </Link>
            <Link to="/multiGame/multiplayer">
              <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">Cancel</button>
            </Link>
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
