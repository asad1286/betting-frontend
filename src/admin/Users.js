/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useAdmin } from '../contextApi/AdminContext';

const Users = () => {
  const { users, loading, error, fetchAllUsers } = useAdmin();

  // Fetch all users if not already available
  useEffect(() => {
    if (!users) {
      fetchAllUsers();
    }
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* User List Table */}
      <div className="user-table" style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>User Details</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>UID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Phone Number</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Deposit Address</th>
              <th style={styles.tableHeader}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((user) => (
              <tr key={user.id} style={styles.tableRow}>
                <td style={styles.tableData}>{user.uid}</td>
                <td style={styles.tableData}>{`${user.firstName} ${user.lastName}`}</td>
                <td style={styles.tableData}>{user.email}</td>
                <td style={styles.tableData}>{user.phoneNumber}</td>
                <td style={styles.tableData}>{user.role}</td>
                <td style={styles.tableData}>{user.trx20DepositAddress}</td>
                <td style={styles.tableData}>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#ecf0f1',
  },
  tableContainer: {
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
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#34495e',
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

export default Users;
