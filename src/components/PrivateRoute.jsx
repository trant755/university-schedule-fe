import React from "react";
import {} from "antd";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const token = localStorage.getItem("jwt");

  const shouldRedirect = !token;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
