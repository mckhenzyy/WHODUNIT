import logo from "../assets/logo.png";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload
    // For now, just log the input values
    console.log("Username:", username);
    console.log("Password:", password);
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen bg-[#1c1b1c] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Logo - Hidden on mobile, visible on larger screens */}
      <img
        src={logo}
        className="hidden lg:block w-64 h-64 lg:w-80 lg:h-80 xl:w-[410px] xl:h-[410px] absolute right-4 lg:right-8 xl:right-32 top-8 lg:top-20 xl:top-[210px] object-cover"
        alt="Whodunit Logo"
      />
      
      {/* Login Card */}
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-2xl bg-[#d9d9d9] rounded-2xl lg:rounded-[20px] p-6 lg:p-8 shadow-lg relative z-10"
           style={{boxShadow: "0px 4px 4px 0 rgba(32,32,32,0.25)"}}>
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-3xl xl:text-[35px] font-bold text-black mb-2 lg:mb-4">
            LOG IN
          </h1>
          <p className="text-base lg:text-lg text-black">
            We are happy to see you again!
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
          {/* Username Field */}
          <div className="relative">
            <div className="w-full h-12 lg:h-14 rounded-xl bg-[#1c1b1c]/50"></div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please enter username"
              className="w-full h-12 lg:h-14 absolute inset-0 rounded-xl bg-transparent px-4 lg:px-6 text-white placeholder-white placeholder-opacity-80 text-sm lg:text-[15px] italic focus:outline-none focus:ring-2 focus:ring-[#db5b2a]"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="w-full h-12 lg:h-14 rounded-xl bg-[#1c1b1c]/50"></div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please enter password"
              className="w-full h-12 lg:h-14 absolute inset-0 rounded-xl bg-transparent px-4 lg:px-6 text-white placeholder-white placeholder-opacity-80 text-sm lg:text-[15px] italic focus:outline-none focus:ring-2 focus:ring-[#db5b2a]"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <button type="button" className="text-sm lg:text-[15px] italic text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 lg:h-14 rounded-xl bg-[#db5b2a]/95 hover:bg-[#db5b2a] transition-colors duration-200 text-white font-medium text-sm lg:text-[15px]"
          >
            LOG IN
          </button>
        </form>

        {/* Divider */}
        <div className="w-full h-px bg-black opacity-20 my-6 lg:my-8"></div>

        {/* Game Description */}
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-xs lg:text-sm italic text-black leading-relaxed">
            A multiplayer and single-player web game where players solve<br />
            AI-generated fictional crimes by analyzing clues, interrogating<br />
            possible suspects, and using logic to identify the culprit.
          </p>
        </div>

        {/* Sign Up Prompt */}
        <div className="text-center mb-4">
          <p className="text-xs lg:text-[13px] text-black">
            Want to be part?{" "}
            <button type="button" className="text-blue-600 hover:underline font-medium">
              Sign up.
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs lg:text-[15px] italic text-black opacity-80">
            Powered by AK
          </p>
        </div>
      </div>

      {/* Background decorative elements for larger screens */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {/* You can add additional background elements here if needed */}
      </div>
    </div>
  );
}