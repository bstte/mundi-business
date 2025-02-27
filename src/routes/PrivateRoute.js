import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Redux ya localStorage se token lein

  return token ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
