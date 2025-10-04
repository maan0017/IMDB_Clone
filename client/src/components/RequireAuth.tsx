import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import useAuth from "../hooks/useAuth";

const RequiredAuth: React.FC = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Spinner />
      </div>
    );
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
