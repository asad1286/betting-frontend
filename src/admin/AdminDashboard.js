/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../contextApi/AdminContext";
import WithDrawalRequests from "./WithDrawalRequests";
import AdminDetails from "./AdminDetails";
import Users from "./Users";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const { logout, admin,adminDetails } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDetails/>;
      case "users":
        return <Users/>;
      case "WithDrawalRequests":
        return <WithDrawalRequests />;
      case "btcGameControl":
        return (
          <div>
            <h2>BTC Game Control</h2>
            <p>Adjust game parameters and monitor BTC game operations.</p>
          </div>
        );
      case "logout":
        return (
          <div>
            <h2>Logout</h2>
            <p>You have been logged out.</p>
          </div>
        );
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <img
            src="https://img.icons8.com/?size=100&id=23280&format=png&color=000000"
            alt="Admin Profile"
            className="profile-img"
          />
          <span className="profile-name">{admin?.firstName}</span>
        </div>
        <ul className="nav-list">
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("users")}>Users</li>
          <li onClick={() => setActivePage("WithDrawalRequests")}>
            Withdraw Requests
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-profile-options">
            
            <span onClick={handleLogout}>Logout</span>
          </div>
        </header>
        <section className="admin-content">{renderContent()}</section>
      </main>

      {/* Embedded CSS */}
      <style>{`
        .admin-container {
          display: flex;
          font-family: Arial, sans-serif;
        }
        .admin-sidebar {
          width: 200px;
          background-color: #2c3e50;
          color: #ecf0f1;
          height: auto;
          padding: 15px;
        }
        .admin-profile {
          text-align: center;
          margin-bottom: 20px;
        }
        .profile-img {
          border-radius: 50%;
          width: 45px;
          height: 45px;
        }
        .profile-name {
          display: block;
          font-size: 14px;
        }
        .nav-list {
          list-style: none;
          padding: 0;
        }
        .nav-list li {
          padding: 8px 0;
          cursor: pointer;
          border-bottom: 1px solid #34495e;
          transition: background-color 0.2s;
          font-size: 14px;
        }
        .nav-list li:hover {
          background-color: #34495e;
        }
        .admin-main {
          flex: 1;
          padding: 20px;
          background-color: #ecf0f1;
          min-height: 100vh;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #2980b9;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
        }
        .admin-profile-options span {
          margin-left: 15px;
          cursor: pointer;
          font-weight: bold;
        }
        .admin-content {
          margin-top: 20px;
          background: white;
          color:gray;
          padding: 20px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
