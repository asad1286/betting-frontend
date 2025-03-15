import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUserCircle,
  FaSave,
  FaLock,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaEdit,
  FaMoon,
  FaSun,
} from "react-icons/fa";

// Reusable Input Field Component with inline edit button
const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  editable,
  onEditClick,
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-container">
      {Icon && <Icon className="input-icon" aria-hidden="true" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={!editable}
      />
      {!editable && (
        <button
          type="button"
          className="edit-button"
          onClick={onEditClick}
          aria-label={`Edit ${label}`}
        >
          <FaEdit />
        </button>
      )}
    </div>
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  editable: PropTypes.bool,
  onEditClick: PropTypes.func,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  editable: true,
  onEditClick: () => {},
  icon: null,
};

// Reusable Section Title Component
const SectionTitle = ({ title, icon: Icon }) => (
  <div className="section-title">
    {Icon && <Icon style={{ marginRight: "8px" }} aria-hidden="true" />}
    {title}
  </div>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

SectionTitle.defaultProps = {
  icon: null,
};

const UserProfile = () => {
  // User data state
  const [user, setUser] = useState({
    uid: "USER123456",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    profilePicture: "",
  });

  // Editable personal information fields
  const [editedFields, setEditedFields] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    phone: false,
  });

  // Security fields state
  const [security, setSecurity] = useState({
    newPassword: "",
    confirmPassword: "",
    withdrawalPassword: "",
  });

  // Profile picture preview state
  const [previewImage, setPreviewImage] = useState("");

  // Feedback messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Theme toggle state
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Handle saving personal info changes
  const handleSavePersonalInfo = () => {
    setError("");
    setMessage("");
    setUser((prevUser) => ({
      ...prevUser,
      name: editedFields.name,
      email: editedFields.email,
      phone: editedFields.phone,
      profilePicture: previewImage || prevUser.profilePicture,
    }));
    setMessage("Personal information updated successfully!");
    // Lock fields after saving
    setEditableFields({ name: false, email: false, phone: false });
  };

  // Handle security update submission
  const handleSecurityUpdate = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      setError("New login passwords do not match.");
      return;
    }
    setMessage("Security settings updated successfully!");
    // Reset security fields
    setSecurity({
      newPassword: "",
      confirmPassword: "",
      withdrawalPassword: "",
    });
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Update handlers for personal info fields
  const handleFieldChange = (field) => (e) => {
    setEditedFields({ ...editedFields, [field]: e.target.value });
  };

  // Toggle edit mode for a field
  const toggleEditField = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  // Update handlers for security fields
  const handleSecurityFieldChange = (field) => (e) => {
    setSecurity({ ...security, [field]: e.target.value });
  };

  return (
    <div className="profile-container">
      {/* Inline CSS styling */}
      <style>{`
        .profile-container {
          max-width: 600px;
          margin: 10px auto;
          padding: 20px;
          background: ${darkMode ? "#2c2c2c" : "#f5f5f5"};
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          color: ${darkMode ? "white" : "#333"};
          font-family: "Poppins", sans-serif;
          transition: background 0.3s ease, color 0.3s ease;
          min-height: 100vh; /* Ensure the container takes at least the full height of the viewport */
          padding-bottom: 80px; /* Add padding to the bottom to prevent content from being hidden behind the nav bar */
        }
        .profile-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .profile-header h2 {
          font-size: 22px;
          font-weight: bold;
          margin: 10px 0 5px;
        }
        .profile-header p {
          font-size: 14px;
          color: ${darkMode ? "#bbb" : "#777"};
        }
        .profile-picture {
          position: relative;
          display: block;
          width: 60px;
          height: 60px;
          margin: 0 auto 10px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #ff6f61;
        }
        .profile-picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-picture input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .default-avatar {
          font-size: 60px;
          color: #ff6f61;
        }
        .edit-avatar-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          padding: 5px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .form-group label {
          font-weight: bold;
          font-size: 14px;
          color: #ddd;
          margin-bottom: 5px;
        }
        .input-container {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }
        .input-icon {
          color: #ff6f61;
        }
        .form-group input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #555;
          border-radius: 6px;
          background: ${darkMode ? "#333" : "#fff"};
          color: ${darkMode ? "white" : "#333"};
          flex: 1;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }
        .form-group input:disabled {
          background: ${darkMode ? "#444" : "#eee"};
          color: ${darkMode ? "#aaa" : "#555"};
        }
        .form-group input:focus {
          outline: none;
          border-color: #ff6f61;
          box-shadow: 0 0 5px rgba(255, 111, 97, 0.8);
        }
        .edit-button {
          background: none;
          border: none;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #ff6f61;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ff6f61;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .save-btn {
          padding: 12px;
          font-size: 18px;
          background: #ff6f61;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }
        .save-btn:hover {
          background: #e65a50;
        }
        .toggle-theme-btn {
          padding: 8px 12px;
          font-size: 14px;
          background: none;
          border: 1px solid #ff6f61;
          border-radius: 4px;
          color: #ff6f61;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 10px;
          align-self: center;
        }
        .toggle-theme-btn:hover {
          background: #ff6f61;
          color: white;
        }
        .error-message {
          color: #ff6f61;
          text-align: center;
          margin-bottom: 10px;
        }
        .success-message {
          color: #a8ff61;
          text-align: center;
          margin-bottom: 10px;
        }
      `}</style>

      <div className="profile-header">
        <label className="profile-picture">
          {previewImage || user.profilePicture ? (
            <img src={previewImage || user.profilePicture} alt="Profile" />
          ) : (
            <FaUserCircle className="default-avatar" />
          )}
          <div className="edit-avatar-icon">
            <FaEdit />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <h2>{user.name}</h2>
        <p>UID: {user.uid}</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {/* Personal Information Section */}
      <div className="profile-form">
        <SectionTitle title="Personal Information" icon={FaUser} />
        <InputField
          label="Name"
          type="text"
          value={editedFields.name}
          onChange={handleFieldChange("name")}
          icon={FaUser}
          editable={editableFields.name}
          onEditClick={() => toggleEditField("name")}
        />
        <InputField
          label="Email"
          type="email"
          value={editedFields.email}
          onChange={handleFieldChange("email")}
          icon={FaEnvelope}
          editable={editableFields.email}
          onEditClick={() => toggleEditField("email")}
        />
        <InputField
          label="Phone"
          type="tel"
          value={editedFields.phone}
          onChange={handleFieldChange("phone")}
          icon={FaPhone}
          editable={editableFields.phone}
          onEditClick={() => toggleEditField("phone")}
        />
        <button type="button" className="save-btn" onClick={handleSavePersonalInfo}>
          <FaSave /> Save Personal Info
        </button>
      </div>

      {/* Security Settings Section */}
      <form className="profile-form" onSubmit={handleSecurityUpdate}>
        <SectionTitle title="Security Settings" icon={FaLock} />
        <InputField
          label="New Login Password"
          type="password"
          value={security.newPassword}
          onChange={handleSecurityFieldChange("newPassword")}
          placeholder="Enter new login password"
        />
        <InputField
          label="Confirm Login Password"
          type="password"
          value={security.confirmPassword}
          onChange={handleSecurityFieldChange("confirmPassword")}
          placeholder="Confirm new password"
        />
        <InputField
          label="New Withdrawal Password"
          type="password"
          value={security.withdrawalPassword}
          onChange={handleSecurityFieldChange("withdrawalPassword")}
          placeholder="Enter new withdrawal password"
        />
        <button type="submit" className="save-btn">
          <FaSave /> Save Security Settings
        </button>
      </form>

      {/* Theme Toggle */}
      <button type="button" className="toggle-theme-btn" onClick={toggleTheme}>
        {darkMode ? <FaMoon /> : <FaSun />} {darkMode ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default UserProfile;