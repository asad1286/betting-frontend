import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function WithdrawPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [currency, setCurrency] = useState("TRX"); // Default to TRX
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  // Compute a transaction fee (1% fee)
  const fee = amount && !isNaN(amount) ? Number(amount) * 0.01 : 0;
  const finalAmount =
    amount && !isNaN(amount) ? Number(amount) - fee : 0;

  const handleValidation = () => {
    if (!amount || !walletAddress || !withdrawPassword) {
      setError("All required fields must be filled.");
      return false;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return false;
    }
    // Validate TRX wallet: must start with "T" and followed by 33 alphanumeric characters
    if (currency === "TRX" && !walletAddress.match(/^T[a-zA-Z0-9]{33}$/)) {
      setError("Please enter a valid TRX wallet address.");
      return false;
    }
    // Validate USDT wallet: allow alphanumeric characters, length between 34 and 42
    if (currency === "USDT" && !walletAddress.match(/^[a-zA-Z0-9]{34,42}$/)) {
      setError("Please enter a valid USDT wallet address.");
      return false;
    }
    if (withdrawPassword.length < 6) {
      setError("Withdrawal password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // Show confirmation modal before processing withdrawal
      setConfirmModalVisible(true);
    }
  };

  const confirmWithdrawal = () => {
    setConfirmModalVisible(false);
    setIsSubmitting(true);

    // Simulate API call or processing delay
    setTimeout(() => {
      alert(
        `Withdrawal confirmed:
Amount: ${amount} ${currency}
Fee: ${fee.toFixed(2)} ${currency}
Final Amount: ${finalAmount.toFixed(2)} ${currency}
Wallet: ${walletAddress}
Remarks: ${remarks || "None"}`
      );
      setIsSubmitting(false);
      // Clear form fields after success
      setAmount("");
      setWalletAddress("");
      setWithdrawPassword("");
      setRemarks("");
    }, 2000);
  };

  return (
    <>
      {/* Inject CSS via a style tag */}
      <style>{`
        /* Define CSS Variables */
        :root {
          --primary-color: #ffcc00;
          --secondary-color: #0d1117;
          --accent-orange: #f7931a;
          --accent-blue: #627eea;
          --accent-green: #28a745;
          --error-color: #e74c3c;
          --font-family: "Poppins", sans-serif;
          --transition-speed: 0.3s;
        }

        /* Global Reset & Base Font */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: var(--font-family);
          background-color: #121212;
          color: #fff;
        }

        /* Back Button - fixed on top left */
        .back-button {
          position: fixed;
          top: 20px;
          left: 20px;
          background: var(--accent-orange);
          color: #000;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: background var(--transition-speed);
          z-index: 1100;
        }
        .back-button:hover {
          background: #e5a600;
        }

        /* Withdraw Container */
        .withdraw-container {
          max-width: 500px;
          margin: 60px auto;
          padding: 40px 30px;
          background: #1e1e1e;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
          text-align: center;
        }

        /* Page Title */
        .page-title {
          font-size: 30px;
          margin-bottom: 25px;
          color: var(--primary-color);
        }

        /* Crypto Selector */
        .crypto-selector {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 25px;
        }
        .crypto-button {
          background: #333;
          border: 2px solid var(--accent-orange);
          color: #fff;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color var(--transition-speed), transform 0.2s;
        }
        .crypto-button.selected,
        .crypto-button:hover {
          background: var(--accent-orange);
          border-color: var(--accent-orange);
          color: #000;
        }

        /* Withdraw Form */
        .withdraw-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-group label {
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #ccc;
        }
        .input-group input {
          padding: 12px;
          border: 2px solid #333;
          border-radius: 8px;
          font-size: 16px;
          background: #000;
          color: #fff;
          transition: border-color var(--transition-speed);
        }
        .input-group input:focus {
          outline: none;
          border-color: var(--accent-orange);
        }

        /* Fee Info */
        .fee-info {
          text-align: left;
          font-size: 14px;
          color: #ccc;
        }

        /* Error Message */
        .error-message {
          color: var(--error-color);
          font-size: 14px;
          text-align: center;
          margin-top: -5px;
        }

        /* Withdraw Button */
        .withdraw-button {
          background: var(--accent-green);
          color: #fff;
          border: none;
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background var(--transition-speed), transform 0.2s;
          margin-top: 10px;
        }
        .withdraw-button:hover {
          background: #218838;
          transform: scale(1.02);
        }

        /* Confirmation Modal */
        .confirm-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #1e1e1e;
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          text-align: left;
        }
        .modal-content h2 {
          margin-top: 0;
          color: var(--primary-color);
        }
        .modal-content p {
          margin: 10px 0;
          font-size: 16px;
          color: #ccc;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .modal-button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background var(--transition-speed);
        }
        .modal-button.cancel {
          background: var(--accent-orange);
          color: #000;
        }
        .modal-button.cancel:hover {
          background: #e5a600;
        }
        .modal-button.confirm {
          background: var(--accent-green);
          color: #fff;
        }
        .modal-button.confirm:hover {
          background: #218838;
        }
      `}</style>
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back
      </button>

      <div className="withdraw-container">
        <h1 className="page-title">Withdraw Funds</h1>

        <div className="crypto-selector">
          <button
            type="button"
            className={`crypto-button ${currency === "TRX" ? "selected" : ""}`}
            onClick={() => setCurrency("TRX")}
          >
            TRX
          </button>
          <button
            type="button"
            className={`crypto-button ${currency === "USDT" ? "selected" : ""}`}
            onClick={() => setCurrency("USDT")}
          >
            USDT
          </button>
        </div>

        <form
          className="withdraw-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="input-group">
            <label htmlFor="amount">Amount to Withdraw:</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${currency}`}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="walletAddress">Wallet Address:</label>
            <input
              id="walletAddress"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder={`Enter your ${currency} wallet address`}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="withdrawPassword">Withdrawal Password:</label>
            <input
              id="withdrawPassword"
              type="password"
              value={withdrawPassword}
              onChange={(e) => setWithdrawPassword(e.target.value)}
              placeholder="Enter your withdrawal password"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="remarks">Remarks (optional):</label>
            <input
              id="remarks"
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter any remarks..."
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="fee-info">
            {amount && !isNaN(amount) && Number(amount) > 0 && (
              <>
                <p>
                  Transaction Fee (1%):{" "}
                  <strong>{fee.toFixed(2)} {currency}</strong>
                </p>
                <p>
                  Final Amount:{" "}
                  <strong>{finalAmount.toFixed(2)} {currency}</strong>
                </p>
              </>
            )}
          </div>

          <button type="submit" className="withdraw-button" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>

      {confirmModalVisible && (
        <div className="confirm-modal">
          <div className="modal-content">
            <h2>Confirm Withdrawal</h2>
            <p>
              <strong>Amount:</strong> {amount} {currency}
            </p>
            <p>
              <strong>Transaction Fee:</strong> {fee.toFixed(2)} {currency}
            </p>
            <p>
              <strong>Final Amount:</strong> {finalAmount.toFixed(2)} {currency}
            </p>
            <p>
              <strong>Wallet Address:</strong> {walletAddress}
            </p>
            {remarks && (
              <p>
                <strong>Remarks:</strong> {remarks}
              </p>
            )}
            <div className="modal-actions">
              <button
                className="modal-button cancel"
                onClick={() => setConfirmModalVisible(false)}
              >
                Cancel
              </button>
              <button className="modal-button confirm" onClick={confirmWithdrawal}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WithdrawPage;
