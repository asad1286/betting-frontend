import React, { use, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
  FaCog,
  FaCogs
} from "react-icons/fa";
import { useAuth } from "./contextApi/AuthContext";
import axiosInstance from "./AxiosInstance";

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
    {Icon && <Icon style={{ marginRight: "8px" ,}} aria-hidden="true" />}
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
  const { user,token,updateUser } = useAuth(); // Get updateUser from auth context
  const [editedFields, setEditedFields] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
  });
  
  const toggleEditable = (field) => {
    setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || "");
  const [message, setMessage] = useState("");
  const [showSecurityForm, setShowSecurityForm] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageUpdate, setUpdateMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const toggleSecurityForm = () => {
    setShowSecurityForm(!showSecurityForm);
    // Reset security fields when hiding
    if (showSecurityForm) {
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };
  const handleSavePersonalInfo = async () => {
    try {
      const response = await axiosInstance.put("/auth/user/update_profile",editedFields);

      updateUser(response.data.user);
      setEditableFields({ firstName: false, lastName: false, phoneNumber: false });
      setUpdateMessage("Profile updated successfully!");
      setTimeout(() => setUpdateMessage(null), 3000);
      
    } catch (err) {
      setErrorUpdate(err.response?.data?.message || "Failed to update profile");
      setTimeout(() => setErrorUpdate(null), 3000);
    }
  };


  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      setErrorPassword("Passwords do not match");
      setTimeout(() => setErrorPassword(null), 3000);
      return;
    }

    try {
      await axiosInstance.put(
        "/auth/user/update_password",
        {
          currentPassword: security.currentPassword,
          newPassword: security.newPassword,
        }
      );
      
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMessagePassword("Password updated successfully!");
      setTimeout(() => setMessagePassword(null), 3000);
      
    } catch (err) {
      setErrorPassword(err.response?.data?.message || "Password update failed");
      setTimeout(() => setErrorPassword(null), 3000);
    }
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("profile", file);
      
  //     const response = await axios.post("/api/user/avatar", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     setPreviewImage(response.data.avatarUrl);
  //     updateUser({ ...user, profilePicture: response.data.avatarUrl });
  //   } catch (err) {
  //     setError("Failed to update profile picture");
  //   }
  // };

  // Keep all styling code as is

  return (
    <div className="profile-container">
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
          {previewImage ? (
            <img src={previewImage} alt="Profile" />
          ) : (
            <FaUserCircle className="default-avatar" />
          )}
          <input type="file"/>
        </label>
        <h2>{user?.firstName} {user?.lastName}</h2>
        <p>UID: {user?.uid}</p>
      </div>

      {/* Personal Information Section */}
      <div className="profile-form">
      {errorUpdate && <div className="error-message">{errorUpdate}</div>}
      {messageUpdate && <div className="success-message">{messageUpdate}</div>}
        <SectionTitle title="Personal Information" icon={FaUser} />
        <InputField
       label="First Name"
       value={editedFields.firstName}
       onChange={(e) => setEditedFields({...editedFields, firstName: e.target.value})}
       icon={FaUser}
       editable={editableFields.firstName}
       onEditClick={() => toggleEditable('firstName')}
        />
         <InputField
           label="Last Name"
           value={editedFields.lastName}
           onChange={(e) => setEditedFields({...editedFields, lastName: e.target.value})}
           icon={FaUser}
           editable={editableFields.lastName}
           onEditClick={() => toggleEditable('lastName')}
        />
        <InputField
          label="Email"
          value={user?.email}
          icon={FaEnvelope}
          editable={false}
        />
        <InputField
          label="Phone Number"
          value={editedFields.phoneNumber}
          onChange={(e) => setEditedFields({...editedFields, phoneNumber: e.target.value})}
          icon={FaPhone}
          editable={editableFields.phoneNumber}
          onEditClick={() => toggleEditable('phoneNumber')}
        />
        <button className="save-btn" onClick={handleSavePersonalInfo}>
          <FaSave /> Save
        </button>
      </div>

      <button 
        className="toggle-security-btn save-btn"
        onClick={toggleSecurityForm}
        style={{ marginTop: '20px' }}
      >
        <FaCogs /> {showSecurityForm ? "Hide Security Settings" : "Show Security Settings"}
      </button>

      {/* Security Settings Section */}
      {showSecurityForm && (
        <form className="profile-form" onSubmit={handleSecurityUpdate}>
          <SectionTitle title="Security Settings" icon={FaLock} />
          {errorPassword && <div className="error-message">{errorPassword}</div>}
          {messagePassword && <div className="success-message">{messagePassword}</div>}
          <InputField
            label="Current Password"
            type="password"
            value={security.currentPassword}
            onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
            editable={true}
          />
          <InputField
            label="New Password"
            type="password"
            value={security.newPassword}
            onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
            editable={true}
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={security.confirmPassword}
            onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
            editable={true}
          />
          <button type="submit" className="save-btn">
            <FaSave /> Update Password
          </button>
        </form>
      )}

      {/* Theme Toggle */}
      <button className="toggle-theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaMoon /> : <FaSun />} {darkMode ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default UserProfile;