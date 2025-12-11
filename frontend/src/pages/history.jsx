import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History() {
  const [cases, setCases] = useState([]);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  }, []);

  useEffect(() => {
    if (!username) return;

    setIsLoading(true);


    // fetch(`http://localhost:5001/api/solo/history/${username}`
    const API = import.meta.env.VITE_API_BASE_URL;
    fetch(`${API}/api/solo/history/${username}`)
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a,b) => b.timestamp - a.timestamp);
        setCases(sorted);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [username]);

  const getResultStyle = (result) => {
    switch(result) {
      case "win": return "bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-600/50 text-green-300";
      case "lose": return "bg-gradient-to-r from-red-900/30 to-red-800/20 border-red-600/50 text-red-300";
      default: return "bg-gradient-to-r from-gray-900/30 to-gray-800/20 border-gray-600/50 text-gray-300";
    }
  };

  const getResultIcon = (result) => {
    switch(result) {
      case "win": return "✅";
      case "lose": return "❌";
      default: return "❓";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today at " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else if (diffDays === 1) {
      return "Yesterday at " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 md:p-8">
      {/* Back to Dashboard Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link to="/dashboard">
          <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-black rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300 group border border-gray-700/50 shadow-lg">
            <span className="text-xl transform group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-semibold">Back to Dashboard</span>
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-10">
          {/* Evidence tape header */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold px-8 py-2 text-sm tracking-widest rotate-1 shadow-lg z-20">
            CASE ARCHIVES
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 rounded-2xl p-8 shadow-2xl shadow-black/60 border border-gray-700/30">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-red-300 to-amber-200 bg-clip-text text-transparent">
                  📚 Case History
                </h1>
                <p className="text-gray-400 mt-2">
                  Review your past investigations and track your detective career
                </p>
              </div>
              
         
            </div>

            {/* Case List */}
            <div className="mt-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                  <p className="text-gray-400">Loading case files...</p>
                </div>
              ) : cases.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-block p-8 bg-black/30 rounded-2xl border border-white/10">
                    <div className="text-5xl mb-4 opacity-60">🕵️‍♂️</div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">No Case Files Found</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Your investigation history is empty. Solve your first case to start building your detective legacy!
                    </p>
                    <Link to="/dashboard" className="inline-block mt-6">
                      <button className="px-6 py-3 bg-gradient-to-r from-red-800 to-red-700 rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300">
                        Start First Investigation
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cases.map((c, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-gray-600/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                    >
                      {/* Case number badge */}
                      <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center text-white font-bold text-sm shadow-lg border border-red-700/50">
                        #{i + 1}
                      </div>
                      
                      {/* Result badge */}
                      <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getResultStyle(c.result)} border`}>
                        {getResultIcon(c.result)} {c.result}
                      </div>

                      <div className="p-6 pt-8">
                        {/* Case title */}
                        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                          {c.title || "Untitled Case"}
                        </h2>
                        
                        {/* Date and time */}
                        <div className="flex items-center text-gray-400 text-sm mb-4">
                          <span className="mr-2">🕐</span>
                          <span>{formatDate(c.timestamp)}</span>
                        </div>

                        

                        {/* View Details Button */}
                        <button
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-800 to-black rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 group relative overflow-hidden border border-gray-700/50"
                          onClick={() => {
                            localStorage.setItem("case_view", JSON.stringify(c));
                            window.location.assign("/caseview");
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center space-x-2">
                            <span>🔍</span>
                            <span className="font-semibold">Review Investigation</span>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                      </div>

                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* File folder corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-red-900/30 transform rotate-45 translate-x-4 -translate-y-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-gray-800/50">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div className="flex items-center mb-3 md:mb-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  <span>Case Archive • {username || "Detective"}</span>
                </div>
                <div className="text-gray-400 italic">
                  {cases.length > 0 
                    ? `Showing ${cases.length} case${cases.length === 1 ? '' : 's'}`
                    : 'No cases on record'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorations */}
        <div className="fixed bottom-6 right-6 opacity-10 pointer-events-none">
          <div className="text-6xl font-black text-red-800 rotate-12">CONFIDENTIAL</div>
        </div>
      </div>
    </div>
  );
}