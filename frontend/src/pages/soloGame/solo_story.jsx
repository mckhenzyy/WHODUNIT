import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SoloStory() {
  const slides = [
    "AI's story has characters of the crime story, all you need to do is investigate for the real suspect...",
    "AI is now generating the crime story...",
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
     when an unknown printer took a galley of type and scrambled it to make a type specimen book.
     It has survived not only five centuries, but also the leap into electronic typesetting.
     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    "With your help, justice will rise."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white flex items-center justify-center px-6">

      <div className="flex flex-col items-center w-full max-w-3xl">

        {/* LOGO */}
        <img
          src={logo}
          alt="WHODUNIT logo"
          className="w-20 h-20 md:w-32 md:h-32 mb-8"
        />

        {/* CARD */}
        <div className="bg-gray-200 text-black rounded-2xl p-7 shadow-lg w-full">

          {/* SLIDE CONTENT */}
          <div className="max-h-[420px] overflow-auto">
            <p className="text-center text-lg leading-relaxed whitespace-pre-line">
              {slides[currentIndex]}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6">

            {!isLastSlide && (
              <button
                onClick={handleNext}
                className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold transition"
              >
                NEXT
              </button>
            )}

            {isLastSlide && (
              <Link to="/soloGame/solo_chatbox" className="w-full block">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
                  START
                </button>
              </Link>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
