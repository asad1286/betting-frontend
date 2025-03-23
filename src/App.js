/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage";
import InvitePage from "./InvitePage";
import SettingsPage from "./SettingsPage";
import BottomNav from "./BottomNav";
import BtcPage from "./BtcPage";
import FreePlans from "./FreePlans";
import { PlanProvider } from "./contextApi/PlanContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthProvider, useAuth } from "./contextApi/AuthContext";
import UserProfile from "./UserProfile";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { useAdmin } from "./contextApi/AdminContext";
import WithDrawalRequests from "./admin/WithDrawalRequests";

function App() {
  const { isAdminAuthenticated } = useAdmin(); // Admin authentication
  const { isUserAutenticated } = useAuth(); // User authentication

  return (
    <PlanProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={isUserAutenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={isUserAutenticated ? <Navigate to="/" /> : <LoginForm />} />
            <Route path="/profile" element={isUserAutenticated ? <UserProfile /> : <Navigate to="/login" />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin-login" element={isAdminAuthenticated ? <Navigate to="/admin-dashboard" /> : <AdminLogin />} />
            <Route path="/admin-dashboard" element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
            <Route path="/withdraw-requests" element={isAdminAuthenticated ? <WithDrawalRequests /> : <Navigate to="/admin-login" />} />

            {/* PUBLIC ROUTES */}
            <Route path="/invite" element={<InvitePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/btc-page" element={<BtcPage />} />
            <Route path="/free-plans" element={<FreePlans />} />

            {/* DEFAULT REDIRECTION */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Show Bottom Navigation only if the user is authenticated */}
          {isUserAutenticated && <BottomNav />}
        </div>
      </Router>
    </PlanProvider>
  );
}

export default App;
