import logo from "../../assets/logo.png";
import bg from "../../assets/bg.jpg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function SoloChatbox() {
  const navigate = useNavigate();


  
  // ======== SESSION + GAME DATA ========
  const [sessionId, setSessionId] = useState(null);
  const [story, setStory] = useState("");
  const [suspects, setSuspects] = useState([]);
  const [clues, setClues] = useState({ clue1: "Loading...", clue2: null });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("solo_session");
    const st = localStorage.getItem("solo_story");
    const su = localStorage.getItem("solo_suspects");
    const cl = localStorage.getItem("solo_clues");
    const u = localStorage.getItem("user");

    if (!s || !st || !su || !u) {
      alert("No active solo game found.");
      navigate("/soloGame/solo_story");
      return;
    }

    setSessionId(s);
    setStory(st);
    setSuspects(JSON.parse(su));
    setClues(cl ? JSON.parse(cl) : { clue1: "No clue yet.", clue2: null });
    setUser(JSON.parse(u));
  }, [navigate]);

  // ======== POPUP VISIBILITY ========
  const [showStory, setShowStory] = useState(false);
  const [showClues, setShowClues] = useState(false);
  const [showVoting, setShowVoting] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showExtend, setShowExtend] = useState(false);
  const [showTooSoonVoting, setShowTooSoonVoting] = useState(false);
  const [showVotingLocked, setShowVotingLocked] = useState(false);
  const [showCaseEnded, setShowCaseEnded] = useState(false);

  // ======== TIMER ========
  const INITIAL_DURATION = 15 * 60;
  const EXTENSION_DURATION = 5 * 60;
  const VOTING_UNLOCK_SECONDS = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(INITIAL_DURATION);
  const [totalDuration, setTotalDuration] = useState(INITIAL_DURATION);
  const [elapsedFromStart, setElapsedFromStart] = useState(0);
  const [extended, setExtended] = useState(false);

  // ======== CHAT ========
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ======== VOTING ========
  const players = suspects.length > 0 ? suspects : ["Loading suspects..."];
  const [tempVote, setTempVote] = useState("");
  const [confirmedVote, setConfirmedVote] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [hasChangedVote, setHasChangedVote] = useState(false);

  const isSecondVoting = hasVoted && !hasChangedVote;
  const secondsUntilVoting = Math.max(0, VOTING_UNLOCK_SECONDS - elapsedFromStart);
  const minutesUntilVoting = Math.ceil(secondsUntilVoting / 60);

  // ======== TIMER EFFECT ========

  
    useEffect(() => {
    // 1 MINUTE WARNING
    if (timeLeft === 60) {
      setMessages((prev) => [
        ...prev,
        { sender: "SYSTEM", text: "⏳ Only 1 minute left. Make your final guess soon." },
      ]);
    }

    // HANDLE TIMER EXPIRATION
    if (timeLeft <= 0) {
      if (!extended) setShowExtend(true);
      else setShowCaseEnded(true);
      return;
    }



    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setElapsedFromStart((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, extended]);

  // const formatTime = (s) =>
  //   `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const yourMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { sender: "You", text: yourMessage }]);

    try {

// await fetch("http://localhost:5001/api/solo/chat"
// await fetch(`${API}/api/solo/leave`

      // const API = import.meta.env.VITE_API_BASE_URL;



      // const res = await fetch("http://localhost:5001/api/solo/chat"

      const API = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API}/api/solo/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: yourMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { sender: "AI", text: data.reply || "..." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "AI", text: "I had trouble replying. Try again." }]);
    }
  };

  const unlockClue2 = async () => {

    // await fetch("http://localhost:5001/api/solo/clue2"
    // await fetch(`${API}/api/solo/leave`
    // const API = import.meta.env.VITE_API_BASE_URL;


    // const res = await fetch("http://localhost:5001/api/solo/clue2"

    const API = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${API}/api/solo/clue2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });

    const data = await res.json();
    setClues((prev) => ({ ...prev, clue2: data.clue2 }));
    localStorage.setItem("solo_clues", JSON.stringify({ ...clues, clue2: data.clue2 }));
  };

  const endGame = async (resultStatus) => {

    // const res = await fetch("http://localhost:5001/api/solo/reveal"
    // const API = import.meta.env.VITE_API_BASE_URL;

    // const res = await fetch(`${API}/api/solo/reveal`


    // const res = await fetch("http://localhost:5001/api/solo/reveal"

    const API = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${API}/api/solo/reveal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });

    // const data = await res.json();
    const data = await res.json();

    if (data.error === "no_vote") {
      alert("Before ending the case, you must cast a final vote.");
      setShowVoting(true);
      return;
    }
    
    localStorage.setItem(
      "solo_result",
      JSON.stringify({
        result: resultStatus,
        suspect: data.culprit,
        explanation: data.final_text,
      })
    );

    localStorage.removeItem("solo_session");
    localStorage.removeItem("solo_story");
    localStorage.removeItem("solo_suspects");
    localStorage.removeItem("solo_clues");

    navigate("/soloGame/solo_result");
  };

  const handleOpenVoting = () => {
    if (elapsedFromStart < VOTING_UNLOCK_SECONDS) return setShowTooSoonVoting(true);
    if (hasVoted && hasChangedVote) return setShowVotingLocked(true);
    setTempVote(confirmedVote || "");
    setShowVoting(true);
  };

  // const handleConfirmVote = async () => {
  //   if (!tempVote) return;

  //   const res = await fetch("http://localhost:5001/api/solo/vote", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       session_id: sessionId,
  //       guess: tempVote,
  //       username: user.username,
  //     }),
  //   });

  //   const data = await res.json();

  //   if (!hasVoted) {
  //     setHasVoted(true);
  //     setConfirmedVote(tempVote);
  //   } else if (!hasChangedVote) {
  //     setHasChangedVote(true);
  //     setConfirmedVote(tempVote);
  //   }

  //   setShowVoting(false);

  //   if (data.correct) return endGame("win");

  //   if (!isSecondVoting) {
  //     unlockClue2();
  //     alert("Wrong guess. Clue #2 unlocked.");
  //   } else alert("Wrong again. You cannot change your vote anymore.");
  // };

