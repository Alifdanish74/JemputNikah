/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, ready } = useContext(UserContext);

  // Wait until UserContext is fully initialized
  if (!ready) return <p>Loading...</p>;

  // Redirect to home page if user is not authenticated
  if (!user) return <Navigate to="/" replace />;

  // Redirect to home page if user is not ADMIN
  if (adminOnly && !user?.isAdmin) return <Navigate to="/" replace />;



  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
