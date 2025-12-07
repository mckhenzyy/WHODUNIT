// import logo from "../../assets/logo.png";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:5001");


// export default function Chatbox() {

  

//   const navigate = useNavigate();
//   const [showCaseEnded, setShowCaseEnded] = useState(false);

//   // TEMP: role (easy to replace with backend later)
//   const isSuspect = false; // change to true to test suspect UI

//   // CONSTANTS
//   const INITIAL_DURATION = 15 * 60; // 15 minutes
//   const EXTENSION_DURATION = 5 * 60; // 5 minutes
//   const VOTING_UNLOCK_SECONDS = 5 * 60; // must run 5 minutes before voting

//   // CHAT MESSAGES
//   const [messages, setMessages] = useState([
//     {
//       sender: "AnalieTheSupper",
//       text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     },
//     {
//       sender: "AnalieTheSupper",
//       text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   // POPUPS
//   const [showStory, setShowStory] = useState(false);
//   const [showClues, setShowClues] = useState(false);
//   const [showVoting, setShowVoting] = useState(false);
//   const [showLeave, setShowLeave] = useState(false);
//   const [showExtend, setShowExtend] = useState(false);
//   const [showTooSoonVoting, setShowTooSoonVoting] = useState(false);
//   const [showVotingLocked, setShowVotingLocked] = useState(false);

//   // TIMER
//   const [timeLeft, setTimeLeft] = useState(INITIAL_DURATION);
//   const [totalDuration, setTotalDuration] = useState(INITIAL_DURATION);
//   const [elapsedFromStart, setElapsedFromStart] = useState(0);
//   const [extended, setExtended] = useState(false); // unlock clue #2

//   // VOTING
//   const players = ["AnalieTheSupper", "HahaNotMe", "NeverImpostor", "JaneTheHero"];

//   const [tempVote, setTempVote] = useState(""); // current selection inside popup
//   const [confirmedVote, setConfirmedVote] = useState(""); // stored vote
//   const [hasVoted, setHasVoted] = useState(false); // at least one confirm
//   const [hasChangedVote, setHasChangedVote] = useState(false); // second confirm done

