import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Landing from "./pages/landing";
import SubmitIdea from "./pages/submitIdea";
import VoteIdea from "./pages/voteIdea";
import LogoutPage from "./pages/logout"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/submit-idea" element={<SubmitIdea />} />
        <Route path="/vote-idea" element={<VoteIdea />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
