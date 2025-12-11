// // This decides what page shows up

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import Dashboard from "./pages/dashboard.jsx";
// import Profile from "./pages/profile.jsx";
// import About from "./pages/about.jsx";

// // for multi-player
// import Multiplayer from "./pages/multiGame/multiplayer.jsx";
// import Multi_Join from "./pages/multiGame/multi_join.jsx";
// import Waiting_Room from "./pages/multiGame/waiting_room.jsx";
// import Created_Room from "./pages/multiGame/created_room.jsx";
// import Story from "./pages/multiGame/story.jsx";
// import Chatbox from "./pages/multiGame/chatbox.jsx";
// import Result from "./pages/multiGame/result.jsx";

// // for solo player
// import SoloStory from "./pages/soloGame/solo_story.jsx";
// import SoloChatbox from "./pages/soloGame/solo_chatbox.jsx";
// import SoloResult from "./pages/soloGame/solo_result.jsx";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/about" element={<About />} />

//         <Route path="/multiGame/multiplayer" element={<Multiplayer />} />
//         <Route path="/multiGame/multi_join" element={<Multi_Join />} />
//         <Route path="/multiGame/waiting_room" element={<Waiting_Room />} />
//         <Route path="/multiGame/created_room" element={<Created_Room />} />
//         <Route path="/multiGame/story" element={<Story />} />
//         <Route path="/multiGame/chatbox" element={<Chatbox />} />
//         <Route path="/multiGame/result" element={<Result />} />

//         <Route path="/soloGame/solo_story" element={<SoloStory />} />
//         <Route path="/soloGame/solo_chatbox" element={<SoloChatbox />} />
//         <Route path="/soloGame/solo_result" element={<SoloResult />} />
//       </Routes>
//     </Router>
//   );
// }




// This decides what page shows up

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard.jsx";
import Profile from "./pages/profile.jsx";
import About from "./pages/about.jsx";
import ForgotPassword from "./pages/forgotpass.jsx";
import ResetPassword from "./pages/resetpassword.jsx";
import Leaderboard from "./pages/leaderboard.jsx";
import History from "./pages/history.jsx";
import CaseView from "./pages/caseview.jsx";
// for multi-player
import Multiplayer from "./pages/multiGame/multiplayer.jsx";
import Multi_Join from "./pages/multiGame/multi_join.jsx";
import Waiting_Room from "./pages/multiGame/waiting_room.jsx";
import Created_Room from "./pages/multiGame/created_room.jsx";
import Story from "./pages/multiGame/story.jsx";
import Chatbox from "./pages/multiGame/chatbox.jsx";
import Result from "./pages/multiGame/result.jsx";

// for solo player
import SoloStory from "./pages/soloGame/solo_story.jsx";
import SoloChatbox from "./pages/soloGame/solo_chatbox.jsx";
import SoloResult from "./pages/soloGame/solo_result.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* GENERAL */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/caseview" element={<CaseView />} />



        {/* MULTIPLAYER ROUTES */}
        <Route path="/multiGame/multiplayer" element={<Multiplayer />} />
        <Route path="/multiGame/multi_join" element={<Multi_Join />} />

        {/* 🔥 dynamic roomId routes */}
        <Route path="/multiGame/created_room/:roomId" element={<Created_Room />} />
        <Route path="/multiGame/waiting_room/:roomId" element={<Waiting_Room />} />
        <Route path="/multiGame/story/:roomId" element={<Story />} />
        <Route path="/multiGame/chatbox/:roomId" element={<Chatbox />} />
        <Route path="/multiGame/result/:roomId" element={<Result />} />

        {/* SOLO ROUTES */}
        <Route path="/soloGame/solo_story" element={<SoloStory />} />
        <Route path="/soloGame/solo_chatbox" element={<SoloChatbox />} />
        <Route path="/soloGame/solo_result" element={<SoloResult />} />
      </Routes>
    </Router>
  );
}