//   // FORMAT TIMER
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   useEffect(() => {
//   socket.emit("join_room", { room_id, username });

//   socket.on("receive_message", (msg) => {
//     setMessages((prev) => [...prev, msg]);
//   });

//   socket.on("system_message", (msg) => {
//     setMessages((prev) => [...prev, { sender: "SYSTEM", text: msg.text }]);
//   });

// }, []);


// const handleSend = () => {
//   socket.emit("send_message", {
//     room_id,
//     username,
//     text: input
//   });

//   setInput("");
// };


//   // TIMER COUNTDOWN
//   useEffect(() => {
//   if (timeLeft <= 0) {
//     // If NOT extended yet → show "grab extension" popup
//     if (!extended) {
//       setShowExtend(true);
//     } else {
//       // If already extended and timer ends → show final result popup
//       setShowCaseEnded(true);
//     }
//     return;
//   }

//   const interval = setInterval(() => {
//     setTimeLeft((prev) => prev - 1);
//     setElapsedFromStart((prev) => prev + 1);
//   }, 1000);

//   return () => clearInterval(interval);
// }, [timeLeft, extended]);


//   // SEND MESSAGE
//   const handleSend = () => {
//     if (!input.trim()) return;

//     setMessages([
//       ...messages,
//       {
//         sender: "You",
//         text: input,
//       },
//     ]);

//     setInput("");
//   };

//   // HANDLE VOTING OPEN
//   const handleOpenVoting = () => {
//     // 1) too early?
//     if (elapsedFromStart < VOTING_UNLOCK_SECONDS) {
//       setShowTooSoonVoting(true);
//       return;
//     }

//     // 2) already changed once? no more changes allowed
//     if (hasVoted && hasChangedVote) {
//       setShowVotingLocked(true);
//       return;
//     }

//     // 3) open voting popup, pre-select previous vote if any
//     setTempVote(confirmedVote || "");
//     setShowVoting(true);
//   };

//   // TEXT FOR VOTING POPUP (depends on role + whether first/second)
//   const isSecondVoting = hasVoted && !hasChangedVote;

//   let votingTitle = "";
//   if (!isSuspect) {
//     if (!hasVoted) {
//       votingTitle =
//         "Select to vote for the suspect. You can change your vote later for only one (1) time. Please be careful, justice is what we need.";
//     } else {
//       votingTitle =
//         "Change your vote? After changing your vote, you can never change it once again. This could be your downfall or your last chance to win. Think again.";
//     }
//   } else {
//     if (!hasVoted) {
//       votingTitle = "Fake it 'til you make it. Select the \"fake\" suspect here.";
//     } else {
//       votingTitle = "Change your vote? This is your last chance.";
//     }
//   }

//   // MINUTES LEFT BEFORE VOTING UNLOCKS
//   const secondsUntilVoting = Math.max(0, VOTING_UNLOCK_SECONDS - elapsedFromStart);
//   const minutesUntilVoting = Math.ceil(secondsUntilVoting / 60);

//   return (
//     <div className="w-full min-h-screen flex bg-black">
//       {/* LEFT SIDEBAR */}
//       <div className="w-[260px] bg-[#1a1a1a] flex justify-center items-center border-r border-gray-700">
//         <img src={logo} className="w-40 select-none" />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col p-8">
//         {/* MAIN WHITE CARD */}
//         <div className="bg-white rounded-2xl p-8 flex flex-col flex-1">
//           {/* HEADER */}
//           <div className="flex justify-between mb-6">
//             <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-semibold">
//               Chat room of: 8327298-389283982933
//             </div>

//             <div className="text-blue-600 font-semibold text-sm">
//               Timer:{" "}
//               <span className="text-blue-800">
//                 {formatTime(timeLeft)} / {formatTime(totalDuration)}
//               </span>
//             </div>
//           </div>

//           {/* CHAT MESSAGES */}
//           <div className="flex-1 overflow-y-auto pr-4">
//             {messages.map((msg, i) => {
//               const isYou = msg.sender === "You";

//               return (
//                 <div
//                   key={i}
//                   className={`flex mb-6 ${isYou ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`flex ${
//                       isYou ? "flex-row-reverse" : "flex-row"
//                     } items-start gap-3`}
//                   >
//                     {/* Avatar */}
//                     <div className="w-10 h-10 rounded-full bg-gray-400 text-black flex items-center justify-center font-bold">
//                       {msg.sender[0]}
//                     </div>

//                     {/* Bubble */}
//                     <div className={isYou ? "text-right" : "text-left"}>
//                       <div className="p-4 rounded-lg max-w-[650px] bg-gray-300">
//                         {msg.text}
//                       </div>
//                       <p className="text-xs text-gray-700 mt-1">{msg.sender}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* NAV BUTTONS */}
//           <div className="flex gap-6 mt-5 text-blue-600 font-semibold">
//             <button onClick={() => setShowStory(true)}>Story</button>
//             <button onClick={() => setShowClues(true)}>Clues</button>
//             <button onClick={handleOpenVoting}>Voting</button>
//             <button
//               onClick={() => setShowLeave(true)}
//               className="text-red-600"
//             >
//               Leave
//             </button>
//           </div>

//           {/* INPUT */}
//           <div className="flex mt-6">
//             <input
//               type="text"
//               placeholder="Type here..."
//               className="flex-1 bg-gray-200 p-3 rounded-md text-black"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               className="ml-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
//             >
//               SEND
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ====================== POPUPS ========================== */}

//       {/* STORY POPUP */}
//       {showStory && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8 shadow-lg">
//             <h1 className="text-xl font-bold mb-4 text-center">Story</h1>

//             <p className="text-gray-700 leading-relaxed text-center mb-6">
//               Full story content will be placed here...
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowStory(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CLUES POPUP */}
//       {showClues && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8 shadow-lg">
//             <h1 className="text-xl font-bold mb-4 text-center">Clues</h1>

//             <p className="text-gray-700 leading-relaxed text-center mb-4">
//               🔍 Clue #1: The suspect was seen near the hallway at 9:13 PM.
//             </p>

//             {extended && (
//               <p className="text-gray-700 leading-relaxed text-center mb-6">
//                 🔍 Clue #2: A witness confirms the suspect dropped an object.
//               </p>
//             )}

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowClues(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VOTING POPUP */}
//       {showVoting && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-16 z-50">
//           <div className="bg-white w-[90%] max-w-4xl rounded-xl p-10">
//             <h1 className="text-xl font-bold text-center mb-8">{votingTitle}</h1>

//             {/* Names */}
//             <div className="flex flex-col items-center gap-3 mb-8">
//               {players.map((p) => {
//                 const isPrevVote = isSecondVoting && confirmedVote === p;
//                 const isSelected = tempVote === p;

//                 const colorClass = isSelected ? "text-red-600" : "text-black";
//                 const underlineClass = isPrevVote && !isSelected ? "underline" : "";

//                 return (
//                   <button
//                     type="button"
//                     key={p}
//                     onClick={() => setTempVote(p)}
//                     className={`text-lg ${colorClass} ${underlineClass} hover:text-red-600`}
//                   >
//                     {p}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Confirm / Cancel */}
//             <div className="flex justify-center gap-10">
//               <button
//                 onClick={() => {
//                   // Only save when confirming
//                   if (!tempVote) return;

//                   if (!hasVoted) {
//                     setConfirmedVote(tempVote);
//                     setHasVoted(true);
//                   } else if (!hasChangedVote) {
//                     setConfirmedVote(tempVote);
//                     setHasChangedVote(true);
//                   }
//                   setShowVoting(false);
//                 }}
//                 disabled={!tempVote}
//                 className={`font-semibold ${
//                   tempVote
//                     ? "text-black-600 hover:underline"
//                     : "text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Confirm
//               </button>

//               <button
//                 onClick={() => {
//                   setTempVote(confirmedVote || "");
//                   setShowVoting(false);
//                 }}
//                 className="font-semibold text-black-600 hover:underline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LEAVE POPUP */}
//       {showLeave && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-16 z-50">
//           <div className="bg-white w-[90%] max-w-4xl rounded-xl p-10">
//             <h1 className="text-xl font-bold text-center mb-10">
//               That’s a very critical decision. Players need your support.
//               Leaving the room means leaving this case.
//             </h1>

//             <div className="flex justify-between px-10">
//               <button
//                 onClick={() => setShowLeave(false)}
//                 className="text-blue-600 text-lg font-semibold hover:underline"
//               >
//                 GO BACK
//               </button>

//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="text-red-600 text-lg font-semibold hover:underline"
//               >
//                 FORCE EXIT
//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* TIMER EXPIRED POPUP (EXTENSION) */}
//       {showExtend && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-8">
//               There's a chance to extend for 5 minutes. Grab chance?  
//               Another clue is also available.
//             </p>

//             <div className="flex justify-between px-10">
//               {/* NO = go to results */}
//               <button
//                 onClick={() => {
//                   setShowExtend(false);
//                   navigate("/result");   // 🔥 route to result.jsx
//                 }}
//                 className="text-red-600 font-semibold hover:underline"
//               >
//                 No
//               </button>

//               {/* YES = apply extension */}
//               <button
//                 onClick={() => {
//                   setShowExtend(false);
//                   setTimeLeft(EXTENSION_DURATION);
//                   setTotalDuration(EXTENSION_DURATION);
//                   setExtended(true);
//                 }}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Grab extension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* TOO SOON TO VOTE POPUP */}
//       {showTooSoonVoting && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-6">
//               It’s too soon, voting is allowed after {minutesUntilVoting}{" "}
//               minute{minutesUntilVoting !== 1 ? "s" : ""}.
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowTooSoonVoting(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VOTING LOCKED (ALREADY CHANGED ONCE) */}
//       {showVotingLocked && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-6">
//               You have already used your last chance to change your vote.
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowVotingLocked(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CASE ENDED POPUP */}
//       {showCaseEnded && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-8">
//               Case has ended. See results now.
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => navigate("/result")}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Okay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



