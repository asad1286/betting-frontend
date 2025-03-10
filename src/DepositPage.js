import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Using QRCodeSVG from qrcode.react
import "./DepositPage.css";

function DepositPage() {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("TRX");

  const addresses = {
    TRX: "T1234TRXexampleAddress",
    USDT: "U5678USDTexampleAddress",
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <div className="deposit-container">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back to Home
      </button>
      <h1 className="page-title">Deposit</h1>

      <div className="crypto-selector">
        <button
          className={`crypto-button ${selectedCurrency === "TRX" ? "selected" : ""}`}
          onClick={() => handleCurrencyChange("TRX")}
        >
          TRX
        </button>
        <button
          className={`crypto-button ${selectedCurrency === "USDT" ? "selected" : ""}`}
          onClick={() => handleCurrencyChange("USDT")}
        >
          USDT
        </button>
      </div>

      <div className="crypto-details">
        <QRCodeSVG value={addresses[selectedCurrency]} size={180} />
        <h2>{selectedCurrency} Deposit Address</h2>
        <p className="crypto-address">{addresses[selectedCurrency]}</p>
        <p className="network-info">
          This address only accepts {selectedCurrency} deposits.
        </p>
        <p className="network-type">
          Network: {selectedCurrency === "TRX" ? "TRX/TRC20" : "USDT/TRC20"}
        </p>
      </div>
    </div>
  );
}

export default DepositPage;
