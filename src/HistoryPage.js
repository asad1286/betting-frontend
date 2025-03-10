import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";

function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("All"); // Filter by state (Win/Lose/All)
  const baseIssue = 2345; // Base issue number if not provided

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("betHistory")) || [];
    // Add default values for missing fields
    const formattedHistory = storedHistory.map((entry) => ({
      issue: entry.issue || baseIssue, // Default to baseIssue if issue is missing
      state: entry.state || "Lose", // Default to "Lose" if state is missing
      result: entry.result ? entry.result.toString() : "Small", // Ensure result is a string
      timestamp: entry.timestamp || new Date().toLocaleString(), // Default to current time if timestamp is missing
    }));
    setHistory(formattedHistory);
    setFilteredHistory(formattedHistory);
  }, []);

  // Filter history
  useEffect(() => {
    let filtered = history;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((entry) => {
        const issue = entry.issue || ""; // Default to empty string if issue is undefined
        const result = entry.result ? entry.result.toString() : ""; // Ensure result is a string
        return (
          issue.toString().includes(searchQuery) ||
          result.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Filter by state
    if (filterState !== "All") {
      filtered = filtered.filter((entry) => entry.state === filterState);
    }

    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchQuery, filterState, history]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="history-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      <div className="history-page">
        <h1 className="record-title">Record</h1>

        {/* Controls (Search, Filter) */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search by issue or result..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Win">Win</option>
            <option value="Lose">Lose</option>
          </select>
        </div>

        {/* History List */}
        <div className="history-list">
          {currentItems.length === 0 ? (
            <p className="error-message">No betting history found.</p>
          ) : (
            currentItems.map((entry, index) => (
              <div key={index} className="history-row">
                <div className="history-item">
                  <p className="history-label">Issue</p>
                  <p className="history-value">
                    {entry.issue}
                  </p>
                </div>
                <div className="history-item">
                  <p className="history-label">State</p>
                  <p
                    className={`history-state ${
                      entry.state === "Win" ? "win" : "lose"
                    }`}
                  >
                    {entry.state}
                  </p>
                </div>
                <div className="history-item">
                  <p className="history-label">Time</p>
                  <p className="history-value">{entry.timestamp}</p>
                </div>
                <div className="history-item">
                  <p className="history-label">Result</p>
                  <p
                    className={`history-result ${
                      entry.result === "Big" || entry.result === "RED"
                        ? "result-red"
                        : "result-small"
                    }`}
                  >
                    {entry.result}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredHistory.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`page-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;