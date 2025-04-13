/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAdmin } from '../contextApi/AdminContext';

const AdminDetails = () => {
  const { adminDetails, loading, error, fetchAdminDetails } = useAdmin();
  // console.log("adminDetails", adminDetails);

  // UseEffect to fetch data if not already available
  useEffect(() => {
    if (!adminDetails.usdtBalance) {
      fetchAdminDetails();
    }
  }, [adminDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Destructuring values
  const { usdtBalance, transactionHistory } = adminDetails;
  const { totalSent, totalReceived, transactions } = transactionHistory;

  return (
    <div className="admin-details-container" style={styles.adminContainer}>
      {/* Top Stats Row */}
      <div className="stats-row" style={styles.statsRow}>
        <div className="stat-item" style={styles.statItem}>
          <h2 style={styles.statTitle}>Total</h2>
          <p style={styles.statValue}>{usdtBalance}</p>
        </div>
        <div className="stat-item" style={styles.statItem}>
          <h2 style={styles.statTitle}>Total Received</h2>
          <p style={styles.statValue}>{totalReceived}</p>
        </div>
        <div className="stat-item" style={styles.statItem}>
          <h2 style={styles.statTitle}>Total Sent</h2>
          <p style={styles.statValue}>{totalSent}</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table" style={styles.transactionTable}>
        <h2 style={styles.tableTitle}>Transaction History</h2>
        <table className="table-auto" style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Transaction ID</th>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>Amount (TRX)</th>
              <th style={styles.tableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id} style={styles.tableRow}>
                <td style={styles.tableData}>{transaction.transaction_id}</td>
                <td style={styles.tableData}>{transaction.type}</td>
                <td style={styles.tableData}>{transaction.amount}</td>
                <td style={styles.tableData}>{transaction.block_timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  adminContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#ecf0f1',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    backgroundColor: '#f4f6f7',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  statItem: {
    flex: '1',
    textAlign: 'center',
  },
  statTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#2c3e50',
  },
  statValue: {
    fontSize: '20px',
    color: '#16a085',
  },
  transactionTable: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  tableTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #bdc3c7',
  },
  tableHeader: {
    padding: '12px',
    textAlign: 'left',
    backgroundColor:' #2980b9',
    color:"white",
    fontWeight: 'bold',
    fontSize: '14px'
  },
  tableRow: {
    borderBottom: '1px solid #ecf0f1',
  },
  tableData: {
    padding: '12px',
    fontSize: '14px',
    color: '#7f8c8d',
  },
};

export default AdminDetails;
