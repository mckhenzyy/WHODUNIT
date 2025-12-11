import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCard(true), 200);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          dob: birthdate,
          gender,
          username,
          email: mail,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setTimeout(() => setError(""), 2000);
        return;
      }

      window.location.href = "/";
    } catch (err) {
      setError("Server error. Try again later.");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 overflow-hidden relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* POPUP ERROR */}
      {error && (
        <div className="absolute top-6 z-20 bg-red-700/90 text-white px-6 py-3 rounded-xl shadow-lg animate-slideDown">
          {error}
        </div>
      )}

      {/* SIGNUP CARD */}
      <div
        className={`
          relative z-10 w-full max-w-xs sm:max-w-sm 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 rounded-3xl 
          p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)]
          transition-all duration-700
          ${showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="WHODUNIT"
            className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-glow"
          />
        </div>

        {/* HEADER */}
        <h1 className="text-center text-3xl font-extrabold text-white tracking-wide mb-3">
          SIGN UP
        </h1>
        <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
          Join the investigation.
        </p>

        {/* FORM */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 text-base focus:outline-none backdrop-blur-md"
            required
          />

          {/* DATE INPUT FIXED FOR IOS AND ANDROID */}
          <div className="relative mb-4">
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl 
                bg-white/20 border border-white/20 
                text-white text-base backdrop-blur-md
                appearance-none"
              required
              onFocus={(e) => e.target.showPicker?.()}
            />
            
            {/* CUSTOM DATE PLACEHOLDER FOR MOBILE */}
            {!birthdate && (
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <span className="text-gray-300 px-4 py-3 text-base">
                  mm/dd/yyyy
                </span>
              </div>
            )}
          </div>

          {/* GENDER DROPDOWN */}
          <div className="relative mb-4">
            <button
              type="button"
              className="
                w-full mb-4 px-4 py-3 rounded-xl 
                bg-white/20 border border-white/20 
                text-white placeholder-gray-300 
                text-base focus:outline-none backdrop-blur-md
                flex justify-between items-center
              "
              onClick={() => setOpen(!open)}
            >
              <span className={gender ? "text-white" : "text-gray-300"}>
                {gender || "Select gender"}
              </span>
              <span className="text-white text-lg transform transition-transform duration-200">
                {open ? "▲" : "▼"}
              </span>
            </button>

            {open && (
              <div className="absolute left-0 right-0 mt-1 bg-red-900 text-white rounded-xl border border-white/20 shadow-lg z-10 backdrop-blur-md">
                <div
                  className="px-4 py-3 hover:bg-[#800000] cursor-pointer rounded-lg text-white"
                  onClick={() => { setGender("Male"); setOpen(false); }}
                >
                  Male
                </div>

                <div
                  className="px-4 py-3 hover:bg-[#800000] cursor-pointer rounded-lg text-white"
                  onClick={() => { setGender("Female"); setOpen(false); }}
                >
                  Female
                </div>

                <div
                  className="px-4 py-3 hover:bg-[#800000] cursor-pointer rounded-lg text-white"
                  onClick={() => { setGender("Prefer not to say"); setOpen(false); }}
                >
                  Prefer not to say
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 text-base focus:outline-none backdrop-blur-md"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 text-base focus:outline-none backdrop-blur-md"
            required
          />

          <input
            type="email"
            placeholder="Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 text-base focus:outline-none backdrop-blur-md"
            required
          />

          {/* SIGN UP BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#990000] text-white py-3 rounded-xl font-bold tracking-wide shadow-lg transition"
          >
            SIGN UP
          </button>
        </form>

        {/* CANCEL */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-[#ff9999] hover:text-white transition text-sm">
            Cancel
          </Link>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs italic text-gray-500 mt-6">
          Powered by AK
        </p>
      </div>
      
      {/* IOS/SAFARI SPECIFIC STYLES */}
      <style>{`
        /* Fix for iOS date input placeholder */
        input[type="date"]::-webkit-date-and-time-value {
          text-align: left;
          color: white;
        }
        
        /* Fix for iOS placeholder color */
        input::placeholder {
          color: #d1d5db !important; /* gray-300 equivalent */
          opacity: 1;
        }
        
        /* Fix for iOS input styling */
        input[type="date"] {
          min-height: 44px; /* Minimum touch target size for iOS */
        }
        
        /* Fix for iOS dropdown arrow */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(2);
          opacity: 0.7;
          cursor: pointer;
        }
        
        /* Android Chrome fix */
        @media screen and (-webkit-min-device-pixel-ratio:0) {
          input[type="date"] {
            color: white;
          }
          input[type="date"]:invalid {
            color: transparent;
          }
        }
        
        /* Ensure placeholder is visible on all devices */
        .placeholder-gray-300::placeholder {
          color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
}







