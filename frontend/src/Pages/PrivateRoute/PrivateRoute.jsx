// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const ProtectedRoute = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return keycloak?.authenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
