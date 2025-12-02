import logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);


  const handleSignup = (e) => {
    e.preventDefault();
    alert("Sign up successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-[#1c1b1c] flex flex-col md:flex-row">

      {/* UNIVERSAL LOGO */}
      <div
        className="
          flex justify-center items-center
          mt-10 mb-6
          md:mt-0 md:mb-0 
          md:absolute 
          md:right-[18%] lg:right-[15%]
          md:top-1/2 md:-translate-y-1/2
          transition-all duration-500 ease-in-out
        "
      >
        <img
          src={logo}
          alt="Logo"
          className="
            w-20 h-20
            md:w-82 md:h-82
            lg:w-92 lg:h-92
            drop-shadow-xl
            transition-all duration-500
          "
        />
      </div>

      {/* SIGNUP CARD */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div
          className="
            bg-white w-full 
            max-w-md md:max-w-lg lg:max-w-xl
            rounded-2xl p-10 md:p-12 shadow-lg
          "
        >
          <h1 className="text-center text-3xl font-bold mb-1">SIGN UP</h1>
          <p className="text-center text-gray-700 mb-6">
            We are happy to welcome you! <br />
            Please register here.
          </p>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#a6a6a6] text-white placeholder-white/70 focus:outline-none"
              required
            />

            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#a6a6a6] text-white focus:outline-none"
              required
            />

            <div className="relative mb-4">
              <button
                type="button"
                className="
                  w-full px-4 py-3 bg-[#a6a6a6] text-white rounded-lg 
                  flex justify-between items-center
                "
                onClick={() => setOpen(!open)}
              >
                {gender || "Select gender"}
                <span className="text-white text-lg">▼</span>
              </button>

              {open && (
                <div className="absolute left-0 right-0 mt-1 bg-[#a6a6a6] rounded-lg shadow-lg z-10">
                
                  <div
                    className="px-4 py-2 hover:bg-orange-500 cursor-pointer rounded-lg text-white"
                    onClick={() => { setGender("Male"); setOpen(false); }}
                  >
                    Male
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-orange-500 cursor-pointer rounded-lg text-white"
                    onClick={() => { setGender("Female"); setOpen(false); }}
                  >
                    Female
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-orange-500 cursor-pointer rounded-lg text-white"
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
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#a6a6a6] text-white placeholder-white/70 focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-[#a6a6a6] text-white placeholder-white/70 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              SIGN UP
            </button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/" className="text-blue-600 text-sm hover:underline">
              Cancel
            </Link>
          </div>

          <hr className="my-6 border border-gray-300" />

          <p className="text-center text-xs italic text-gray-600">
            Powered by AK
          </p>
        </div>
      </div>
    </div>
  );
}
