// Importing required dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Importing auth actions
import { useralreadylogin } from "../redux/auth/auth.action";

// Component to handle private routes
export default function PrivateRoutes({ children }) {
  // Getting token and user data from local storage
  let token = localStorage.getItem("token") || "";
  let res = JSON.parse(localStorage.getItem("userres")) || [];

  // Dispatching useralreadylogin action if token and user data are present
  const dispatch = useDispatch();
  if (token !== "" && res.length !== 0) {
    dispatch(useralreadylogin(res));
  }

  // Getting isAuthenticated value from store
  let { data } = useSelector((store) => store.auth);

  // Redirecting to login page if user is not authenticated
  if (data.isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the children components if user is authenticated
  return children;
}
