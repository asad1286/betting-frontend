import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WithdrawPage.css";

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
  const finalAmount = amount && !isNaN(amount) ? Number(amount) - fee : 0;

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

  const handleSubmit = () => {
    if (handleValidation()) {
      // Show a confirmation modal before processing withdrawal
      setConfirmModalVisible(true);
    }
  };

  const confirmWithdrawal = () => {
    setConfirmModalVisible(false);
    setIsSubmitting(true);

    // Simulate an API call (or processing)
    setTimeout(() => {
      alert(
        `Withdrawal confirmed:\nAmount: ${amount} ${currency}\nFee: ${fee.toFixed(
          2
        )} ${currency}\nFinal Amount: ${finalAmount.toFixed(
          2
        )} ${currency}\nWallet: ${walletAddress}\nRemarks: ${
          remarks || "None"
        }`
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
    <div>
      {/* Back button fixed on top left */}
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

          {/* Always show Remarks field */}
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
    </div>
  );
}

export default WithdrawPage;
