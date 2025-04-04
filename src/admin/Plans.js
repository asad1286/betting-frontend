import React, { useState, useEffect } from 'react';
import { usePlans } from '../contextApi/PlanContext';
import axiosInstance from '../AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';
const Plans = () => {
  const { error, loading, plans, fetchPlans, deletePlan, updatePlan } = usePlans();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', duration: '', dailyReward: '' });

  useEffect(() => {
    if (!plans) {
      fetchPlans();
    }
  }, [plans]);

  const handleAddPlan = async () => {
    try {
      // Assuming you're sending data for a new plan to the backend
      const response = await axiosInstance.post('/admin/add-plan', newPlan);

      if (response.status === 201) {
        toast.success(response.data.message, { autoClose: 2000 });
        fetchPlans();
        setShowAddModal(false); // Close modal after adding plan
      }
    } catch (error) {
      console.error('Error adding plan:', error);
      toast.error('Failed to add plan.', { autoClose: 2000 });
    }
  };

  const handleEditPlan = async () => {
    try {
      // Send PUT request to update the selected plan
      const response = await axiosInstance.put(`/admin/edit-plan/${selectedPlan.id}`, selectedPlan);

      if (response.status === 200) {
        toast.success(response.data.message, { autoClose: 2000 });
        fetchPlans();
        setShowEditModal(false); // Close modal after updating plan
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('Failed to update plan.', { autoClose: 2000 });
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      // Send DELETE request to delete the plan
      const response=await axiosInstance.delete(`/admin/delete-plan/${planId}`);
  
      // Fetch the plans again after deletion=
      if(response.status===200){
       toast.success(response.data.message, { autoClose: 2000 }); 
        fetchPlans();
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      // Handle error (show a notification or message to user)
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const closeModalOnClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
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
      <div style={styles.header}>
        <h2 style={styles.tableTitle}>Users</h2>
        <button style={styles.addButton} onClick={() => setShowAddModal(true)}>Add Plan</button>
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div style={styles.modal} onClick={closeModalOnClickOutside}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Add New Plan</h3>
            <input
              type="text"
              placeholder="Name"
              style={styles.input}
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              style={styles.input}
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Duration"
              style={styles.input}
              value={newPlan.duration}
              onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Daily Reward"
              style={styles.input}
              value={newPlan.dailyReward}
              onChange={(e) => setNewPlan({ ...newPlan, dailyReward: e.target.value })}
            />
            <div style={styles.modalActions}>
              <button style={styles.submitButton} onClick={handleAddPlan}>Submit</button>
              <button style={styles.closeButton} onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditModal && selectedPlan && (
        <div style={styles.modal} onClick={closeModalOnClickOutside}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Edit Plan</h3>
            <input
              type="text"
              placeholder="Name"
              style={styles.input}
              value={selectedPlan.name}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              style={styles.input}
              value={selectedPlan.price}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Duration"
              style={styles.input}
              value={selectedPlan.duration}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Daily Reward"
              style={styles.input}
              value={selectedPlan.dailyReward}
              onChange={(e) => setSelectedPlan({ ...selectedPlan, dailyReward: e.target.value })}
            />
            <div style={styles.modalActions}>
              <button style={styles.submitButton} onClick={handleEditPlan}>Update</button>
              <button style={styles.closeButton} onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Table */}
      <div className="user-table" style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Duration</th>
              <th style={styles.tableHeader}>Daily Reward</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((plan) => (
              <tr key={plan.id} style={styles.tableRow}>
                <td style={styles.tableData}>{plan.id}</td>
                <td style={styles.tableData}>{plan.name}</td>
                <td style={styles.tableData}>{plan.price}</td>
                <td style={styles.tableData}>{plan.duration}</td>
                <td style={styles.tableData}>{plan.dailyReward}</td>
                <td style={styles.tableData}>
                  <button style={styles.editButton} onClick={() => { setSelectedPlan(plan); setShowEditModal(true); }}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDeletePlan(plan.id)}>Delete</button>
                </td>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
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
  addButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
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
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color:'black',
    textAlign: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '14px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: 'dodgerBlue',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default Plans;
