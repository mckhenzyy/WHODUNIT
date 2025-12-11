import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CaseView() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("case_view");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Case File Not Found</h2>
          <p className="text-gray-400 mb-6">No case data available.</p>
          <button 
            onClick={() => navigate("/history")}
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-black rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300"
          >
            ← Back to History
          </button>
        </div>
      </div>
    );
  }

  const getResultStyle = () => {
    return data.result === "win" 
      ? "bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-600/50" 
      : "bg-gradient-to-r from-red-900/30 to-red-800/30 border-red-600/50";
  };

  const getResultIcon = () => {
    return data.result === "win" ? "✅ Solved" : "❌ Unsolved";
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate("/history")}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-black rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300 group border border-gray-700/50 shadow-lg"
        >
          <span className="text-xl transform group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-semibold">Back to Case History</span>
        </button>
      </div>

      {/* Main Case File */}
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          {/* Evidence Seal */}
          <div className="text-center absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center z-20 border-2 border-red-700/50 shadow-xl">
            <span className="text-white text-xs font-bold rotate-12">CASE FILE</span>
          </div>

          {/* Case Container */}
          <div className="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/60 border border-gray-700/30">
            
            {/* Case Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-red-300 to-amber-200 bg-clip-text text-transparent">
                    📋 {data.title || "Case File"}
                  </h1>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className={`px-4 py-2 rounded-full font-bold text-sm ${getResultStyle()} border`}>
                      {getResultIcon()}
                    </div>
                    <div className="text-gray-400 text-sm">
                      📅 {formatDate(data.timestamp)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-800/30 to-transparent my-6"></div>
            </div>

            {/* Case Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Culprit Card */}
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">👤</span> Identified Culprit
                </h3>
                <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 rounded-lg p-4 border border-red-800/30">
                  <p className="text-2xl font-bold text-red-300">{data.culprit || "Unknown"}</p>
                  <p className="text-gray-400 text-sm mt-2">Primary suspect identified</p>
                </div>
              </div>

              
            </div>

            {/* Full Reveal - Case Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">🔍</span> Full Case Summary
              </h3>
              <div className="relative">
                {/* Evidence paper texture */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] rounded-xl"></div>
                
                <pre className="relative z-10 whitespace-pre-wrap bg-black/30 p-6 rounded-xl border border-gray-700/50 text-gray-300 leading-relaxed font-light">
                  {data.reveal || "No summary available for this case."}
                </pre>
                
                {/* Page fold effect */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gray-800/50 transform rotate-45 translate-x-4 -translate-y-4"></div>
                </div>
              </div>
            </div>

            {/* Clues Section (if available) */}
            {data.clues && data.clues.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">🧩</span> Evidence Collected ({data.clues.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.clues.slice(0, 6).map((clue, index) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200"
                    >
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-800 to-red-900 flex items-center justify-center text-xs mr-3 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 text-sm">{clue}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {data.clues.length > 6 && (
                  <p className="text-gray-500 text-sm mt-3 italic">
                    + {data.clues.length - 6} more pieces of evidence...
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-gray-800/50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Link to="/soloGame/solo_story" className="flex-1">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-900/50 transform hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span>Start New Investigation</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </Link>

                <Link to="/dashboard" className="flex-1">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-black/50 transform hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden border border-gray-700/50">
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span>Return to Dashboard</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </Link>

              </div>
            </div>
          </div>

          {/* Bottom decorations */}
          <div className="absolute -bottom-4 left-4 w-3 h-3 border-b border-l border-red-700/30"></div>
          <div className="absolute -bottom-4 right-4 w-3 h-3 border-b border-r border-red-700/30"></div>
        </div>

        {/* Floating evidence note */}
        <div className="fixed bottom-8 left-8 opacity-10 pointer-events-none">
          <div className="text-4xl">📝</div>
        </div>
      </div>
    </div>
  );
}