const handleConfirmVote = async () => {
  if (!tempVote) return;




  // const res = await fetch("http://localhost:5001/api/solo/vote"

  // const API = import.meta.env.VITE_API_BASE_URL;

  // const res = await fetch(`${API}/api/solo/vote`


  // const res = await fetch("http://localhost:5001/api/solo/vote"

  const API = import.meta.env.VITE_API_BASE_URL;
  const res = await fetch(`${API}/api/solo/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      guess: tempVote,
      username: user.username,
    }),
  });

  const data = await res.json();

  // If backend says it's too early to vote
  if (data.error === "too_soon") {
    setShowTooSoonVoting(true);
    return;
  }

  // Update vote state (first or second vote)
  if (!hasVoted) {
    setHasVoted(true);
    setConfirmedVote(tempVote);
  } else if (!hasChangedVote) {
    setHasChangedVote(true);
    setConfirmedVote(tempVote);
  }

  setShowVoting(false);

  // If final result, end the game
  if (data.final) {
    return endGame(data.correct ? "win" : "lose");
  }

  // If backend says unlock clue (first vote wrong)
  if (data.unlock_clue) {
    await unlockClue2();
    alert("Wrong guess. Clue #2 unlocked. You have one last chance.");
    return;
  }

  // If second vote wrong (fallback)
  if (!data.correct && !data.unlock_clue && !data.final) {
    alert("Wrong again. You cannot vote anymore.");
  }
};



  const handleLeaveGame = async () => {
    // await fetch("http://localhost:5001/api/solo/leave"
    // const API = import.meta.env.VITE_API_BASE_URL;



    // await fetch("http://localhost:5001/api/solo/leave"
    // await fetch(`${API}/api/solo/leave`
    const API = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${API}/api/solo/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
    navigate("/dashboard");
  };

  return (
    <div
      className="w-full h-screen bg-fixed bg-cover bg-center bg-no-repeat flex overflow-hidden relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>

      {/* ===== SIDEBAR | hidden on phones ===== */}
      <div className="hidden md:flex relative z-10 w-[260px] bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex-col items-center justify-center shadow-2xl">
        <img 
          src={logo} 
          className="w-40 mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] animate-glow" 
          alt="logo" 
        />

       <div className="text-gray-300 text-sm space-y-3 text-center">
          <p>
            <span className="font-semibold text-white">Case ID:</span> {sessionId}
          </p>
        </div>
      </div>


      {/* ===== MAIN CHAT ===== */}
      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-8 text-white">
        <div className="flex flex-col flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-8 shadow-2xl min-h-0">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
            <h2 className="text-xl md:text-2xl font-bold tracking-wide text-center sm:text-left">Who has done it?</h2>

            {/* MOBILE TIMER REMAINS */}
            <div className="text-sm text-gray-300 border px-4 py-1 rounded-full bg-white/10">
              {formatTime(timeLeft)} remaining
            </div>
          </div>

          {/* CHAT */}
          <div className="flex-1 overflow-y-auto pr-2 md:pr-4 pb-4 space-y-6">
            {messages.map((msg, i) => {
              const isYou = msg.sender === "You";
              return (
                <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] md:max-w-[65%] p-4 rounded-2xl shadow-lg backdrop-blur-md ${
                      isYou
                        ? "bg-[#800000]/80 text-white rounded-br-none"
                        : "bg-white/90 text-red-400 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <p className="text-xs opacity-90 mt-1">{msg.sender}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </div>

          {/* NAV BUTTONS */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm font-semibold">
            <button onClick={() => setShowStory(true)} className="px-4 py-2 bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition">
              STORY
            </button>

            <button onClick={() => setShowClues(true)} className="px-4 py-2 bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition">
              CLUES
            </button>

            <button onClick={handleOpenVoting} className="px-4 py-2 bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition">
              VOTE
            </button>

            <button onClick={() => setShowLeave(true)} className="px-4 py-2 bg-red-700/50 border border-red-800 rounded-xl hover:bg-red-700 transition">
              LEAVE
            </button>
          </div>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row mt-6 gap-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-white/20 text-black placeholder-gray-300 p-4 rounded-xl backdrop-blur-md border border-white/30 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-8 bg-[#800000] hover:bg-[#990000] text-white font-semibold rounded-xl transition"
            >
              SEND
            </button>
          </div>
        </div>
      </div>

      {/* POPUPS — unchanged */}
      {showStory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white w-[90%] max-w-3xl p-10 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center mb-6">Case Story</h1>
            <div className="max-h-[55vh] overflow-y-auto text-gray-200 leading-relaxed whitespace-pre-line border border-white/20 p-6 rounded-xl bg-white/5">
              {story}
            </div>
            <div className="flex justify-center mt-6">
              <button onClick={() => setShowStory(false)} className="text-[#ff9999] hover:text-white transition underline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showClues && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white w-[90%] max-w-3xl p-10 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center mb-6">Clues</h1>
            <div className="text-center space-y-4 text-gray-100 text-lg">
              <p>🔍 Clue #1: {clues.clue1}</p>
              {clues.clue2 && <p>🔍 Clue #2: {clues.clue2}</p>}
            </div>
            <div className="flex justify-center mt-8">
              <button onClick={() => setShowClues(false)} className="text-[#ff9999] hover:text-white transition underline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showVoting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white w-[95%] max-w-4xl p-8 rounded-3xl shadow-2xl">
            <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
              {isSecondVoting ? "Final Vote — Choose Carefully" : "Choose Your Suspect"}
            </h1>

            <div className="flex flex-col items-center space-y-4 text-lg">
              {players.map((p) => (
                <button
                  key={p}
                  onClick={() => setTempVote(p)}
                  className={`px-4 py-2 rounded-xl border transition ${
                    tempVote === p
                      ? "bg-[#800000] border-[#990000] text-white"
                      : "bg-white/10 border-white/20 text-gray-200 hover:bg-white/20"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-10 mt-8">
              <button
                onClick={handleConfirmVote}
                disabled={!tempVote}
                className={`px-6 py-2 font-semibold rounded-xl ${
                  tempVote ? "bg-green-700 hover:bg-green-800" : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                CONFIRM
              </button>

              <button onClick={() => setShowVoting(false)} className="px-6 py-2 font-semibold bg-red-700 hover:bg-red-800 rounded-xl">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {showLeave && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 w-[90%] max-w-3xl p-10 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl text-white text-center">
            <h1 className="text-2xl font-bold mb-6">Leave the Case?</h1>
            <p className="mb-8 text-gray-300">Leaving will end this investigation. Are you sure?</p>

            <div className="flex justify-center gap-16">
              <button onClick={() => setShowLeave(false)} className="underline text-gray-200 hover:text-white transition">
                GO BACK
              </button>

              <button onClick={handleLeaveGame} className="underline text-red-500 hover:text-white transition">
                FORCE EXIT
              </button>
            </div>
          </div>
        </div>
      )}

      {showTooSoonVoting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 w-[90%] max-w-3xl p-10 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl text-white text-center">
            <p className="text-lg font-semibold mb-6">
              Voting will be available in {minutesUntilVoting} minute{minutesUntilVoting !== 1 ? "s" : ""}.
            </p>

            <button onClick={() => setShowTooSoonVoting(false)} className="underline text-gray-200 hover:text-white transition">
              OK
            </button>
          </div>
        </div>
      )}

      {showVotingLocked && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 w-[90%] max-w-3xl p-10 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl text-white text-center">
            <p className="text-lg font-semibold mb-6">You already used your last vote. No more changes allowed.</p>

            <button onClick={() => setShowVotingLocked(false)} className="underline text-gray-200 hover:text-white transition">
              OK
            </button>
          </div>
        </div>
      )}

      {showExtend && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 w-[90%] max-w-3xl p-10 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl text-white text-center">
            <p className="mb-8 text-lg">Time is up. Extend 5 more minutes?</p>

            <div className="flex justify-center gap-16">
              <button onClick={() => endGame("lose")} className="underline text-red-500 hover:text-white transition">
                End Case
              </button>

              <button
                onClick={async () => {
                  setShowExtend(false);
                  setTimeLeft(EXTENSION_DURATION);
                  setTotalDuration(EXTENSION_DURATION);
                  setExtended(true);
                  if (!clues.clue2) await unlockClue2();
                }}
                className="underline text-gray-200 hover:text-white transition"
              >
                Extend Time
              </button>
            </div>
          </div>
        </div>
      )}

      {showCaseEnded && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white/10 w-[90%] max-w-3xl p-10 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl text-white text-center">
            <p className="mb-8 text-lg">Time is over. View the case results.</p>

            <button onClick={() => endGame("lose")} className="underline text-gray-200 hover:text-white transition">
              See Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