// import logo from "../../assets/logo.png";
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { io } from "socket.io-client";

// // SOCKET CONNECTION (only one instance)
// const socket = io("http://localhost:5001");

// export default function Chatbox() {
//   const { roomId } = useParams(); // from URL: /chatbox/:roomId

//   // Normally username comes from login
//   const username = localStorage.getItem("username");
//   const navigate = useNavigate(); // if not already

//   if (!username) {
//     navigate("/");
//     return null;
//   }


//   // CHAT STATE
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   // POPUPS & GAME STATE (your original UI unchanged)
//   const [showStory, setShowStory] = useState(false);
//   const [showClues, setShowClues] = useState(false);
//   const [showVoting, setShowVoting] = useState(false);
//   const [showLeave, setShowLeave] = useState(false);
//   const [showExtend, setShowExtend] = useState(false);
//   const [showTooSoonVoting, setShowTooSoonVoting] = useState(false);
//   const [showVotingLocked, setShowVotingLocked] = useState(false);
//   const [showCaseEnded, setShowCaseEnded] = useState(false);

//   const INITIAL_DURATION = 15 * 60; 
//   const EXTENSION_DURATION = 5 * 60; 
//   const VOTING_UNLOCK_SECONDS = 5 * 60; 

//   const [timeLeft, setTimeLeft] = useState(INITIAL_DURATION);
//   const [totalDuration, setTotalDuration] = useState(INITIAL_DURATION);
//   const [elapsedFromStart, setElapsedFromStart] = useState(0);
//   const [extended, setExtended] = useState(false);

