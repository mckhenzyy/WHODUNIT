// import logo from "../../assets/logo.png";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Waiting_Room() {
//   // TEMP — backend will replace these later
//   const [isHost, setIsHost] = useState(true);
//   const [numOfPlayers, setNumOfPlayers] = useState(4);
//   const [timeLeft, setTimeLeft] = useState(180);

//   const [alertOpen, setAlertOpen] = useState(false);
//   const [timerAlert, setTimerAlert] = useState(false);
//   const [roomFullAlert, setRoomFullAlert] = useState(false);
//   const [completeMode, setCompleteMode] = useState(false);

//   const navigate = useNavigate();

//   // TIMER
//   useEffect(() => {
//     const t = setInterval(() => {
//       setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
//     }, 1000);
//     return () => clearInterval(t);
//   }, []);

//   useEffect(() => {
//     if (timeLeft === 0) setTimerAlert(true);
//   }, [timeLeft]);

//   // PLAYER LIMIT SYSTEM
//   useEffect(() => {
//     if (numOfPlayers > 5) {
//       setRoomFullAlert(true);
//       setNumOfPlayers(5);

//       const t = setTimeout(() => {
//         setRoomFullAlert(false);
//         navigate("/multiGame/multiplayer");
//       }, 3000);

//       return () => clearTimeout(t);
//     }

//     if (numOfPlayers === 5) {
//       setCompleteMode(true);

//       const startTimer = setTimeout(() => {
//         navigate("/multiGame/story");
//       }, 5000);

//       return () => clearTimeout(startTimer);
//     }
//   }, [numOfPlayers, navigate]);

//   const handleStart = () => {
//     if (numOfPlayers < 3) {
//       setAlertOpen(true);
//       return;
//     }
//     navigate("/multiGame/story");
//   };

//   const formatTime = () =>
//     `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`;

//   return (
//     <div className="min-h-screen bg-[#1c1b1c] text-white flex items-center justify-center px-6">

//       {/* CENTER CONTAINER */}
//       <div className="w-full max-w-xl flex flex-col items-center">

//         {/* LOGO */}
//         <img
//           src={logo}
//           alt="WHODUNIT"
//           className="w-20 h-20 md:w-32 md:h-32 mb-10"
//         />

//         {/* CARD */}
//         <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg w-full flex flex-col items-center">

//           {/* STATUS */}
//           <h3 className="text-center text-2xl lg:text-3xl font-bold mb-4 leading-tight">
//             {completeMode ? "Game Ready" : "Waiting for other players to enter."}
//           </h3>

//           {/* COUNT */}
//           <h3 className="text-center text-2xl lg:text-3xl font-bold mb-4">
//             {numOfPlayers}/5
//           </h3>

//           {/* TIMER */}
//           <p className="text-sm text-gray-700 text-center mb-6">
//             {completeMode
//               ? "Room is full. Starting shortly..."
//               : `${formatTime()} minutes left...`}
//           </p>

//           {/* HOST BUTTONS */}
//           {!completeMode && isHost && (
//             <div className="w-full flex flex-col gap-3">
//               <button
//                 onClick={handleStart}
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
//               >
//                 START
//               </button>

//               <Link to="/multiGame/multiplayer">
//                 <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
//                   Cancel
//                 </button>
//               </Link>
//             </div>
//           )}

//           {/* JOINER BUTTON */}
//           {!completeMode && !isHost && (
//             <div className="w-full">
//               <Link to="/multiGame/multiplayer">
//                 <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
//                   Cancel
//                 </button>
//               </Link>
//             </div>
//           )}

//           {/* AUTO-START MESSAGE */}
//           {completeMode && (
//             <p className="text-center text-gray-600 text-sm mt-4">
//               Starting in 5 seconds...
//             </p>
//           )}

//         </div>
//       </div>

//       {/* ALERT: NOT ENOUGH PLAYERS */}
//       {alertOpen && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[90]">
//           <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-lg shadow-xl">
//             <h2 className="text-center text-lg font-bold mb-4">
//               Game room must have at least 3 players.
//             </h2>
//             <div className="flex justify-center pt-5">
//               <button
//                 onClick={() => setAlertOpen(false)}
//                 className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//               >
//                 Continue Waiting
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TOAST: ROOM FULL */}
//       {roomFullAlert && (
//         <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999] animate-pulse">
//           Room is already full (5 players max)
//         </div>
//       )}

