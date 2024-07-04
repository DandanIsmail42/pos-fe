import React from "react";
import { Navigate } from "react-router-dom";
import useGetAuthUser from "../redux/hooks/useGetAuthUser";

const AuthMiddleware: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  // Cek apakah token tersedia dalam local storage atau sesuai kebutuhan aplikasi Anda
  const token = localStorage.getItem("token");

  // Jika token tidak tersedia, redirect pengguna ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika token tersedia, render halaman yang diminta
  return <>{element}</>;
};

export default AuthMiddleware;
