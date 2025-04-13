/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useAdmin } from '../contextApi/AdminContext';
import axios from 'axios';
import axiosInstance from '../AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';

const InvitationsAmounts = () => {
  const { invitationsAmounts, loading, error, fetchAllInvitationsAmounts } = useAdmin();

  // Fetch all users if not already available
  useEffect(() => {
    if (!invitationsAmounts) {
        fetchAllInvitationsAmounts();
    }
  }, [invitationsAmounts]);

  const handleStatusChange = async (invitationId, newStatus) => {
    try {
      const response = await axiosInstance.put(`/admin/update-invitation-status/${invitationId}`,{ status: newStatus });
      if (response.status===200) {
        fetchAllInvitationsAmounts(); // Refresh the table
        toast.success(response.data.message,{autoClose:2000});
      } else {
        toast.error(response.data.message,{autoClose:2000})
      }
    } catch (error) {
        toast.error(error?.response.data.message,{autoClose:2000})
    }
  };
  

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
        <h2 style={styles.tableTitle}>Invitations Amounts Sent Requests</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Plan Name</th>
              <th style={styles.tableHeader}>Amount Sent</th>
              <th style={styles.tableHeader}>UserId</th>
              <th style={styles.tableHeader}>InviterId</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Action</th>
            
            </tr>
          </thead>
          <tbody>
            {invitationsAmounts?.map((user) => (
              <tr key={user.id} style={styles.tableRow}>
                <td style={styles.tableData}>{user.id}</td>
                <td style={styles.tableData}>{user.planName}</td>
                <td style={styles.tableData}>{user.amountSent}</td>
                <td style={styles.tableData}>{user.userId}</td>
                <td style={styles.tableData}>{user.inviterId}</td>
                <td style={styles.tableData}>{user.status}</td>
                <td style={styles.tableData}>
  <select
    value={user.status}
    onChange={(e) => handleStatusChange(user.id, e.target.value)}
    style={{ padding: '6px', borderRadius: '4px' }}
  >
    <option value="pending">Pending</option>
    <option value="sent">Sent</option>
  </select>
</td>

         
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer/>
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

export default InvitationsAmounts;