//       {/* TIMER ALERT */}
//       {timerAlert && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[90]">
//           <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-lg shadow-xl">
//             <h2 className="text-center text-lg font-bold mb-4">
//               Timer ended. Create or join another room.
//             </h2>

//             <div className="flex justify-center pt-5">
//               <Link to="/multiGame/multiplayer">
//                 <button className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//                   OK
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




// import logo from "../../assets/logo.png";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// export default function Waiting_Room() {
//   const { roomId } = useParams();

//   const username = localStorage.getItem("username");
//   const navigate = useNavigate(); // if not already

//   if (!username) {
//     navigate("/");
//     return null;
// }


//   // REAL backend-driven states
//   const [isHost, setIsHost] = useState(false);
//   const [players, setPlayers] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [roomStatus, setRoomStatus] = useState("waiting");

//   // Alerts
//   const [alertOpen, setAlertOpen] = useState(false); // not enough players
//   const [expiredAlert, setExpiredAlert] = useState(false); // room expired

//   // ============================================================
//   //  FETCH ROOM STATUS (realtime polling every 1.5 sec)
//   // ============================================================
//   useEffect(() => {
//     if (!roomId) return;

//     const fetchRoom = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5001/api/multi/room/${roomId}`
//         );
//         const data = await res.json();

//         if (!res.ok) {
//           setExpiredAlert(true);
//           return;
//         }

//         setRoomStatus(data.status);
//         setPlayers(data.players || []);

//         // Host check
//         setIsHost(
//         data.host &&
//         username &&
//         data.host.toLowerCase() === username.toLowerCase()
//       );

//         // Timer
//         const expireTimestamp = data.expires_at;
//         const now = Math.floor(Date.now() / 1000);
//         const remaining = expireTimestamp - now;

//         if (remaining <= 0) {
//           setExpiredAlert(true);
//         } else {
//           setTimeLeft(remaining);
//         }

//         // If backend says game started → go to story
//         if (data.status === "in_game") {
//           navigate(`/multiGame/story/${roomId}`);
//         }
//       } catch (err) {
//         console.log("Room lookup failed");
//       }
//     };

//     fetchRoom();
//     const t = setInterval(fetchRoom, 1500);
//     return () => clearInterval(t);
//   }, [roomId, username, navigate]);

//   // ============================================================
//   //  TIMER COUNTDOWN
//   // ============================================================
//   useEffect(() => {
//     if (timeLeft === null) return;

//     const t = setInterval(() => {
//       setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
//     }, 1000);

//     return () => clearInterval(t);
//   }, [timeLeft]);

//   const formattedTime = () => {
//     if (timeLeft === null) return "...";
//     const m = Math.floor(timeLeft / 60);
//     const s = String(timeLeft % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   // ============================================================
//   //  START GAME (Host Only)
//   // ============================================================
//   const handleStart = async () => {
//     if (players.length < 3) {
//       setAlertOpen(true);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5001/api/multi/start-game", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ room_id: roomId, username }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         navigate(`/multiGame/story/${roomId}`);
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       alert("Server error.");
//     }
//   };

