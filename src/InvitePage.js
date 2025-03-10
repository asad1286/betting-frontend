import React, { useState } from "react";
import { FaUser, FaCopy, FaShareAlt, FaInfoCircle } from "react-icons/fa";
import "./InvitePage.css";

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

  return (
    <div className="invite-container">
      <h1>Invite Friends & Earn Rewards</h1>

      <div className="profile-section">
        <FaUser className="profile-icon" />
        <p>
          Username: <strong>Your Name</strong>
        </p>
      </div>

      <div className="invite-code">
        <p>
          Your Invite Code: <strong>{inviteCode}</strong>
        </p>
        <button onClick={copyToClipboard} className="copy-button">
          <FaCopy /> Copy Code
        </button>
      </div>

      <div className="invite-link">
        <p>Share Your Invite Link:</p>
        <input type="text" value={inviteLink} readOnly />
        <button onClick={copyToClipboard} className="copy-button">
          <FaCopy /> Copy Link
        </button>
        <button onClick={shareInvite} className="share-button">
          <FaShareAlt /> Share
        </button>
      </div>

      <h2>Users Who Joined With Your Link</h2>
      <div className="joined-users">
        {joinedUsers.length > 0 ? (
          <ul>
            {joinedUsers.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span> -{" "}
                <span>Joined on {user.joinedAt}</span>
                <button
                  className="details-button"
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
