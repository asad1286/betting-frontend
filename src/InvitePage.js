/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaUser, FaCopy, FaShareAlt, FaInfoCircle } from "react-icons/fa";

function InvitePage() {
  const [inviteCode] = useState("INVITE123"); // Example invite code
  const [joinedUsers, setJoinedUsers] = useState([
    { id: 1, name: "User A", joinedAt: "2025-02-10" },
    { id: 2, name: "User B", joinedAt: "2025-02-12" },
  ]);

  const inviteLink = `https://yourwebsite.com/signup?ref=${inviteCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied!");
  };

  const shareInvite = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join Our Platform!",
          text: `Use my invite code to join: ${inviteCode}`,
          url: inviteLink,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const viewUserDetails = (user) => {
    alert(`User: ${user.name}\nJoined on: ${user.joinedAt}`);
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "80px 24px 24px", // Added top padding to avoid navbar overlap
      textAlign: "center",
      fontFamily: "'Roboto', sans-serif",
      background: "#1e1a1a",
      color: "#fff",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "16px",
      color: "#ff6f61",
    },
    profileSection: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "24px",
      padding: "12px",
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
    profileIcon: {
      fontSize: "40px",
      color: "#ff6f61",
    },
    inviteCodeSection: {
      marginBottom: "24px",
      padding: "12px",
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
    },
    inviteCodeText: {
      fontSize: "16px",
      marginBottom: "8px",
    },
    copyButton: {
      background: "#ff6f61",
      color: "#ffffff",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background 0.35s ease",
      marginTop: "8px",
    },
    inviteLinkSection: {
      marginBottom: "24px",
      padding: "12px",
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
    },
    inviteLinkText: {
      fontSize: "16px",
      marginBottom: "8px",
    },
    inviteLinkInput: {
      width: "80%",
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #3b3b3b",
      borderRadius: "4px",
      background: "#1e1a1a",
      color: "#ffffff",
      marginBottom: "8px",
      textAlign: "center",
    },
    shareButton: {
      background: "#ff6f61",
      color: "#ffffff",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      marginLeft: "8px",
      transition: "background 0.35s ease",
    },
    joinedUsersSection: {
      marginTop: "24px",
      padding: "12px",
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
      maxHeight: "300px",
      overflowY: "auto",
    },
    joinedUsersHeading: {
      fontSize: "20px",
      marginBottom: "12px",
      color: "#ff6f61",
    },
    userList: {
      listStyle: "none",
      padding: 0,
      fontSize: "16px",
      textAlign: "left",
    },
    userListItem: {
      padding: "6px 0",
      borderBottom: "1px solid #3b3b3b",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detailsButton: {
      background: "#ff6f61",
      border: "none",
      color: "#ffffff",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      cursor: "pointer",
      transition: "background 0.35s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Invite Friends & Earn Rewards</h1>

      <div style={styles.profileSection}>
        <FaUser style={styles.profileIcon} />
        <p>
          Username: <strong>Your Name</strong>
        </p>
      </div>

      <div style={styles.inviteCodeSection}>
        <p style={styles.inviteCodeText}>
          Your Invite Code: <strong>{inviteCode}</strong>
        </p>
        <button style={styles.copyButton} onClick={copyToClipboard}>
          <FaCopy /> Copy Code
        </button>
      </div>

      <div style={styles.inviteLinkSection}>
        <p style={styles.inviteLinkText}>Share Your Invite Link:</p>
        <input
          type="text"
          value={inviteLink}
          readOnly
          style={styles.inviteLinkInput}
        />
        <button style={styles.copyButton} onClick={copyToClipboard}>
          <FaCopy /> Copy Link
        </button>
        <button style={styles.shareButton} onClick={shareInvite}>
          <FaShareAlt /> Share
        </button>
      </div>

      <h2 style={styles.joinedUsersHeading}>Users Who Joined With Your Link</h2>
      <div style={styles.joinedUsersSection}>
        {joinedUsers.length > 0 ? (
          <ul style={styles.userList}>
            {joinedUsers.map((user) => (
              <li key={user.id} style={styles.userListItem}>
                <span>{user.name}</span> -{" "}
                <span>Joined on {user.joinedAt}</span>
                <button
                  style={styles.detailsButton}
                  onClick={() => viewUserDetails(user)}
                >
                  <FaInfoCircle /> View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users have joined yet.</p>
        )}
      </div>
    </div>
  );
}

export default InvitePage;