//   // ============================================================
//   //  RENDERING
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-[#1c1b1c] text-white flex items-center justify-center px-6">

//       {/* If expired */}
//       {expiredAlert && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-lg shadow-lg">
//             <h2 className="text-center text-lg font-bold mb-4">
//               This game room has expired.
//             </h2>
//             <div className="flex justify-center">
//               <Link to="/multiGame/multiplayer">
//                 <button className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//                   OK
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="w-full max-w-xl flex flex-col items-center">

//         {/* Logo */}
//         <img src={logo} className="w-20 h-20 md:w-32 md:h-32 mb-8" />

//         {/* CARD */}
//         <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg w-full flex flex-col items-center">

//           <h3 className="text-center text-2xl lg:text-3xl font-bold mb-4">
//             Waiting for players...
//           </h3>

//           <h3 className="text-center text-2xl lg:text-3xl font-bold mb-3">
//             {players.length}/5
//           </h3>

//           {/* Player list */}
//           <div className="w-full bg-white rounded-lg p-3 mb-5">
//             {players.map((p, i) => (
//               <p key={i} className="text-black text-center py-1">
//                 {p}
//               </p>
//             ))}
//           </div>

//           {/* Timer */}
//           <p className="text-sm text-gray-700 text-center mb-6">
//             Room expires in <strong>{formattedTime()}</strong>
//           </p>

//           {/* HOST OPTIONS */}
//           {isHost ? (
//             <>
//               <button
//                 onClick={handleStart}
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mb-3"
//               >
//                 START
//               </button>

//               <Link to="/multiGame/multiplayer">
//                 <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
//                   Cancel
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <Link to="/multiGame/multiplayer">
//               <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
//                 Cancel
//               </button>
//             </Link>
//           )}

//         </div>
//       </div>

//       {/* NOT ENOUGH PLAYERS ALERT */}
//       {alertOpen && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-lg shadow-xl">
//             <h2 className="text-center text-lg font-bold mb-4">
//               At least 3 players are required to start.
//             </h2>
//             <div className="flex justify-center">
//               <button
//                 onClick={() => setAlertOpen(false)}
//                 className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//               >
//                 Continue Waiting
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Waiting_Room() {
  const { roomId } = useParams();

  const username =
    JSON.parse(localStorage.getItem("user"))?.username ||
    localStorage.getItem("username");

  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [status, setStatus] = useState("waiting");

  const [expired, setExpired] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // ================= FETCH ROOM ==============
  useEffect(() => {
    const getRoom = async () => {
      const res = await fetch(`http://localhost:5001/api/multi/room/${roomId}`);
      const data = await res.json();

      if (!res.ok) {
        setExpired(true);
        return;
      }

      setPlayers(data.players);
      setIsHost(data.host === username);
      setStatus(data.status);

      const now = Math.floor(Date.now() / 1000);
      const remaining = data.expires_at - now;
      setTimeLeft(remaining);

      if (data.status === "in_game") {
        navigate(`/multiGame/chatbox/${roomId}`);
      }
    };

    getRoom();
    const t = setInterval(getRoom, 1500);
    return () => clearInterval(t);
  }, [roomId, username, navigate]);

  // ============= TIMER =============
  useEffect(() => {
    if (timeLeft == null) return;

    const t = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft]);

  const handleStart = async () => {
    if (players.length < 3) {
      setAlertOpen(true);
      return;
    }

    const res = await fetch("http://localhost:5001/api/multi/start-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room_id: roomId, username }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate(`/multiGame/chatbox/${roomId}`);
    } else {
      alert(data.error);
    }
  };

  const formattedTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = String(timeLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white flex items-center justify-center px-6">
      {expired && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Room expired.</h2>
            <Link to="/multiGame/multiplayer">
              <button className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                OK
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="w-full max-w-xl flex flex-col items-center">

        <img src={logo} className="w-20 h-20 md:w-32 md:h-32 mb-8" />

        <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg w-full flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4">Waiting for players...</h3>

          <h3 className="text-2xl font-bold mb-3">{players.length}/5</h3>

          {/* List */}
          <div className="w-full bg-white rounded-lg p-3 mb-5">
            {players.map((p) => (
              <p key={p} className="text-center text-black">
                {p}
              </p>
            ))}
          </div>

          {/* Timer */}
          <p className="text-sm text-gray-700 mb-6">
            Room expires in <strong>{formattedTime()}</strong>
          </p>

          {/* Host buttons */}
          {isHost ? (
            <>
              <button
                onClick={handleStart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mb-3"
              >
                START
              </button>

              <Link to="/multiGame/multiplayer">
                <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
                  Cancel
                </button>
              </Link>
            </>
          ) : (
            <Link to="/multiGame/multiplayer">
              <button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold">
                Cancel
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Alerts */}
      {alertOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white text-black rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">
              At least 3 players required.
            </h2>
            <button
              onClick={() => setAlertOpen(false)}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
