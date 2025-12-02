import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Result() {
  // TEMP value (backend will replace)
  const [suspect] = useState("analieTheSupper");
  const [resultStatement] = useState("won");
  const [resultExplanation] = useState(`Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.`);

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white flex flex-col items-center pt-10">

      {/* LOGO */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={logo}
          alt="WHODUNIT logo"
          className="w-20 h-20 md:w-32 md:h-32 mb-3"
        />
      </div>

      {/* CENTER CARD */}
      <div className="bg-gray-200 text-black rounded-2xl shadow-lg w-full max-w-xl px-10 py-10">

        {/* Title */}
        <h3 className="text-center text-3xl font-bold mb-6">
          You've {resultStatement}!
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed text-justify mb-8">
            {resultExplanation}.
        </p>

        {/* Suspect Name */}
        <p className="text-center text-blue-600 font-semibold mb-8 cursor-pointer">
          {suspect} is the Suspect!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">

          {/* Start another game */}
          <Link to="/multiGame/waiting_room">
            <button className="w-full bg-[#DB5B2A] hover:bg-[#c45427] text-white py-3 rounded-lg font-semibold transition">
              START ANOTHER GAME IN THIS ROOM
            </button>
          </Link>

          {/* Back to dashboard */}
          <Link to="/multiGame/multiplayer" className="text-center">
            <span className="text-gray-700 hover:underline">
              Go back to dashboard
            </span>
          </Link>

        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20" />

    </div>
  );
}
