import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import InvitePage from "./InvitePage";
import SettingsPage from "./SettingsPage";
import BottomNav from "./BottomNav";
import AuthPage from "./AuthPage"; // Combined AuthPage for login/register
import BtcPage from "./BtcPage"; // Import the BtcPage component
import FreePlans from "./FreePlans"; // Import the FreePlans component

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} /> {/* Auth Page for login/register */}
          <Route path="/invite" element={<InvitePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/trade" element={<BtcPage />} /> {/* Route for Trade (BTC Game) */}
          <Route path="/free-plans" element={<FreePlans />} /> {/* Route for Free Plans */}
        </Routes>

        {/* Bottom Navigation (appears on all pages except AuthPage) */}
        <Routes>
          <Route path="/auth" element={null} />
          <Route path="/*" element={<BottomNav />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;