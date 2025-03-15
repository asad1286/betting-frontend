import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdAccountCircle,
  MdCardGiftcard,
  MdList,
  MdPeople,
  MdAnnouncement,
  MdExitToApp,
  MdEdit,
} from "react-icons/md";

function SettingsPage() {
  const navigate = useNavigate();

  // Handle logout: Navigate to login form
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  // Navigate to profile page when profile section is clicked
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Inline styles derived from your CSS
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "16px",
      fontFamily: "'Roboto', sans-serif",
      color: "#fff",
    },
    profileSection: {
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      cursor: "pointer", // indicates clickable area
    },
    profileHeader: {
      marginBottom: "8px",
    },
    profileIcon: {
      fontSize: "64px",
      color: "#ff6f61",
      marginBottom: "8px",
    },
    profileName: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "4px",
    },
    profileDetail: {
      fontSize: "14px",
      color: "#cccccc",
      marginBottom: "2px",
    },
    editProfileBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "#ff6f61",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      marginTop: "8px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background 0.3s ease",
    },
    menuList: {
      listStyle: "none",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
      overflow: "hidden",
      background: "#2c2c2c",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      marginBottom: "16px",
      padding: "0",
    },
    menuItem: {
      borderBottom: "1px solid #3b3b3b",
    },
    menuItemLast: {
      borderBottom: "none",
    },
    menuButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "none",
      border: "none",
      padding: "12px 16px",
      fontSize: "14px",
      color: "#fff",
      textAlign: "left",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    menuIcon: {
      fontSize: "18px",
      color: "#cccccc",
    },
    logoutButton: {
      color: "#f44336",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top User Info - now clickable */}
      <div style={styles.profileSection} onClick={handleProfileClick}>
        <div style={styles.profileHeader}>
          <MdAccountCircle style={styles.profileIcon} />
          <h2 style={styles.profileName}>John Doe</h2>
          <p style={styles.profileDetail}>hksharma@gmail.com</p>
          <p style={styles.profileDetail}>UID: 10082321</p>
          <p style={styles.profileDetail}>VIP 1</p>
          <button
            style={styles.editProfileBtn}
            onClick={(e) => {
              e.stopPropagation(); // prevent event bubbling
              handleProfileClick();
            }}
          >
            <MdEdit style={{ fontSize: "16px" }} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Vertical Menu Options */}
      <div>
        <ul style={styles.menuList}>
          <li style={styles.menuItem}>
            <button
              style={styles.menuButton}
              onClick={() => navigate("/rewards")}
            >
              <MdCardGiftcard style={styles.menuIcon} />
              Rewards
            </button>
          </li>
          <li style={styles.menuItem}>
            <button
              style={styles.menuButton}
              onClick={() => navigate("/transactions")}
            >
              <MdList style={styles.menuIcon} />
              All Transactions
            </button>
          </li>
          <li style={styles.menuItem}>
            <button
              style={styles.menuButton}
              onClick={() => navigate("/team")}
            >
              <MdPeople style={styles.menuIcon} />
              Team
            </button>
          </li>
          <li style={styles.menuItem}>
            <button
              style={styles.menuButton}
              onClick={() => navigate("/news")}
            >
              <MdAnnouncement style={styles.menuIcon} />
              News & Updates
            </button>
          </li>
          <li style={styles.menuItemLast}>
            <button
              style={{ ...styles.menuButton, ...styles.logoutButton }}
              onClick={handleLogout}
            >
              <MdExitToApp style={styles.menuIcon} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPage;
