/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({
  path,
  element: Element,
  isAuthenticated,
  redirectTo,
}) => {
  return (
    <Route
      path={path}
      element={isAuthenticated ? <Element /> : <Navigate to={redirectTo} />}
    />
  );
};

export default ProtectedRoute;
