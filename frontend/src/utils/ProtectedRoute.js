import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext.js";

const ProtectedRoute = ({ children }) => {
    
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