//   // Voting
//   const [players, setPlayers] = useState([]); // backend can fill this later
//   const [tempVote, setTempVote] = useState("");
//   const [confirmedVote, setConfirmedVote] = useState("");
//   const [hasVoted, setHasVoted] = useState(false);
//   const [hasChangedVote, setHasChangedVote] = useState(false);

//   // TIMER FORMATTER
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   // ===========================================
//   //  SOCKET.IO — JOIN ROOM & LISTEN FOR MESSAGES
//   // ===========================================
//   useEffect(() => {
//     if (!roomId || !username) return;

//     // JOIN ROOM
//     socket.emit("join_room", {
//       room_id: roomId,
//       username,
//     });

//     // Receive chat messages
//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // System messages ("Player entered", etc.)
//     socket.on("system_message", (msg) => {
//       setMessages((prev) => [...prev, { sender: "SYSTEM", text: msg.text }]);
//     });

//     // Receive player list update
//     socket.on("players_update", (list) => {
//       setPlayers(list);
//     });

//     return () => {
//       socket.emit("leave_room", { room_id: roomId, username });
//       socket.off("receive_message");
//       socket.off("system_message");
//       socket.off("players_update");
//     };
//   }, [roomId, username]);

//   // ===========================================
//   // SEND MESSAGE
//   // ===========================================
//   const handleSend = () => {
//     if (!input.trim()) return;

//     socket.emit("send_message", {
//       room_id: roomId,
//       user: username,
//       text: input,
//     });

//     setInput("");
//   };

