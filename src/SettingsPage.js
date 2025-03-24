import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdAccountCircle,
  MdList,
  MdExitToApp,
  MdEdit,
  MdContentCopy,
  MdAttachMoney,
} from "react-icons/md";
import { useAuth } from "./contextApi/AuthContext";
import { FaCoins } from "react-icons/fa";
import axiosInstance from "./AxiosInstance";
import { toast, ToastContainer } from 'react-toastify';

function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [trc20WithdrawAddress, setTrc20WithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(10);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  };

  const handleWithdraw = async () => {
    if (!trc20WithdrawAddress) {
      setError("Please enter a TRC20 withdrawal address.");
      setTimeout(() => setError(""), 3000); // Clear the error after 3 seconds
      return;
    }
    if (withdrawAmount < 10) {
      setError("Amount must be at least 10 TRX.");
      setTimeout(() => setError(""), 3000); // Clear the error after 3 seconds
      return;
    }

    try {
      // Send Axios POST request to the API
      const response = await axiosInstance.post("/auth/user/withdraw-request", {
        trc20WithdrawAddress,
        withdrawAmount,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.error("Withdrawal failed. Please try again.");
      }
    } catch (error) {
      console.error("Withdraw Error:", error);
      toast.error("An error occurred. Please try again later.");
    }

    setShowWithdrawModal(false);
  };

  return (
    <div style={styles.container}>
      {/* Profile Section */}
      <div style={styles.profileSection} onClick={() => navigate("/profile")}>
        <MdAccountCircle style={styles.profileIcon} />
        <h2 style={styles.profileName}>{user?.firstName} {user?.lastName}</h2>
        <p style={styles.profileDetail}>UID: {user?.uid}</p>
        <button
          style={styles.editProfileBtn}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/profile");
          }}
        >
          <MdEdit style={{ fontSize: "16px" }} /> Edit Profile
        </button>
      </div>

      {/* Menu List */}
      <ul style={styles.menuList}>
        {/* Deposit */}
        <li style={styles.menuItem}>
          <button style={styles.menuButton} onClick={() => setShowDepositModal(true)}>
            <FaCoins style={styles.menuIcon} /> Deposit
          </button>
        </li>

        {/* Transactions */}
        <li style={styles.menuItem}>
          <button style={styles.menuButton} onClick={() => navigate("/transactions")}>
            <MdList style={styles.menuIcon} /> All Transactions
          </button>
        </li>

        {/* Withdraw */}
        <li style={styles.menuItem}>
          <button style={styles.menuButton} onClick={() => setShowWithdrawModal(true)}>
            <MdAttachMoney style={styles.menuIcon} /> Withdraw
          </button>
        </li>

        {/* Logout */}
        <li style={styles.menuItem}>
          <button style={{ ...styles.menuButton, ...styles.logoutButton }} onClick={handleLogout}>
            <MdExitToApp style={styles.menuIcon} /> Logout
          </button>
        </li>
      </ul>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div style={styles.modalOverlay} onClick={() => setShowDepositModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Deposit TRX</h2>
            <p style={styles.modalText}>Your TRC20 deposit address:</p>
            <div style={styles.depositBox}>
              <span style={styles.depositAddress}>{user?.trx20DepositAddress}</span>
              <MdContentCopy
                style={styles.copyIcon}
                onClick={() => handleCopy(user?.trx20DepositAddress)}
              />
            </div>
            <button onClick={() => setShowDepositModal(false)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div style={styles.modalOverlay} onClick={() => setShowWithdrawModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Withdraw TRX</h2>
            <label style={styles.modalLabel}>TRC20 Address:</label>
            <input
              type="text"
              value={trc20WithdrawAddress}
              onChange={(e) => setTrc20WithdrawAddress(e.target.value)}
              style={{ ...styles.inputField, borderColor: error ? 'red' : '#ccc' }}
            />
            {error && <p style={styles.errorText}>{error}</p>}
            <label style={styles.modalLabel}>Amount (Min 10 TRX):</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setWithdrawAmount(value); // Update state only if value is non-negative
                }
              }}
              style={{ ...styles.inputField, borderColor: error ? 'red' : '#ccc' }}
            />

            <button onClick={handleWithdraw} style={styles.withdrawButton}>Confirm Withdraw</button>
            <button onClick={() => setShowWithdrawModal(false)} style={styles.closeButton}>Cancel</button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", padding: "16px", color: "#fff" },
  profileSection: { background: "#2c2c2c", padding: "16px", textAlign: "center", cursor: "pointer" },
  profileIcon: { fontSize: "64px", color: "#ff6f61" },
  profileName: { fontSize: "22px", fontWeight: "600" },
  profileDetail: { fontSize: "14px", color: "#cccccc" },
  editProfileBtn: { background: "#ff6f61", color: "#fff", padding: "6px 12px", cursor: "pointer" },
  menuList: { listStyle: "none", padding: "0", background: "#2c2c2c" },
  menuItem: { borderBottom: "1px solid #3b3b3b", padding: "10px" },
  menuButton: { width: "100%", display: "flex", alignItems: "center", background: "none", border: "none", fontSize: "14px", color: "#fff", cursor: "pointer" },
  menuIcon: { fontSize: "18px", color: "#cccccc", marginRight: "8px" },
  logoutButton: { color: "#f44336" },
  modalOverlay: { position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#222", padding: "20px", borderRadius: "8px", textAlign: "center", width: "400px", color: "#fff" },
  modalTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px" },
  modalText: { fontSize: "14px", marginBottom: "10px" },
  modalLabel: { display: "block", textAlign: "left", marginBottom: "5px", fontSize: "14px" },
  depositBox: { background: "#333", padding: "8px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  depositAddress: { fontSize: "14px", wordBreak: "break-all" },
  copyIcon: { cursor: "pointer", fontSize: "18px" },
  inputField: { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  withdrawButton: { background: "#ff6f61", color: "#fff", padding: "8px", borderRadius: "4px", width: "100%", cursor: "pointer" },
  closeButton: { background: "#333", color: "#fff", padding: "8px", borderRadius: "4px", width: "100%", cursor: "pointer", marginTop: "10px" },
  errorText: { color: "red", fontSize: "12px", marginTop: "5px" }
};

export default SettingsPage;
