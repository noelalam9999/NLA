import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const Component = props.component;
  const auth = localStorage.getItem("auth");
  console.log();
  return <>{auth !== null ? <Component /> : <Navigate to="/login" />}</>;
  // return <>{<Component />}</>;
};

export default ProtectedRoute;
