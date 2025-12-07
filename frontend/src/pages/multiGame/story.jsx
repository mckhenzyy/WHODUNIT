// import logo from "../../assets/logo.png";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Story() {
//   const slides = [
//     "AI is randomly selecting the suspect...",
//     "AI is now generating the crime story...",
//     `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//      It has survived not only five centuries, but also the leap into electronic typesetting.
//      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
//     "Your role is the SUSPECT!"
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex < slides.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const isLastSlide = currentIndex === slides.length - 1;

//   return (
//     <div className="min-h-screen bg-[#1c1b1c] text-white flex items-center justify-center px-6">

//       <div className="flex flex-col items-center w-full max-w-3xl">

//         {/* LOGO */}
//         <img
//           src={logo}
//           alt="WHODUNIT logo"
//           className="w-20 h-20 md:w-32 md:h-32 mb-8"
//         />

//         {/* CARD */}
//         <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg w-full">

//           {/* SLIDE CONTENT */}
//           <div className="max-h-[420px] overflow-auto">
//             <p className="text-center text-lg leading-relaxed whitespace-pre-line">
//               {slides[currentIndex]}
//             </p>
//           </div>

//           {/* BUTTONS */}
//           <div className="mt-6">

//             {!isLastSlide && (
//               <button
//                 onClick={handleNext}
//                 className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold transition"
//               >
//                 NEXT
//               </button>
//             )}

//             {isLastSlide && (
//               <Link to="/multiGame/chatbox" className="w-full block">
//                 <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
//                   START
//                 </button>
//               </Link>
//             )}

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Story() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  // If not logged in, kick back to login
  if (!username) {
    navigate("/");
    return null;
  }

  const [slides, setSlides] = useState([
    "AI is randomly selecting the suspect...",
    "AI is now generating the crime story...",
    "Loading your side of the story...",
    "Determining your role in the case...",
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [role, setRole] = useState(null);        // "suspect" | "innocent"
  const [sideStory, setSideStory] = useState("");
  const [isSuspect, setIsSuspect] = useState(false);

  // ====================================================
  // FETCH MY ROLE + SIDE STORY FROM BACKEND
  // ====================================================
  useEffect(() => {
    if (!roomId || !username) return;

    const fetchMyRole = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/multi/my-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room_id: roomId,
            username: username,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          // e.g. "Player not in this room", "Room not found"
          setError(data.error || "Server returned an error.");
          setLoading(false);
          return;
        }

        // Data from backend:
        // role, side_story, story, clue1, clue2, is_suspect
        setRole(data.role);
        setSideStory(data.side_story || "");
        setIsSuspect(data.is_suspect);

        const roleLine = data.is_suspect
          ? "Your role is the SUSPECT. You know what really happened—defend yourself well."
          : "Your role is an INNOCENT. Analyze everyone’s motives and find the real suspect.";

        const newSlides = [
          "AI is randomly selecting the suspect...",
          "AI is now generating the crime story...",
          data.side_story ||
            "This is your personal perspective in the crime story. Use it to build your defense.",
          roleLine,
        ];

        setSlides(newSlides);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching my role:", err);
        setError("Server is not responding.");
        setLoading(false);
      }
    };

    fetchMyRole();
  }, [roomId, username]);

  // ====================================================
  //  NAVIGATION BETWEEN SLIDES
  // ====================================================
  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // On last slide → go to chatbox with roomId
      navigate(`/multiGame/chatbox/${roomId}`);
    }
  };

  // ====================================================
  //  RENDER
  // ====================================================
  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white flex items-center justify-center px-6">
      <div className="flex flex-col items-center w-full max-w-3xl">
        {/* LOGO */}
        <img
          src={logo}
          alt="WHODUNIT logo"
          className="w-20 h-20 md:w-32 md:h-32 mb-8"
        />

        {/* CARD */}
        <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg w-full">

          {/* ERROR STATE */}
          {error && (
            <div className="mb-6">
              <p className="text-center text-red-600 font-semibold mb-4">
                {error}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Retry
                </button>
                <Link to="/multiGame/multiplayer">
                  <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                    Back to lobby
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* NORMAL CONTENT */}
          {!error && (
            <>
              {/* SLIDE TEXT */}
              <div className="max-h-[420px] overflow-auto">
                <p className="text-center text-lg leading-relaxed whitespace-pre-line">
                  {loading ? "Please wait... connecting to the server." : slides[currentIndex]}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {loading
                    ? "GENERATING STORY..."
                    : isLastSlide
                    ? "START"
                    : "NEXT"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
