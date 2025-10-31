import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../components/MainPage/MainPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ServicePage from "../pages/Service/ServicePage";
import MasterPage from "../pages/Master/MasterPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/Admin/AdminPage";
import { useAuth } from "../context/AuthContext";

const AppRouter = () => {
  const { role, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/services/:serviceId" element={<ServicePage />} />
      <Route path="/masters/:masterId" element={<MasterPage />} />

      {/* Profile route - requires authentication */}
      <Route
        path="/profile"
        element={
          isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
        }
      />

      {/* Admin dashboard route - requires 'admin' role */}
      <Route
        path="/admin"
        element={role === "admin" ? <AdminPage /> : <Navigate to="/" />}
      />

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;