//   // ===========================================
//   // TIMER EFFECT
//   // ===========================================
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       if (!extended) {
//         setShowExtend(true);
//       } else {
//         setShowCaseEnded(true);
//       }
//       return;
//     }

//     const t = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//       setElapsedFromStart((prev) => prev + 1);
//     }, 1000);

//     return () => clearInterval(t);
//   }, [timeLeft, extended]);

//   // ===========================================
//   // VOTING BUTTON
//   // ===========================================
//   const handleOpenVoting = () => {
//     if (elapsedFromStart < VOTING_UNLOCK_SECONDS) {
//       setShowTooSoonVoting(true);
//       return;
//     }

//     if (hasVoted && hasChangedVote) {
//       setShowVotingLocked(true);
//       return;
//     }

//     setTempVote(confirmedVote || "");
//     setShowVoting(true);
//   };

//   // VOTING TITLE LOGIC (unchanged)
//   const isSuspect = false;
//   const isSecondVoting = hasVoted && !hasChangedVote;

//   let votingTitle = "";
//   if (!isSuspect) {
//     votingTitle = !hasVoted
//       ? "Select to vote for the suspect..."
//       : "Change your vote? This is your last chance.";
//   } else {
//     votingTitle = !hasVoted
//       ? "Fake your vote..."
//       : "Change your fake vote...";
//   }

//   // TIME BEFORE VOTING ALLOWED
//   const secondsUntilVoting = Math.max(
//     0,
//     VOTING_UNLOCK_SECONDS - elapsedFromStart
//   );
//   const minutesUntilVoting = Math.ceil(secondsUntilVoting / 60);

//   return (
//     <div className="w-full min-h-screen flex bg-black">
//       {/* LEFT SIDEBAR */}
//       <div className="w-[260px] bg-[#1a1a1a] flex justify-center items-center border-r border-gray-700">
//         <img src={logo} className="w-40 select-none" />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col p-8">
//         <div className="bg-white rounded-2xl p-8 flex flex-col flex-1">
//           {/* HEADER */}
//           <div className="flex justify-between mb-6">
//             <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-semibold">
//               Chat room: {roomId}
//             </div>

//             <div className="text-blue-600 font-semibold text-sm">
//               Timer:
//               <span className="text-blue-800">
//                 {" "}
//                 {formatTime(timeLeft)} / {formatTime(totalDuration)}
//               </span>
//             </div>
//           </div>

//           {/* CHAT MESSAGES */}
//           <div className="flex-1 overflow-y-auto pr-4">
//             {messages.map((msg, i) => {
//               const isYou = msg.user === username;
//               return (
//                 <div
//                   key={i}
//                   className={`flex mb-6 ${
//                     isYou ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`flex ${
//                       isYou ? "flex-row-reverse" : "flex-row"
//                     } items-start gap-3`}
//                   >
//                     <div className="w-10 h-10 rounded-full bg-gray-400 text-black flex items-center justify-center font-bold">
//                       {(msg.user || msg.sender)[0]}
//                     </div>

//                     <div className={isYou ? "text-right" : "text-left"}>
//                       <div className="p-4 rounded-lg max-w-[650px] bg-gray-300">
//                         {msg.text}
//                       </div>
//                       <p className="text-xs text-gray-700 mt-1">
//                         {msg.user || msg.sender}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* NAV BUTTONS */}
//           <div className="flex gap-6 mt-5 text-blue-600 font-semibold">
//             <button onClick={() => setShowStory(true)}>Story</button>
//             <button onClick={() => setShowClues(true)}>Clues</button>
//             <button onClick={handleOpenVoting}>Voting</button>
//             <button onClick={() => setShowLeave(true)} className="text-red-600">
//               Leave
//             </button>
//           </div>

//           {/* INPUT */}
//           <div className="flex mt-6">
//             <input
//               type="text"
//               placeholder="Type here..."
//               className="flex-1 bg-gray-200 p-3 rounded-md text-black"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               className="ml-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
//             >
//               SEND
//             </button>
//           </div>
//         </div>
//       </div>

//             {/* ====================== POPUPS ========================== */}

//       {/* STORY POPUP */}
//       {showStory && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8 shadow-lg">
//             <h1 className="text-xl font-bold mb-4 text-center">Story</h1>

//             <p className="text-gray-700 leading-relaxed text-center mb-6">
//               Full story content will be placed here...
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowStory(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CLUES POPUP */}
//       {showClues && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8 shadow-lg">
//             <h1 className="text-xl font-bold mb-4 text-center">Clues</h1>

//             <p className="text-gray-700 leading-relaxed text-center mb-4">
//               🔍 Clue #1: The suspect was seen near the hallway at 9:13 PM.
//             </p>

//             {extended && (
//               <p className="text-gray-700 leading-relaxed text-center mb-6">
//                 🔍 Clue #2: A witness confirms the suspect dropped an object.
//               </p>
//             )}

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowClues(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VOTING POPUP */}
//       {showVoting && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-16 z-50">
//           <div className="bg-white w-[90%] max-w-4xl rounded-xl p-10">
//             <h1 className="text-xl font-bold text-center mb-8">{votingTitle}</h1>

//             {/* Names */}
//             <div className="flex flex-col items-center gap-3 mb-8">
//               {players.map((p) => {
//                 const isPrevVote = isSecondVoting && confirmedVote === p;
//                 const isSelected = tempVote === p;

//                 const colorClass = isSelected ? "text-red-600" : "text-black";
//                 const underlineClass = isPrevVote && !isSelected ? "underline" : "";

//                 return (
//                   <button
//                     type="button"
//                     key={p}
//                     onClick={() => setTempVote(p)}
//                     className={`text-lg ${colorClass} ${underlineClass} hover:text-red-600`}
//                   >
//                     {p}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Confirm / Cancel */}
//             <div className="flex justify-center gap-10">
//               <button
//                 onClick={() => {
//                   // Only save when confirming
//                   if (!tempVote) return;

//                   if (!hasVoted) {
//                     setConfirmedVote(tempVote);
//                     setHasVoted(true);
//                   } else if (!hasChangedVote) {
//                     setConfirmedVote(tempVote);
//                     setHasChangedVote(true);
//                   }
//                   setShowVoting(false);
//                 }}
//                 disabled={!tempVote}
//                 className={`font-semibold ${
//                   tempVote
//                     ? "text-black-600 hover:underline"
//                     : "text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Confirm
//               </button>

//               <button
//                 onClick={() => {
//                   setTempVote(confirmedVote || "");
//                   setShowVoting(false);
//                 }}
//                 className="font-semibold text-black-600 hover:underline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LEAVE POPUP */}
//       {showLeave && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-16 z-50">
//           <div className="bg-white w-[90%] max-w-4xl rounded-xl p-10">
//             <h1 className="text-xl font-bold text-center mb-10">
//               That’s a very critical decision. Players need your support.
//               Leaving the room means leaving this case.
//             </h1>

//             <div className="flex justify-between px-10">
//               <button
//                 onClick={() => setShowLeave(false)}
//                 className="text-blue-600 text-lg font-semibold hover:underline"
//               >
//                 GO BACK
//               </button>

//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="text-red-600 text-lg font-semibold hover:underline"
//               >
//                 FORCE EXIT
//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* TIMER EXPIRED POPUP (EXTENSION) */}
//       {showExtend && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-8">
//               There's a chance to extend for 5 minutes. Grab chance?  
//               Another clue is also available.
//             </p>

//             <div className="flex justify-between px-10">
//               {/* NO = go to results */}
//               <button
//                 onClick={() => {
//                   setShowExtend(false);
//                   navigate("/result");   // 🔥 route to result.jsx
//                 }}
//                 className="text-red-600 font-semibold hover:underline"
//               >
//                 No
//               </button>

//               {/* YES = apply extension */}
//               <button
//                 onClick={() => {
//                   setShowExtend(false);
//                   setTimeLeft(EXTENSION_DURATION);
//                   setTotalDuration(EXTENSION_DURATION);
//                   setExtended(true);
//                 }}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Grab extension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* TOO SOON TO VOTE POPUP */}
//       {showTooSoonVoting && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-6">
//               It’s too soon, voting is allowed after {minutesUntilVoting}{" "}
//               minute{minutesUntilVoting !== 1 ? "s" : ""}.
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowTooSoonVoting(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VOTING LOCKED (ALREADY CHANGED ONCE) */}
//       {showVotingLocked && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-6">
//               You have already used your last chance to change your vote.
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowVotingLocked(false)}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CASE ENDED POPUP */}
//       {showCaseEnded && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
//           <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
//             <p className="text-center text-lg font-semibold mb-8">
//               Case has ended. See results now.
//             </p>

