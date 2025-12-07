import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";

export default function SoloStory() {
  const navigate = useNavigate();

  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    // Fade in card
    setTimeout(() => setShowCard(true), 200);

    const startSoloGame = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("You must log in first!");
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        
        // const API = import.meta.env.VITE_API_BASE_URL;

        // const res = await fetch("http://localhost:5001/api/solo/start-game"

        // const res = await fetch(`${API}/api/solo/start-game`
        const res = await fetch("http://localhost:5001/api/solo/start-game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          alert(data.error || "Failed to start solo game");
          return;
        }

        localStorage.setItem("solo_session", data.session_id);
        localStorage.setItem("solo_story", data.story);
        localStorage.setItem("solo_suspects", JSON.stringify(data.suspects));
        localStorage.setItem(
          "solo_clues",
          JSON.stringify({
            clue1: data.clues?.clue1 || data.clue1 || "No clue yet.",
            clue2: null,
          })
        );

        setStory(data.story || "AI failed to generate the story. Please try again.");
      } catch (err) {
        console.error(err);
        setLoading(false);
        alert("Error connecting to server.");
      }
    };

    startSoloGame();
  }, [navigate]);

  // Slides (story + ending line)
  const slides = [
    loading ? "AI is generating the crime story, please wait a moment..." : story,
    "You have two chances to catch the real culprit. With your help, justice will rise.",
  ];

  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

      {/* MAIN CONTENT */}
      <div
        className={`
          relative z-10 w-full max-w-2xl 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-3xl p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)]
          transition-all duration-700
          ${showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="WHODUNIT logo"
            className="w-28 h-28 md:w-40 md:h-40 drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] animate-glow"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-center text-3xl font-extrabold text-white mb-6 tracking-wide">
          AI CRIME STORY
        </h1>

        {/* STORY CARD */}
        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-h-[380px] overflow-auto shadow-inner">
          <p className="text-lg leading-relaxed text-black-100 whitespace-pre-line text-center">
            {slides[currentIndex]}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center">
          {!isLastSlide && (
            <button
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-[#800000] hover:bg-[#990000] disabled:bg-[#4d0000] text-white py-3 rounded-xl font-bold tracking-wide transition"
            >
              {loading ? "Generating..." : "NEXT"}
            </button>
          )}

          {isLastSlide && (
            <button
              onClick={() => navigate("/soloGame/solo_chatbox")}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold tracking-wide transition"
            >
              START INVESTIGATION
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
