import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HistoryContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;
  background-color: #121212;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #f7931a;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #e5a600;
    transform: scale(1.05);
  }
`;

const HistoryPageContainer = styled.div`
  max-width: 900px;
  width: 90%;
  background: #0d1117;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.7);
  text-align: center;
`;

const RecordTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  color: #ffcc00;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #f7931a;
  border-radius: 6px;
  background: #1e1e1e;
  color: #ffffff;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #f7931a;
  border-radius: 6px;
  background: #1e1e1e;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
`;

const HistoryList = styled.div`
  margin-top: 20px;
`;

const HistoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #1e1e1e;
  margin: 10px 0;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const HistoryItem = styled.div`
  flex: 1;
  min-width: 150px;
  margin: 5px 10px;
`;

const HistoryLabel = styled.p`
  font-size: 14px;
  color: #b0b0b0;
  margin-bottom: 5px;
`;

const HistoryValue = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const HistoryState = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.win ? "#27ae60" : "#e74c3c")};
`;

const HistoryResult = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.result === "Big" || props.result === "RED" ? "#e74c3c" : "#f7931a")};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  background: #1e1e1e;
  border: 2px solid #f7931a;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s;

  &.active,
  &:hover {
    background: #f7931a;
    color: #000;
  }
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #b0b0b0;
  margin-top: 20px;
`;

function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("All");
  const baseIssue = 2345;

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("betHistory")) || [];
    const formattedHistory = storedHistory.map((entry) => ({
      issue: entry.issue || baseIssue,
      state: entry.state || "Lose",
      result: entry.result ? entry.result.toString() : "Small",
      timestamp: entry.timestamp || new Date().toLocaleString(),
    }));
    setHistory(formattedHistory);
    setFilteredHistory(formattedHistory);
  }, []);

  useEffect(() => {
    let filtered = history;

    if (searchQuery) {
      filtered = filtered.filter((entry) =>
        entry.issue.toString().includes(searchQuery) ||
        entry.result.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterState !== "All") {
      filtered = filtered.filter((entry) => entry.state === filterState);
    }

    setFilteredHistory(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterState, history]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <HistoryContainer>
      <BackButton onClick={() => navigate("/")}>Back</BackButton>

      <HistoryPageContainer>
        <RecordTitle>Record</RecordTitle>

        <Controls>
          <Input
            type="text"
            placeholder="Search by issue or result..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={filterState} onChange={(e) => setFilterState(e.target.value)}>
            <option value="All">All</option>
            <option value="Win">Win</option>
            <option value="Lose">Lose</option>
          </Select>
        </Controls>

        <HistoryList>
          {currentItems.length === 0 ? (
            <ErrorMessage>No betting history found.</ErrorMessage>
          ) : (
            currentItems.map((entry, index) => (
              <HistoryRow key={index}>
                <HistoryItem>
                  <HistoryLabel>Issue</HistoryLabel>
                  <HistoryValue>{entry.issue}</HistoryValue>
                </HistoryItem>
                <HistoryItem>
                  <HistoryLabel>State</HistoryLabel>
                  <HistoryState win={entry.state === "Win"}>{entry.state}</HistoryState>
                </HistoryItem>
                <HistoryItem>
                  <HistoryLabel>Time</HistoryLabel>
                  <HistoryValue>{entry.timestamp}</HistoryValue>
                </HistoryItem>
                <HistoryItem>
                  <HistoryLabel>Result</HistoryLabel>
                  <HistoryResult result={entry.result}>{entry.result}</HistoryResult>
                </HistoryItem>
              </HistoryRow>
            ))
          )}
        </HistoryList>

        <Pagination>
          {Array.from({ length: Math.ceil(filteredHistory.length / itemsPerPage) }, (_, i) => (
            <PageButton key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      </HistoryPageContainer>
    </HistoryContainer>
  );
}

export default HistoryPage;
