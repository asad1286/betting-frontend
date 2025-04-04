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
import { useAuth } from "./contextApi/AuthContext";
import UserProfile from "./UserProfile";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { useAdmin } from "./contextApi/AdminContext";
import WithDrawalRequests from "./admin/WithDrawalRequests";

function App() {
  const { isAdminAuthenticated, admin } = useAdmin(); // Admin authentication
  // console.log("isAdminAuthenticated", isAdminAuthenticated);

  const { isUserAutenticated, user, timer } = useAuth(); // User authentication
  // console.log("isUserAutenticated", isUserAutenticated);

  const now = new Date();
  const isBtcGameAvailable = timer?.endTime && new Date(timer.endTime) > now;

  return (
    <PlanProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* If an admin is authenticated, redirect to Admin Dashboard */}
            <Route
              path="/"
              element={isAdminAuthenticated ? <Navigate to="/admin-dashboard" /> : (isUserAutenticated ? <HomePage /> : <Navigate to="/login" />)}
            />

            {/* Login Route */}
            <Route path="/login" element={isUserAutenticated || isAdminAuthenticated ? <Navigate to="/" /> : <LoginForm />} />

            {/* Signup Route */}
            <Route path="/signup" element={isUserAutenticated ? <Navigate to="/" /> : <RegisterForm />} />

            {/* User Profile Route */}
            <Route path="/profile" element={isUserAutenticated ? <UserProfile /> : <Navigate to="/login" />} />

            {/* ADMIN ROUTES */}
            <Route
              path="/admin-login"
              element={isAdminAuthenticated ? <Navigate to="/admin-dashboard" /> : <AdminLogin />}
            />
            <Route
              path="/admin-dashboard"
              element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/withdraw-requests"
              element={isAdminAuthenticated ? <WithDrawalRequests /> : <Navigate to="/login" />}
            />
            <Route
              path="/btc-games"
              element={isAdminAuthenticated ? <WithDrawalRequests /> : <Navigate to="/login" />}
            />

            {/* PUBLIC ROUTES */}
            <Route path="/invite" element={<InvitePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/btc-page" element={isBtcGameAvailable ? <BtcPage /> : <Navigate to="/" />} />
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
