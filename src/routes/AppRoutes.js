import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Signup from "../pages/Signup/Signup"; // साइनअप पृष्ठ आयात करें

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} /> {/* साइनअप रूट */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
