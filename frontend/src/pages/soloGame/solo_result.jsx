import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SoloResult() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [show, setShow] = useState(false); // animation control

  useEffect(() => {
    const raw = localStorage.getItem("solo_result");
    if (!raw) {
      navigate("/dashboard");
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setResultData(parsed);

      // delay small fade animation
      setTimeout(() => setShow(true), 150);
    } catch {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (!resultData) return null;

  const { result, suspect, explanation } = resultData;
  const isWin = result === "win";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-10 
      bg-[#1c1b1c] text-white relative overflow-hidden"
    >
      {/* DARK BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* MAIN RESULT CARD */}
      <div
        className={`
          relative z-10 w-full max-w-xl
          p-8 md:p-10 rounded-3xl
          backdrop-blur-xl bg-white/10 border border-white/20
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
          transition-all duration-700 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="WHODUNIT logo"
            className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
          />
        </div>

        {/* TITLE */}
        <h1
          className={`
            text-center text-3xl md:text-4xl font-extrabold tracking-wider mb-2
            ${isWin ? "text-green-400" : "text-red-500"}
          `}
        >
          {isWin ? "CASE SOLVED" : "CASE FAILED"}
        </h1>

        {/* SUBTEXT */}
        <p className="text-center text-gray-300 mb-6 text-sm">
          {isWin ? "Justice has been served." : "Justice was not achieved."}
        </p>

        {/* SUSPECT BOX */}
        <div
          className={`
            mx-auto text-center px-5 py-3 rounded-xl text-base font-bold mb-8
            border shadow-inner
            ${isWin 
              ? "bg-green-900/50 border-green-500/30 text-green-300" 
              : "bg-red-900/40 border-red-500/30 text-red-300"
            }
          `}
        >
          {suspect}
          <p className="text-gray-400 font-normal text-xs mt-1">
            was the culprit.
          </p>
        </div>

        {/* EXPLANATION BOX */}
        <div
          className="
            bg-white/15 p-5 rounded-xl border border-white/20
            max-h-[220px] overflow-y-auto shadow-inner
            text-gray-200 text-sm leading-relaxed whitespace-pre-line mb-8
          "
        >
          {explanation}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4">
          <Link to="/soloGame/solo_story">
            <button className="
              w-full bg-[#800000] hover:bg-[#990000]
              text-white py-3 rounded-xl font-bold tracking-wide transition
            ">
              START NEW CASE
            </button>
          </Link>

          <Link to="/dashboard" className="text-center">
            <span className="text-gray-300 hover:text-white underline underline-offset-2 transition">
              Return to Dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
