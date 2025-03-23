import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { FaCoins, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Table, Button, message } from "antd";
import "./BtcPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

function BtcPage() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [btcHistory, setBtcHistory] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [bet, setBet] = useState(null);
  const [startPrice, setStartPrice] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [balance, setBalance] = useState({ USDT: 1000 });
  const [betHistory, setBetHistory] = useState([]);
  const [betResult, setBetResult] = useState(null);
  const [roundOrder, setRoundOrder] = useState(1);
  const [isBettingOpen, setIsBettingOpen] = useState(true);
  const [hasPlacedBet, setHasPlacedBet] = useState(false); // Track if the user has placed a bet
  const [inlineError, setInlineError] = useState(""); // Inline error message for second bet attempt

  // Load bet history from localStorage on mount.
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("betHistory")) || [];
    setBetHistory(storedHistory);
  }, []);

  // WebSocket connection for live BTC price.
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com/ws/btcusdt@trade");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const livePrice = parseFloat(data.p);
      setBtcPrice(livePrice);
      setBtcHistory((prev) =>
        prev.length > 50 ? [...prev.slice(1), livePrice] : [...prev, livePrice]
      );
    };
    return () => ws.close();
  }, []);

  // Continuous countdown timer that runs independently.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          processRound();
          return 60; // Reset timer to 60 seconds
        }
        return prev - 1;
      });

      // Disable betting in the last 15 seconds
      if (timeLeft === 15) {
        setIsBettingOpen(false);
        message.warning("Betting is closed for this round!");
      }
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Process the current round when timer hits 0.
  const processRound = () => {
    // If a bet was placed, compute the result. Otherwise, record a "No Bet" round.
    if (bet !== null) {
      const endPrice = btcPrice; // live BTC price at round end.
      const result = endPrice > startPrice ? "up" : "down";
      const isWin = result === bet;
      const payout = isWin ? Number(betAmount) * 1.95 : 0;
      if (isWin) {
        setBalance((prev) => ({ ...prev, USDT: prev.USDT + payout }));
      }
      setBetResult(isWin ? `✅ You Won! (+${payout.toFixed(2)} USDT)` : "❌ You Lost!");
      const newRecord = {
        order: roundOrder,
        bet: bet.toUpperCase(),
        amount: Number(betAmount),
        currency: "USDT",
        startPrice,
        endPrice,
        result: isWin ? `✅ Won (${payout.toFixed(2)} USDT)` : "❌ Lost",
        timestamp: new Date().toLocaleString(),
        state: isWin ? "Win" : "Lose",
        issue: `#${Math.floor(Math.random() * 100000)}`,
      };
      const newHistory = [...betHistory, newRecord];
      setBetHistory(newHistory);
      localStorage.setItem("betHistory", JSON.stringify(newHistory));

      // Show result for 2 seconds, then hide it
      setTimeout(() => {
        setBetResult(null);
      }, 2000);
    } else {
      // If no bet was placed, clear any bet result.
      setBetResult(null);
    }
    // Prepare for the next round:
    setBet(null);
    setBetAmount("");
    setStartPrice(null);
    setRoundOrder((prev) => prev + 1);
    setIsBettingOpen(true); // Re-enable betting for the next round
    setHasPlacedBet(false); // Reset bet placement status for the next round
    setInlineError(""); // Clear inline error message
  };

  // When a bet is placed, deduct balance and record bet.
  const placeBetAction = (direction) => {
    if (!isBettingOpen) {
      message.error("Betting is closed for this round!");
      return;
    }
    if (hasPlacedBet) {
      setInlineError("You have already placed a bet for this round!"); // Show inline error
      return;
    }
    if (
      !betAmount ||
      isNaN(betAmount) ||
      betAmount <= 0 ||
      betAmount > balance.USDT
    ) {
      alert("Invalid bet amount.");
      return;
    }
    setBalance((prev) => ({ ...prev, USDT: prev.USDT - Number(betAmount) }));
    setBet(direction);
    setStartPrice(btcPrice);
    setBetResult(null);
    setHasPlacedBet(true); // Mark that the user has placed a bet
    setInlineError(""); // Clear inline error message
  };

  const historyColumns = [
    { title: "Order No.", dataIndex: "order", key: "order" },
    { title: "Bet", dataIndex: "bet", key: "bet" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt) => `${amt} USDT`,
    },
    {
      title: "Start Price",
      dataIndex: "startPrice",
      key: "startPrice",
      render: (p) => `$${p != null ? p.toFixed(2) : "0.00"}`,
    },
    {
      title: "End Price",
      dataIndex: "endPrice",
      key: "endPrice",
      render: (p) => `$${p != null ? p.toFixed(2) : "0.00"}`,
    },
    { title: "Result", dataIndex: "result", key: "result" },
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
    { title: "Issue", dataIndex: "issue", key: "issue" },
  ];

  const clearBetHistory = () => {
    setBetHistory([]);
    localStorage.removeItem("betHistory");
    message.success("Bet history cleared");
  };

  return (
    <div className="btc-container">
      <button className="history-button" onClick={() => navigate("/history")}>
        <FaHistory /> Betting History
      </button>

      <h1 className="btc-title">BTC Betting</h1>

      <div className="live-btc-price">
        <span>Live BTC Price:</span>
        <span
          className={`price ${
            btcPrice && startPrice != null && btcPrice > startPrice
              ? "green"
              : "red"
          }`}
        >
          ${btcPrice ? btcPrice.toFixed(2) : "Loading..."}
        </span>
      </div>

      <div className="chart-container">
        <Line
          ref={chartRef}
          data={{
            labels: btcHistory.map((_, i) => i),
            datasets: [
              {
                label: "BTC Price",
                data: btcHistory,
                borderColor: "#ff6f61",
                backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return null;
                  const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom
                  );
                  gradient.addColorStop(0, "rgba(255, 111, 97, 0.5)");
                  gradient.addColorStop(1, "rgba(255, 111, 97, 0)");
                  return gradient;
                },
                fill: true,
                pointRadius: 0,
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              x: { display: false },
              y: { ticks: { callback: (value) => `$${value}` } },
            },
          }}
        />
      </div>

      <div className="betting-container">
        <div className="user-balance">
          <FaCoins /> Balance: {balance.USDT.toFixed(2)} USDT
        </div>

        <div className="bet-input-container">
          <input
            type="number"
            className="bet-input"
            placeholder="Bet Amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </div>

        <div className="bet-buttons">
          <button
            className="bet-button up"
            onClick={() => placeBetAction("up")}
            disabled={!isBettingOpen || hasPlacedBet} // Disable if betting is closed or user has already placed a bet
          >
            Bet UP 📈
          </button>
          <button
            className="bet-button down"
            onClick={() => placeBetAction("down")}
            disabled={!isBettingOpen || hasPlacedBet} // Disable if betting is closed or user has already placed a bet
          >
            Bet DOWN 📉
          </button>
        </div>

        {inlineError && <div className="inline-error">{inlineError}</div>}

        <div className="bet-status">
          Time Left: {timeLeft}s {!isBettingOpen && "(Betting Closed)"}
        </div>
        {betResult && <div className="bet-result">{betResult}</div>}
      </div>

      <div className="bet-history-container">
        <h2>Bet History</h2>
        <Button onClick={clearBetHistory} style={{ marginBottom: 10 }}>
          Clear History
        </Button>
        <Table
          dataSource={betHistory}
          columns={historyColumns}
          pagination={{ pageSize: 5 }}
          rowKey="order"
        />
      </div>
    </div>
  );
}

export default BtcPage;