// import logo from "../assets/logo.png";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import bg from "../assets/bg.jpg";

// export default function Signup() {
//   const [fullname, setFullname] = useState("");
//   const [birthdate, setBirthdate] = useState("");
//   const [gender, setGender] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [mail, setMail] = useState("");

//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [showCard, setShowCard] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setShowCard(true), 200);
//   }, []);

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       // const API = import.meta.env.VITE_API_BASE_URL;
//       // const res = await fetch(`${API}/api/auth/signup`

//       // const res = await fetch("http://localhost:5001/api/auth/signup"
      
//       const API = import.meta.env.VITE_API_BASE_URL;
//       const res = await fetch(`${API}/api/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullname,
//           dob: birthdate,
//           gender,
//           username,
//           email: mail,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Signup failed");
//         setTimeout(() => setError(""), 2000);
//         return;
//       }

//       window.location.href = "/";
//     } catch (err) {
//       setError("Server error. Try again later.");
//       setTimeout(() => setError(""), 2000);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 overflow-hidden relative"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

//       {/* POPUP ERROR */}
//       {error && (
//         <div className="absolute top-6 z-20 bg-red-700/90 text-white px-6 py-3 rounded-xl shadow-lg animate-slideDown">
//           {error}
//         </div>
//       )}

//       {/* SIGNUP CARD */}
//       <div
//         className={`
//           relative z-10 w-full max-w-xs sm:max-w-sm 
//           bg-white/10 backdrop-blur-xl 
//           border border-white/20 rounded-3xl 
//           p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)]
//           transition-all duration-700
//           ${showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//         `}
//       >

//         {/* LOGO */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={logo}
//             alt="WHODUNIT"
//             className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-glow"
//           />
//         </div>

//         {/* HEADER */}
//         <h1 className="text-center text-3xl font-extrabold text-white tracking-wide mb-3">
//           SIGN UP
//         </h1>
//         <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
//           Join the investigation.
//         </p>

//         {/* FORM */}
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Fullname"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none backdrop-blur-md"
//             required
//           />

//           <div className="relative mb-4">
//             {!birthdate && (
//               <span className="absolute left-4 top-3 text-gray-300 pointer-events-none">
                
//               </span>
//             )}

//             <input
//               type="date"
//               value={birthdate}
//               onChange={(e) => setBirthdate(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white backdrop-blur-md"
//               required
//             />
//           </div>


//           {/* GENDER DROPDOWN */}
//           <div className="relative mb-4 text-grey">
//             <button
//               type="button"
//               className="
//                 w-full px-4 py-3 rounded-xl 
//                 bg-white/20 border border-white/20 
//                 text-white backdrop-blur-md flex justify-between items-center
//               "
//               onClick={() => setOpen(!open)}
//             >
//               {gender || "Select gender"}
//               <span className="text-black text-lg">▼</span>
//             </button>

//             {open && (
//               <div className="absolute left-0 right-0 mt-1 bg-red-900 text-white rounded-xl border border-red-900 shadow-lg z-10">

//                 <div
//                   className="px-4 py-2 hover:bg-[#800000] cursor-pointer rounded-lg text-white"
//                   onClick={() => { setGender("Male"); setOpen(false); }}
//                 >
//                   Male
//                 </div>

//                 <div
//                   className="px-4 py-2 hover:bg-[#800000] cursor-pointer rounded-lg text-white"
//                   onClick={() => { setGender("Female"); setOpen(false); }}
//                 >
//                   Female
//                 </div>

//                 <div
//                   className="px-4 py-2 hover:bg-[#800000] cursor-pointer rounded-lg text-white"
//                   onClick={() => { setGender("Prefer not to say"); setOpen(false); }}
//                 >
//                   Prefer not to say
//                 </div>

//               </div>
//             )}
//           </div>

//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none backdrop-blur-md"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none backdrop-blur-md"
//             required
//           />

//           <input
//             type="mail"
//             placeholder="Mail"
//             value={mail}
//             onChange={(e) => setMail(e.target.value)}
//             className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none backdrop-blur-md"
//             required
//           />

//           {/* SIGN UP BUTTON */}
//           <button
//             type="submit"
//             className="w-full bg-[#800000] hover:bg-[#990000] text-white py-3 rounded-xl font-bold tracking-wide shadow-lg transition"
//           >
//             SIGN UP
//           </button>
//         </form>

//         {/* CANCEL */}
//         <div className="mt-4 text-center">
//           <Link to="/" className="text-[#ff9999] hover:text-white transition text-sm">
//             Cancel
//           </Link>
//         </div>

//         {/* FOOTER */}
//         <p className="text-center text-xs italic text-gray-500 mt-6">
//           Powered by AK
//         </p>
//       </div>
//     </div>
//   );
// }
