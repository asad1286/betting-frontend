import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaArrowLeft, FaCoins, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BtcPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
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
  const [countdown, setCountdown] = useState(0);
  const [balance, setBalance] = useState({ USDT: 1000 });
  const [betHistory, setBetHistory] = useState([]);
  const [betResult, setBetResult] = useState(null);

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

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("betHistory")) || [];
    setBetHistory(storedHistory);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const placeBet = (direction) => {
    if (!betAmount || isNaN(betAmount) || betAmount <= 0 || betAmount > balance.USDT) {
      alert("Invalid bet amount.");
      return;
    }

    setBalance((prev) => ({ ...prev, USDT: prev.USDT - betAmount }));
    setBet(direction);
    setStartPrice(btcPrice);
    setBetResult(null);
    setCountdown(60);

    setTimeout(() => {
      const result = btcPrice > startPrice ? "up" : "down";
      const isWin = result === direction;
      const payout = isWin ? betAmount * 1.95 : 0;

      if (isWin) {
        setBalance((prev) => ({ ...prev, USDT: prev.USDT + payout }));
      }

      const newHistory = [
        ...betHistory,
        {
          bet: direction.toUpperCase(),
          amount: betAmount,
          currency: "USDT",
          startPrice,
          endPrice: btcPrice,
          result: isWin ? `✅ Won (${payout.toFixed(2)} USDT)` : "❌ Lost",
          timestamp: new Date().toLocaleString(),
          state: isWin ? "Win" : "Lose",
          issue: `#${Math.floor(Math.random() * 100000)}`,
        },
      ];

      setBetHistory(newHistory);
      localStorage.setItem("betHistory", JSON.stringify(newHistory));
      setBetResult(isWin ? `✅ You Won! (+${payout.toFixed(2)} USDT)` : "❌ You Lost!");
    }, 60000);
  };

  return (
    <div className="btc-container">
      <button className="history-button" onClick={() => navigate("/history")}>
        <FaHistory /> Betting History
      </button>

      <h1 className="btc-title">BTC Betting</h1>

      <div className="live-btc-price">
        <span>Live BTC Price:</span>
        <span className={`price ${btcPrice > startPrice ? "green" : "red"}`}>
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
                  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
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
          <button className="bet-button up" onClick={() => placeBet("up")}>
            Bet UP 📈
          </button>
          <button className="bet-button down" onClick={() => placeBet("down")}>
            Bet DOWN 📉
          </button>
        </div>

        {bet && (
          <div className="bet-status">
            Your Bet: {bet.toUpperCase()} | Time Left: {countdown}s
          </div>
        )}
        {betResult && <div className="bet-result">{betResult}</div>}
      </div>
    </div>
  );
}

export default BtcPage;
