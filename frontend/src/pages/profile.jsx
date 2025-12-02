import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // TEMPORARY — backend will replace later
  const [fullname, setFullname] = useState("Khezy Gwen Mangubat");
  const [birthdate, setBirthdate] = useState("2005-04-10");
  const [gender, setGender] = useState("Female");
  const [username, setUsername] = useState("kzmangubat");

  const [openGender, setOpenGender] = useState(false);
  const [editing, setEditing] = useState(false); // <--- NEW

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1c1b1c] text-white flex flex-col items-center justify-center px-6 py-12">

      {/* PROFILE CARD */}
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          
          {/* ICON — NO PHOTO */}
          <FaUserCircle className="text-gray-400" size={90} />

          <h1 className="text-2xl font-bold text-black mt-4">Profile</h1>
          <p className="text-sm text-gray-600">
            Manage your account details.
          </p>
        </div>

        {/* FORM FIELDS */}
        <div className="flex flex-col gap-4">

          {/* FULLNAME */}
          <div>
            <label className="text-gray-700 text-sm font-semibold">Full name</label>
            <input
              type="text"
              disabled={!editing}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className={`w-full mt-1 px-4 py-3 rounded-lg text-black focus:outline-none
                ${editing ? "bg-[#a6a6a6]" : "bg-gray-300 cursor-not-allowed"}`}
            />
          </div>

          {/* BIRTHDATE */}
          <div>
            <label className="text-gray-700 text-sm font-semibold">Birthdate</label>
            <input
              type="date"
              disabled={!editing}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className={`w-full mt-1 px-4 py-3 rounded-lg text-black focus:outline-none
                ${editing ? "bg-[#a6a6a6]" : "bg-gray-300 cursor-not-allowed"}`}
            />
          </div>

          {/* GENDER */}
          <div className="relative">
            <label className="text-gray-700 text-sm font-semibold">Gender</label>

            <button
              type="button"
              disabled={!editing}
              className={`w-full mt-1 px-4 py-3 rounded-lg flex justify-between items-center text-black
                ${editing ? "bg-[#a6a6a6]" : "bg-gray-300 cursor-not-allowed"}`}
              onClick={() => editing && setOpenGender(!openGender)}
            >
              {gender}
              <span>▼</span>
            </button>

            {editing && openGender && (
              <div className="absolute left-0 right-0 mt-1 bg-[#a6a6a6] rounded-lg shadow-lg z-10 text-black">
                <div
                  className="px-4 py-2 hover:bg-orange-500 cursor-pointer rounded-lg"
                  onClick={() => { setGender("Male"); setOpenGender(false); }}
                >
                  Male
                </div>
                <div
                  className="px-4 py-2 hover:bg-orange-500 cursor-pointer rounded-lg"
                  onClick={() => { setGender("Female"); setOpenGender(false); }}
                >
                  Female
                </div>
                <div
                  className="px-4 py-2 hover:bg-orange-500 cursor-pointer rounded-lg"
                  onClick={() => { setGender("Prefer not to say"); setOpenGender(false); }}
                >
                  Prefer not to say
                </div>
              </div>
            )}
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-gray-700 text-sm font-semibold">Username</label>
            <input
              type="text"
              disabled={!editing}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full mt-1 px-4 py-3 rounded-lg text-black focus:outline-none
                ${editing ? "bg-[#a6a6a6]" : "bg-gray-300 cursor-not-allowed"}`}
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">

          {/* EDIT / SAVE CHANGES */}
          {!editing ? (
            <div>
                <button
                onClick={() => setEditing(true)}
                className="w-full bg-gray-300 hover:bg-orange-600 text-black py-2 rounded-lg font-semibold"
                >
                Edit
                </button>
                <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg font-semibold mt-2"
                >
                Go back to dashboard
                </button>
            </div>
          ) : (
            <div>
                <button
                onClick={() => setEditing(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                >
                SAVE CHANGES
                </button>
                {/* CANCEL */}
                <button
                    onClick={() => setEditing(false)}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg font-semibold mt-2"
                >
                    Cancel
                </button>
            </div>
          )}

        </div>
      </div>

      
    </div>
  );
}
