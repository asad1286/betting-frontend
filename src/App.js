import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage";
import InvitePage from "./InvitePage";
import SettingsPage from "./SettingsPage";
import BottomNav from "./BottomNav";

import BtcPage from "./BtcPage"; // Import the BtcPage component
import FreePlans from "./FreePlans"; // Import the FreePlans component
import { PlanProvider } from "./contextApi/PlanContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthProvider, useAuth } from "./contextApi/AuthContext";
import UserProfile from "./UserProfile";

function App() {
  // Access authentication status and functions from AuthContext
  const { isAuthenticated } = useAuth();

  return (
  
      <PlanProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
              />
              <Route
                path="/profile"
                element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
              />

              <Route path="/invite" element={<InvitePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/trade" element={<BtcPage />} />
              <Route path="/free-plans" element={<FreePlans />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Bottom Navigation appears on all routes except /login and /register */}
            <Routes>
              <Route path="/login" element={null} />
              <Route path="/register" element={null} />
              <Route path="/*" element={isAuthenticated ? <BottomNav /> : null} />
            </Routes>
          </div>
        </Router>
      </PlanProvider>
    
  );
}

export default App;
