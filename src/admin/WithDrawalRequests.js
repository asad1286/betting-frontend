import React, { useState } from "react";
import { useAdmin } from "../contextApi/AdminContext";
import Modal from "react-modal"; // Import modal for the rejection reason
import axiosInstance from "../AxiosInstance";
import { toast, ToastContainer } from 'react-toastify';

const WithDrawalRequests = () => {
    const { withdrawRequests, fetchWithdrawRequests } = useAdmin();
    console.log("withdrawRequests", withdrawRequests);
    const [selectedStatus, setSelectedStatus] = useState({}); // State to handle status change
    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
    const [rejectionReason, setRejectionReason] = useState(""); // State to handle rejection reason
    const [currentRequestId, setCurrentRequestId] = useState(null); // To keep track of the current request for rejection

    const handleStatusChange = async (id, newStatus) => {
        if (newStatus.toLowerCase() === "rejected") {
            setCurrentRequestId(id);
            setIsModalOpen(true); // Open modal for rejection reason
        } else {
            // Call API to update status directly
            await updateRequestStatus(id, newStatus);
            // After status update, fetch the withdrawal requests again
            await fetchWithdrawRequests();
        }

        // Update the status in state
        setSelectedStatus((prevState) => ({
            ...prevState,
            [id]: newStatus,
        }));
    };

    const updateRequestStatus = async (id, status) => {
        try {
            // Prepare the payload
            const payload = { status };

            // If rejectionReason is provided, include it in the payload
            if (rejectionReason) {
                payload.reason = rejectionReason;
            }

            // Send the request to the backend using Axios
            const response = await axiosInstance.put(`/admin/request-update/${id}`, payload);
            if (response.status === 200) {
                toast.success("Request status updated successfully!");
            }
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    };

    const handleRejectionSubmit = async () => {
        // Submit the rejection reason along with the request ID and status
        await updateRequestStatus(currentRequestId, "rejected");
        console.log("Rejection Reason:", rejectionReason);
        setIsModalOpen(false);
        // After rejection, fetch the withdrawal requests again
        await fetchWithdrawRequests();
    };

    const renderActionDropdown = (status, requestId) => {
        // If the status is "sent", don't render the dropdown
        if (status.toLowerCase() === "sent") {
            return <span>Sent</span>; // Display "Sent" status instead of the dropdown
        }

        // Normalize the status by converting to lowercase to make the comparison case-insensitive
        const normalizedStatus = status?.toLowerCase();

        return (
            <select
                value={selectedStatus[requestId] || normalizedStatus}
                onChange={(e) => handleStatusChange(requestId, e.target.value)}
                style={dropdownStyle}
            >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="sent">Sent</option>
            </select>
        );
    };

    return (
        <div className="withdrawals-container">
            <h1>Withdrawal Requests</h1>

            {withdrawRequests?.length === 0 ? (
                <p>No withdrawal requests found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>TRC20 Address</th>
                            <th>Amount Request</th>
                            <th>Amount Sent</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawRequests?.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.userId}</td>
                                <td>{request.trc20WithdrawAddress}</td>
                                <td>${request.withdrawAmount}</td>
                                <td>${request.amountSent}</td>
                                <td>{request.createdAt}</td>
                                <td>
                                    {renderActionDropdown(request.status, request.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Rejection Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle}>
                <h3>Provide Rejection Reason</h3>
                <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection"
                    style={textareaStyle}
                />
                <div>
                    <button onClick={handleRejectionSubmit} style={buttonStyle}>Submit</button>
                    <button onClick={() => setIsModalOpen(false)} style={buttonStyle}>Cancel</button>
                </div>
            </Modal>
            <ToastContainer />

            {/* Embedded CSS */}
            <style>{`
                .withdrawals-container {
                    padding: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #2980b9;
                    text-align: center;
                    font-size: 18px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    background: white;
                    font-size: 14px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    color: #2c3e50;
                }
                th {
                    background-color: #2980b9;
                    color: white;
                    font-weight: bold;
                }
                td {
                    background: #f9f9f9;
                }
                tr:nth-child(even) td {
                    background: #ecf0f1;
                }
                select {
                    padding: 6px;
                    border-radius: 4px;
                    font-size: 12px;
                    width: 100px;
                    background: #f5f5f5;
                    border: 1px solid #ccc;
                }
            `}</style>
        </div>
    );
};

// Custom styles
const dropdownStyle = {
    padding: "6px",
    borderRadius: "4px",
    fontSize: "12px",
    width: "100px",
    border: "1px solid #ccc",
};

const modalStyle = {
    content: {
        padding: "20px",
        borderRadius: "8px",
        color: "black",
        width: "400px",
        maxHeight: "250px", // Limit the height
        margin: "auto",
        background: "#fff",
        border: "1px solid #ddd",
        overflow: "hidden", // Prevent vertical scrolling
    },
};

const textareaStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "20px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    resize: "none", // Prevent textarea resizing
};

const buttonStyle = {
    padding: "10px",
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
};

export default WithDrawalRequests;
