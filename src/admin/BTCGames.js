import React, { useState, useEffect } from "react";
import { useAdmin } from "../contextApi/AdminContext";
import axiosInstance from "../AxiosInstance";
import { toast, ToastContainer } from "react-toastify";

const BTCGames = () => {
    const { btcGames, fetchAllBtcGames } = useAdmin();
    const [selectedStatus, setSelectedStatus] = useState({}); 

    useEffect(() => {
        if (btcGames?.length === 0) fetchAllBtcGames();
    }, [btcGames, fetchAllBtcGames]);

    const updateGameStatus = async (id, newResult) => {
        try {
            const response = await axiosInstance.put(`/admin/update-game-result/${id}`, { result: newResult });
            if (response.status === 200) {
                toast.success(response.data.message);
                await fetchAllBtcGames(); // Refresh the table after updating the status
            }
        } catch (error) {
            console.error("Error updating game status:", error);
            toast.error("Failed to update game status.");
        }
    };

    const renderActionColumn = (status, gameId) => {
        const normalizedStatus = status?.toLowerCase();

        if (normalizedStatus === "pending") {
            return (
                <select
                    value={selectedStatus[gameId] || "pending"}
                    onChange={(e) => {
                        const newStatus = e.target.value;
                        setSelectedStatus({ ...selectedStatus, [gameId]: newStatus });
                        updateGameStatus(gameId, newStatus);
                    }}
                    style={dropdownStyle}
                >
                    <option value="pending">Pending</option>
                    <option value="win">Win</option>
                    <option value="lost">Lost</option>
                </select>
            );
        }

        // Only show the text if the dropdown is NOT visible
        return (
            <span style={{ 
                fontWeight: "bold", 
                color: normalizedStatus === "win" ? "green" : "red" 
            }}>
                {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}
            </span>
        );
    };

    return (
        <div className="btc-games-container">
            <h1>BTC Games</h1>

            {btcGames?.length === 0 ? (
                <p>No BTC games found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Bet Amount</th>
                            <th>Bet Type</th>
                            <th>Start Price</th>
                            <th>End Price</th>
                            <th>Action</th> {/* Updated column name */}
                        </tr>
                    </thead>
                    <tbody>
                        {btcGames?.map((game) => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.userId}</td>
                                <td>{game.betAmount}</td>
                                <td>{game.betType}</td>
                                <td>${game.startPrice}</td>
                                <td>${game.endPrice}</td>
                                <td>{renderActionColumn(game.result, game.id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ToastContainer />

            <style>{`
                .btc-games-container {
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

// Dropdown styles
const dropdownStyle = {
    padding: "6px",
    borderRadius: "4px",
    fontSize: "12px",
    width: "100px",
    border: "1px solid #ccc",
};

export default BTCGames;