//             <div className="flex justify-center">
//               <button
//                 onClick={() => navigate("/result")}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Okay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




// frontend/src/pages/multiGame/chatbox.jsx

import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export default function Chatbox() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const username =
    JSON.parse(localStorage.getItem("user"))?.username ||
    localStorage.getItem("username");

  if (!username) {
    navigate("/");
    return null;
  }

  // CHAT
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // GAME FLOW POPUPS
  const [showStory, setShowStory] = useState(false);
  const [showClues, setShowClues] = useState(false);
  const [showVoting, setShowVoting] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showExtend, setShowExtend] = useState(false);
  const [showTooSoonVoting, setShowTooSoonVoting] = useState(false);
  const [showVotingLocked, setShowVotingLocked] = useState(false);
  const [showCaseEnded, setShowCaseEnded] = useState(false);

  const [votingRequestState, setVotingRequestState] = useState({
    initiator: null,
    requests: {},
    players: [],
  });

  // TIMER STATES (SERVER-SYNCED)
  const [startedAt, setStartedAt] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [extended, setExtended] = useState(false);

  // VOTING
  const [players, setPlayers] = useState([]);
  const [tempVote, setTempVote] = useState("");
  const [confirmedVote, setConfirmedVote] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [hasChangedVote, setHasChangedVote] = useState(false);

  const formatTime = (seconds) => {
    if (seconds == null) return "...";
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // =====================================================
  // 1. FETCH MATCH INFO (sync timer from server)
  // =====================================================
  useEffect(() => {
    if (!roomId) return;

    const loadMatch = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/multi/match-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ room_id: roomId, username }),
        });

        const data = await res.json();

        if (res.ok) {
          setPlayers(data.players || []);
          setStartedAt(data.started_at);
          setTotalDuration(data.total_duration);

          const now = Math.floor(Date.now() / 1000);
          const endTime = data.started_at + data.total_duration;
          const remaining = Math.max(0, endTime - now);

          setTimeLeft(remaining);
        }
      } catch (err) {
        console.log("Error fetching match-info:", err);
      }
    };

    loadMatch();
  }, [roomId, username]);

  // =====================================================
  // 2. TRUE GLOBAL TIMER (synced for all players)
  // =====================================================
  useEffect(() => {
    if (!startedAt || !totalDuration) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const endTime = startedAt + totalDuration;
      const remaining = endTime - now;

      if (remaining <= 0) {
        setTimeLeft(0);

        if (!extended) setShowExtend(true);
        else setShowCaseEnded(true);

        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, totalDuration, extended]);

  // =====================================================
  // 3. SOCKET.IO EVENTS
  // =====================================================
  useEffect(() => {
    if (!roomId || !username) return;

    socket.emit("join_room", { room_id: roomId, username });

    socket.on("receive_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("system_message", (msg) =>
      setMessages((prev) => [...prev, { sender: "SYSTEM", text: msg.text }])
    );

    socket.on("players_update", (list) => setPlayers(list || []));

    socket.on("voting_requested", (payload) => {
      setVotingRequestState(payload);
      if (payload.initiator !== username) {
        setShowRequestModal(true);
      }
    });

    socket.on("voting_unlocked", () => {
      setShowRequestModal(false);
      setShowVoting(true);
    });

    return () => {
      socket.emit("leave_room", { room_id: roomId, username });
      socket.off("receive_message");
      socket.off("system_message");
      socket.off("players_update");
      socket.off("voting_requested");
      socket.off("voting_unlocked");
    };
  }, [roomId, username]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================
  const handleSend = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      room_id: roomId,
      user: username,
      text: input,
    });

    setInput("");
  };

  // =====================================================
  // VOTING (MAJORITY UNLOCK)
  // =====================================================
  const requestVoting = () => {
    socket.emit("request_voting", { room_id: roomId, username });
  };

  const respondVoting = (accept) => {
    socket.emit("respond_voting", {
      room_id: roomId,
      username,
      accept: !!accept,
    });
    setShowRequestModal(false);
  };

  const confirmVote = () => {
    if (!tempVote) return;

    if (!hasVoted) {
      setConfirmedVote(tempVote);
      setHasVoted(true);
    } else if (!hasChangedVote) {
      setConfirmedVote(tempVote);
      setHasChangedVote(true);
    }

    setShowVoting(false);
  };

  const handleOpenVoting = () => {
    requestVoting();
  };

  // =====================================================================
  // RENDER UI
  // =====================================================================
  return (
    <div className="w-full min-h-screen flex bg-black">

      {/* LEFT LOGO PANEL */}
      <div className="w-[260px] bg-[#1a1a1a] flex justify-center items-center border-r border-gray-700">
        <img src={logo} className="w-40" />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col p-8">
        <div className="bg-white rounded-2xl p-8 flex flex-col flex-1">

          {/* HEADER */}
          <div className="flex justify-between mb-6">
            <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-semibold">
              Chat room: {roomId}
            </div>
            <div className="text-blue-600 font-semibold text-sm">
              Timer:{" "}
              <span className="text-blue-800">
                {formatTime(timeLeft)} / {formatTime(totalDuration)}
              </span>
            </div>
          </div>

          {/* CHAT LOG */}
          <div className="flex-1 overflow-y-auto pr-4">
            {messages.map((msg, i) => {
              const isYou =
                msg.user === username ||
                msg.sender === username ||
                msg.sender === "You";

              return (
                <div
                  key={i}
                  className={`flex mb-6 ${
                    isYou ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex ${
                      isYou ? "flex-row-reverse" : "flex-row"
                    } items-start gap-3`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-400 text-black flex items-center justify-center font-bold">
                      {(msg.user || msg.sender || "U")[0]}
                    </div>
                    <div className={isYou ? "text-right" : "text-left"}>
                      <div className="p-4 rounded-lg max-w-[650px] bg-gray-300">
                        {msg.text}
                      </div>
                      <p className="text-xs text-gray-700 mt-1">
                        {msg.user || msg.sender}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-6 mt-5 text-blue-600 font-semibold">
            <button onClick={() => setShowStory(true)}>Story</button>
            <button onClick={() => setShowClues(true)}>Clues</button>
            <button onClick={handleOpenVoting}>Voting</button>
            <button
              onClick={() => setShowLeave(true)}
              className="text-red-600"
            >
              Leave
            </button>
          </div>

          {/* INPUT */}
          <div className="flex mt-6">
            <input
              type="text"
              placeholder="Type here..."
              className="flex-1 bg-gray-200 p-3 rounded-md text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              SEND
            </button>
          </div>
        </div>
      </div>

      {/* ===========================================================
          MODALS (FULL, NO CUTS)
      =========================================================== */}

      {/* Voting Request */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-3">
              {votingRequestState.initiator} requests to start voting
            </h3>
            <p className="text-sm mb-4">
              Do you accept starting the voting now?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => respondVoting(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Accept
              </button>
              <button
                onClick={() => respondVoting(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Decline
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Players who accepted:
              <ul className="mt-2 max-h-24 overflow-auto">
                {Object.entries(votingRequestState.requests || {}).map(
                  ([u, state]) =>
                    state?.accepted ? <li key={u}>{u}</li> : null
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Voting Popup */}
      {showVoting && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-16 z-50">
          <div className="bg-white w-[90%] max-w-4xl rounded-xl p-10">
            <h1 className="text-xl font-bold text-center mb-8">Vote</h1>

            <div className="flex flex-col items-center gap-3 mb-8">
              {players.map((p) => (
                <button
                  key={p}
                  onClick={() => setTempVote(p)}
                  className={`text-lg ${
                    tempVote === p ? "text-red-600" : "text-black"
                  } hover:text-red-600`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-10">
              <button
                onClick={confirmVote}
                disabled={!tempVote}
                className={`font-semibold ${
                  tempVote
                    ? "text-black hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>

              <button
                onClick={() => setShowVoting(false)}
                className="font-semibold text-black hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STORY */}
      {showStory && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8 shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Story</h1>
            <p className="text-gray-700 text-center mb-6">
              Story will appear here...
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowStory(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLUES */}
      {showClues && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8 shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Clues</h1>
            <p className="text-gray-700 text-center mb-4">
              🔍 Clue #1: The suspect was seen at 9:13 PM.
            </p>
            {extended && (
              <p className="text-gray-700 text-center mb-6">
                🔍 Clue #2: A witness confirms the suspect dropped an object.
              </p>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => setShowClues(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEAVE */}
      {showLeave && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-16 z-50">
          <div className="bg-white w-[90%] max-w-4xl rounded-xl p-10">
            <h1 className="text-xl font-bold text-center mb-10">
              Leaving the room will exit you from this case.
            </h1>
            <div className="flex justify-between px-10">
              <button
                onClick={() => setShowLeave(false)}
                className="text-blue-600 font-semibold hover:underline text-lg"
              >
                GO BACK
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-red-600 font-semibold hover:underline text-lg"
              >
                FORCE EXIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXTEND */}
      {showExtend && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
            <p className="text-center text-lg font-semibold mb-8">
              Extend for +5 minutes and unlock another clue?
            </p>
            <div className="flex justify-between px-10">
              <button
                onClick={() => {
                  setShowExtend(false);
                  navigate(`/multiGame/result/${roomId}`);
                }}
                className="text-red-600 font-semibold hover:underline"
              >
                No
              </button>
              <button
                onClick={() => {
                  setShowExtend(false);
                  setTotalDuration(300);
                  setTimeLeft(300);
                  setExtended(true);
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOO EARLY VOTING */}
      {showTooSoonVoting && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
            <p className="text-center text-lg font-semibold mb-6">
              Voting not allowed yet.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowTooSoonVoting(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VOTING LOCKED */}
      {showVotingLocked && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
            <p className="text-center text-lg font-semibold mb-6">
              You can't change your vote again.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowVotingLocked(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CASE ENDED */}
      {showCaseEnded && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl p-8">
            <p className="text-center text-lg font-semibold mb-8">
              Case ended. View results?
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate(`/multiGame/result/${roomId}`)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
