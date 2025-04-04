import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../contextApi/AdminContext";
import WithDrawalRequests from "./WithDrawalRequests";
import AdminDetails from "./AdminDetails";
import Users from "./Users";
import axiosInstance from "../AxiosInstance";
import { toast, ToastContainer } from 'react-toastify';
import BTCGames from "./BTCGames";
import Plans from "./Plans";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const { logout, admin, adminDetails, timer, addTimer, fetchSectionTimer } = useAdmin();
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [statusClosed, setStatusClosed] = useState(false);
  const isTimerActive = timer?.statusClosed;
  const isStartTimePassed = timer?.startTime && new Date(timer.startTime) < new Date();
  const isEndTimePassed = timer?.endTime && new Date(timer.endTime) < new Date();

  const isAddButtonVisible = !isTimerActive && isEndTimePassed;
  // console.log("isAddButtonVisible", isAddButtonVisible);
  // const isComingSoonVisible = !isTimerActive && isStartTimePassed && !isEndTimePassed;
  const modalRef = useRef(null);

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();

      if (timer?.startTime && new Date(timer.startTime) > now) {
        // Timer hasn't started yet, show "Coming Soon"
        setRemainingTime("Coming Soon");
      } else if (timer?.endTime && new Date(timer.endTime) < now) {
        // Timer has ended, show "Add Timer" button
        setRemainingTime("Time Over");
      } else if (timer?.endTime && new Date(timer.endTime) > now) {
        // Timer is active, show remaining time
        const endTime = new Date(timer.endTime);
        const diff = endTime - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDetails />;
      case "users":
        return <Users />;
      case "WithDrawalRequests":
        return <WithDrawalRequests />;
      case "Plans":
        return <Plans />;
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const sendTimerRequest = async () => {
    try {
      const response = await axiosInstance.post("/admin/add-timer", {
        startTime,
        endTime
      });

      if (response.status === 201) {
        fetchSectionTimer();
        toast.success(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error setting timer:", error);
      toast.error("Failed to set timer");
    }
  };

  const handleAddTimer = () => {
    if (startTime || endTime) {
      sendTimerRequest();
      setIsModalOpen(false);
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <img
            src="https://img.icons8.com/?size=100&id=23280&format=png&color=000000"
            alt="Admin Profile"
            className="profile-img"
          />
          <br />
          <span className="profile-name">{admin?.firstName}</span>
        </div>
        <ul className="nav-list">
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("users")}>Users</li>
          <li onClick={() => setActivePage("WithDrawalRequests")}>Withdraw Requests</li>
          <li onClick={() => setActivePage("Plans")}>Plans</li>
          {/* <li onClick={() => setActivePage("BTCGames")}>BTC Games</li> */}
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          {/* <div className="admin-timer">
            {remainingTime === "Coming Soon" ? (
              <span>Coming Soon Timer Start</span>
            ) : remainingTime === "Time Over" ? (
              <span></span>
            ) : (
              <>
                <strong>BTC Game Playing Timer: </strong>
                <span>{remainingTime}</span>
              </>
            )}
            {isEndTimePassed && (
              <button className="add-timer-btn" onClick={() => setIsModalOpen(true)}>
                Add Timer
              </button>
            )}
          </div> */}
        </header>
        <section className="admin-content">{renderContent()}</section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h3 className="modal-title">Add Timer</h3>
            <div className="modal-body">
              <label>
                Start Time:
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </label>
              <label>
                End Time:
                <input
                  type="datetime-local"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </label>
              
            </div>
            <div className="modal-footer">
              <button onClick={handleAddTimer}>Set Timer</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      
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
        .nav-list {
          list-style: none;
          padding: 0;
        }
        .nav-list li {
          padding: 8px 0;
          cursor: pointer;
          border-bottom: 1px solid #34495e;
          transition: background-color 0.2s;
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
        .admin-timer {
          font-weight: bold;
        }
        .add-timer-btn {
          background-color: #27ae60;
          color: white;
          padding: 8px 15px;
          border: none;
          border-radius: 4px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border: 1px solid black;
          width: 300px;
          color: black;
          box-shadow: none;
          text-align: center;
        }
        .modal-content label {
          display: flex;
          color: black;
          flex-direction: column;
          align-items: start;
          margin-bottom: 8px;
        }
        .modal-content input, .modal-content select {
          width: 100%;
          padding: 6px;
          border: 1px solid black;
        }
        .modal-content button {
          background-color: gray;
          color: black;
          padding: 5px 10px;
          border: 1px solid black;
          cursor: pointer;
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
