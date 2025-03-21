import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import AdminLogin from "../AdminPages/AdminLogin/AdminLogin";

import PrivateRoute from "./PrivateRoute"; // Import Private Route
import Chat from "../components/Chat";
import DataVisualization from "../pages/DataVisualization/DataVisualization";



const Home = lazy(() => import("../pages/Home/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AdminDashboard = lazy(() => import("../AdminPages/AdminDashboard/AdminDashboard"));
const AdminManageUsers = lazy(() => import("../AdminPages/AdminManageUsers/AdminManageUsers"));
const AppRoutes = () => {


 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} /> {/* ✅ Add Chat Page */}
        <Route path="/data-visualization" element={<DataVisualization />} />

        {/* Protected User Dashboard Route */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Dashboard Route */}
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute element={<AdminDashboard />} />}
        />
         <Route
          path="/admin/manage-users"
          element={<PrivateRoute element={<AdminManageUsers />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
