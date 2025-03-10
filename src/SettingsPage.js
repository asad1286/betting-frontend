import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdAccountCircle,
  MdCardGiftcard,
  MdList,
  MdPeople,
  MdAnnouncement,
  MdExitToApp,
  MdEdit
} from "react-icons/md";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/auth");
  };

  // Navigate to edit profile
  const handleEditProfile = () => {
    alert("Navigating to Edit Profile...");
    navigate("/edit-profile"); // Adjust the route as needed
  };

  return (
    <div className="settings-page">
      {/* Top User Info */}
      <div className="profile-section">
        <div className="profile-header">
          <MdAccountCircle className="profile-icon" />
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-email">hksharma@gmail.com</p>
          <p className="profile-uid">UID: 10082321</p>
          <p className="profile-level">VIP 1</p>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            <MdEdit className="edit-icon" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Vertical Menu Options */}
      <div className="menu-list">
        <ul>
          <li>
            <button onClick={() => navigate("/rewards")}>
              <MdCardGiftcard className="menu-icon" />
              Rewards
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/transactions")}>
              <MdList className="menu-icon" />
              All Transactions
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/team")}>
              <MdPeople className="menu-icon" />
              Team
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/news")}>
              <MdAnnouncement className="menu-icon" />
              News & Updates
            </button>
          </li>
          <li className="logout-option">
            <button onClick={handleLogout}>
              <MdExitToApp className="menu-icon" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPage;
