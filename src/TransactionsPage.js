import React, { useState, useEffect } from "react";
import { FaSpinner, FaCheckCircle, FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";

const TransactionsPage = () => {
  // Sample transactions data (replace with API calls if needed)
  const [transactions, setTransactions] = useState([
    { id: 1, type: "deposit", amount: 500, date: "2023-02-15", status: "completed" },
    { id: 2, type: "withdrawal", amount: 200, date: "2023-03-01", status: "processing" },
    { id: 3, type: "deposit", amount: 1000, date: "2023-03-05", status: "completed" },
    { id: 4, type: "withdrawal", amount: 300, date: "2023-03-07", status: "completed" },
    { id: 5, type: "deposit", amount: 250, date: "2023-03-10", status: "processing" },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Uncomment below useEffect if you wish to fetch data from an API
  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const response = await axios.get("https://api.example.com/transactions");
  //       setTransactions(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchTransactions();
  // }, []);

  const filteredTransactions = transactions.filter((tx) =>
    tx.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="transactions-container">
      <style>{`
        .transactions-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: #2c2c2c;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          font-family: 'Poppins', sans-serif;
          color: #fff;
        }
        .transactions-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          text-align: center;
        }
        .transactions-header h1 {
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          color: #ff6f61;
        }
        .search-bar {
          display: flex;
          align-items: center;
          background: #3b3b3b;
          border-radius: 6px;
          padding: 8px 12px;
          gap: 8px;
        }
        .search-bar input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 16px;
        }
        .transaction-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #444;
          padding: 12px 0;
          transition: background 0.3s ease;
        }
        .transaction-item:hover {
          background: #3b3b3b;
        }
        .transaction-type {
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: capitalize;
          font-weight: 500;
          flex: 1;
          min-width: 100px;
        }
        .transaction-date {
          font-size: 14px;
          color: #aaa;
          flex: 1;
          text-align: center;
        }
        .transaction-amount {
          font-size: 16px;
          font-weight: 600;
          flex: 1;
          text-align: center;
        }
        .transaction-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: bold;
          flex: 1;
          text-align: right;
          min-width: 100px;
        }
        .status-processing {
          color: #f39c12;
        }
        .status-completed {
          color: #27ae60;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .transactions-container {
            padding: 15px;
            margin: 10px auto;
          }
          .transaction-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          .transaction-type,
          .transaction-date,
          .transaction-amount,
          .transaction-status {
            text-align: left;
            width: 100%;
          }
          .transaction-status {
            justify-content: flex-start;
          }
        }
      `}</style>
      <div className="transactions-header">
        <h1>Transaction History</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="loading-spinner" style={{ textAlign: "center", fontSize: "18px", color: "#ff6f61" }}>
          Loading...
        </div>
      ) : (
        <ul className="transaction-list">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <li key={tx.id} className="transaction-item">
                <div className="transaction-type">
                  {tx.type === "deposit" ? (
                    <FaArrowDown style={{ color: "#27ae60" }} />
                  ) : (
                    <FaArrowUp style={{ color: "#f44336" }} />
                  )}
                  {tx.type}
                </div>
                <div className="transaction-date">{tx.date}</div>
                <div className="transaction-amount">${tx.amount.toFixed(2)}</div>
                <div className={`transaction-status ${tx.status === "processing" ? "status-processing" : "status-completed"}`}>
                  {tx.status === "processing" ? (
                    <FaSpinner className="spinner" />
                  ) : (
                    <FaCheckCircle />
                  )}
                  {tx.status}
                </div>
              </li>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No transactions found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TransactionsPage;
