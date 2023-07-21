/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import jwtDecode from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import store from "../store/store";

const ProtectedRoute = () => {
  const location = useLocation();

  // Check if the user is authenticated
  const userAuthStatus = localStorage.getItem("authToken");
  if (userAuthStatus !== null) {
    const decode = jwtDecode(userAuthStatus);
    store.dispatch({ type: "UPDATE_USERDETAILS", payload: [decode] });
  }

  // Check if the token is expired
  const authExpiryStatus = localStorage.getItem("authTokenExpiration");
  const currentTime = new Date().getTime();

  if (
    userAuthStatus !== null &&
    authExpiryStatus !== null &&
    currentTime <= authExpiryStatus
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
