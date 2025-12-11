// import { useState, useEffect } from "react";

// useEffect(() => {
//   const fetchLeaderboard = async () => {
//     const res = await fetch("http://localhost:5001/api/solo/leaderboard");
//     const data = await res.json();
//     setPlayers(data);
//   };

//   fetchLeaderboard();
//   const interval = setInterval(fetchLeaderboard, 3000); // live refresh
//   return () => clearInterval(interval);
// }, []);


//   const filtered = players
//     .filter(p => p.streak > 0)
//     .sort((a, b) => b.streak - a.streak)
//     .slice(0, 10);

//   const topStreak = filtered.length > 0 ? Math.max(...filtered.map(p => p.streak)) : 0;

//   return (
//     <div className="space-y-2">
//       {filtered.length > 0 ? (
//         filtered.map((player, index) => (
//           <div
//             key={index}
//             className="group relative overflow-hidden"
//           >
//             {/* Rank number badge - positioned at top-left of name container */}
//             <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
//               <div className={`
//                 w-7 h-7 rounded-r-lg flex items-center justify-center
//                 text-white text-xs font-bold
//                 ${index === 0 
//                   ? 'bg-gradient-to-r from-amber-700 to-yellow-800' 
//                   : index === 1 
//                   ? 'bg-gradient-to-r from-gray-600 to-gray-800'
//                   : index === 2
//                   ? 'bg-gradient-to-r from-orange-800 to-amber-900'
//                   : 'bg-gradient-to-r from-gray-800 to-black'
//                 }
//                 shadow-md
//               `}>
//                 {index + 1}
//               </div>
//             </div>
            
//             <div className={`
//               ml-7 rounded-lg p-4
//               ${index === 0 
//                 ? 'bg-gradient-to-r from-amber-950/30 via-black/20 to-black/10' 
//                 : index === 1 
//                 ? 'bg-gradient-to-r from-gray-900/30 via-black/20 to-black/10'
//                 : index === 2
//                 ? 'bg-gradient-to-r from-orange-950/30 via-black/20 to-black/10'
//                 : 'bg-black/20 hover:bg-black/30'
//               }
//               backdrop-blur-sm
//               border-l ${index < 3 ? 'border-l-4' : 'border-l-2'}
//               ${index === 0 ? 'border-amber-600' : 
//                 index === 1 ? 'border-gray-500' : 
//                 index === 2 ? 'border-orange-700' : 
//                 'border-gray-700/50'}
//             `}>
//               <div className="flex justify-between items-center">
//                 {/* Left side - Name with corner padding */}
//                 <div className="flex-1 pr-4"> {/* Added padding-right here */}
//                   <div className="flex items-center">
//                     <span className="font-semibold text-white text-lg">
//                       {player.name}
//                     </span>
                    
//                     {/* TOP STREAK badge - positioned at top-right corner of name */}
//                     {player.streak === topStreak && index === 0 && (
//                     <span className="text-[10px] bg-gradient-to-r from-[#800000] to-red-900 
//                         text-white px-2 py-1 rounded-full font-bold uppercase tracking-wider
//                         border border-red-700/50 ml-3">
//                         TOP STREAK
//                     </span>
//                     )}
//                   </div>
                  
//                   {/* Cases text - positioned below name */}
//                   <div className="mt-1">
//                     <span className="text-gray-400 text-sm">
//                       {player.streak} {player.streak === 1 ? 'case' : 'cases'}
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Right side - Streak number */}
//                 <div className="text-right">
//                   <div className="text-2xl font-bold text-white">
//                     {player.streak}
//                   </div>
//                   <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
//                     STREAK
//                   </div>
//                 </div>
//               </div>
              
//               {/* Subtle progress indicator at bottom */}
//               <div className="mt-3 h-0.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-red-800 to-red-600 rounded-full"
//                   style={{ width: `${(player.streak / topStreak) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             {/* Hover accent line */}
//             <div className="absolute bottom-0 left-0 right-0 h-0.5 
//               bg-gradient-to-r from-transparent via-red-800/30 to-transparent 
//               opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-12">
//           <div className="inline-block p-8 bg-black/30 rounded-xl 
//             border border-white/10 backdrop-blur-sm">
//             <div className="text-4xl mb-4 opacity-60">🔍</div>
//             <p className="text-gray-300 italic mb-2">
//               No detectives on the board yet
//             </p>
//             <p className="text-gray-500 text-sm">
//               Solve a case to claim the top spot!
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // const res = await fetch("http://localhost:5001/api/solo/leaderboard"
        const API = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API}/api/solo/leaderboard`, {
        cache: "no-store"
        });
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.log("Leaderboard fetch error:", err);
      }
    };

    fetchLeaderboard();

    // Auto-refresh every 3 seconds
    const interval = setInterval(fetchLeaderboard, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = players
    .filter(p => p.streak > 0)
    .slice(0, 10);

  const topStreak = filtered.length > 0 ? Math.max(...filtered.map(p => p.streak)) : 0;

  return (
  <div className="space-y-3 transition-all">
    {filtered.length > 0 ? (
      filtered.map((player, index) => (
        <div
          key={player.username}
          className={`
            group relative overflow-hidden rounded-xl p-4 cursor-pointer
            backdrop-blur-md shadow-md transition duration-300 transform
            hover:scale-[1.02] hover:shadow-lg
            ${index === 0 
              ? 'bg-gradient-to-r from-[#4b0000] via-black to-[#4b0000] border border-red-700' 
              : 'bg-black/20 border border-white/10'}
          `}
        >

          {/* 🔥 Animated flame behind #1 */}
          {index === 0 && (
            <div className="absolute inset-0 opacity-30 pointer-events-none animate-pulse">
              <img 
                src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif" 
                alt="fire"
                className="object-cover w-full h-full mix-blend-screen"
              />
            </div>
          )}

          {/* 🥇 🥈 🥉 Medal animation */}
          <div className="absolute top-2 right-2 text-3xl animate-bounce">
            {index === 0 && "🥇"}
            {index === 1 && "🥈"}
            {index === 2 && "🥉"}
          </div>

          {/* Rank Number */}
          <div className={`
            absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center font-bold text-white rounded-full shadow-lg
            ${index === 0 ? "bg-red-600 animate-pulse" :
              index === 1 ? "bg-gray-500" :
              index === 2 ? "bg-orange-600" :
              "bg-gray-800" }
          `}>
            {index + 1}
          </div>

          {/* Player Info */}
          <div className="ml-12">
            <span className="font-bold text-lg text-white drop-shadow-md tracking-wide">
              {player.username}
            </span>

            {/* glowing animated badge */}
            {player.streak === topStreak && index === 0 && (
              <span className="ml-3 text-xs font-bold px-2 py-1 rounded-md text-white bg-red-700 border border-red-900 animate-pulse tracking-widest">
                🔥 UNDEFEATED
              </span>
            )}

            <p className="text-gray-300 text-sm">
              {player.streak} {player.streak === 1 ? "streak" : "streaks"}
            </p>

            {/* Progress bar */}
            <div className="mt-2 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-700"
                style={{ width: `${(player.streak / topStreak) * 100}%` }}
              >
              </div>
            </div>
          </div>

          {/* Hover effect */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 opacity-0 group-hover:opacity-100 transition"></div>
        </div>
      ))
    ) : (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-black/30 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-4xl mb-4 opacity-60">🔍</div>
          <p className="text-gray-300 italic mb-2">No detectives on the board yet</p>
          <p className="text-gray-500 text-sm">Solve a case to claim the top spot!</p>
        </div>
      </div>
    )}
  </div>
);
}
