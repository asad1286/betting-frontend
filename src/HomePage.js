import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaBitcoin, FaHistory, FaGift, FaLifeRing, FaUserFriends } from "react-icons/fa"; // Import necessary icons
import "./Home.css";

function HomePage() {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Dummy balance data
  const [usdtBalance, setUsdtBalance] = useState(0.07);

  // Fetch market data for top cryptocurrencies
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 4,
              page: 1,
              sparkline: false,
            },
          }
        );
        setMarketData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter market data based on search query
  const filteredMarketData = marketData.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle refresh button click
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 4,
            page: 1,
            sparkline: false,
          },
        }
      );
      setMarketData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing market data:", error);
      setLoading(false);
    }
  };

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1>Crypto Games</h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Balances & Free Plans */}
        <div className="banner-container">
          <div className="balance-card card">
            <div className="balance-row">
              <div className="balance-column">
                <p className="balance-title">Your Balance</p>
                <div className="balance-item">
                  <span className="balance-icon">💰</span>
                  <p className="balance-label">USDT</p>
                  <div className="balance-value-container">
                    <p className="balance-value">
                      {isBalanceVisible ? usdtBalance.toFixed(2) : "****"}
                    </p>
                    <button
                      className="eye-button"
                      onClick={toggleBalanceVisibility}
                    >
                      {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="balance-actions">
                  <button
                    className="action-button withdraw-button"
                    onClick={() => navigate("/withdraw")}
                  >
                    Withdraw
                  </button>
                  <button
                    className="action-button deposit-button"
                    onClick={() => navigate("/deposit")}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="free-plans-card card">
            <p className="card-title">Free Plans</p>
            <p>Earn rewards daily with Free Plans!</p>
            <button
              className="action-button"
              onClick={() => navigate("/free-plans")}
            >
              Explore Plans
            </button>
          </div>
        </div>

        {/* Quick Options Section */}
        <div className="quick-options card">
          <p className="card-title">Quick Options</p>
          <div className="quick-buttons">
            <div className="quick-option" onClick={() => navigate("/btc-game")}>
              <FaBitcoin className="quick-icon" />
              <p className="quick-label">BTC Game</p>
            </div>
            <div className="quick-option" onClick={() => navigate("/history")}>
              <FaHistory className="quick-icon" />
              <p className="quick-label">History</p>
            </div>
            <div className="quick-option" onClick={() => navigate("/rewards")}>
              <FaGift className="quick-icon" />
              <p className="quick-label">Rewards</p>
            </div>
            <div className="quick-option" onClick={() => navigate("/help-desk")}>
              <FaLifeRing className="quick-icon" />
              <p className="quick-label">Help Desk</p>
            </div>
            <div className="quick-option" onClick={() => navigate("/referral")}>
              <FaUserFriends className="quick-icon" />
              <p className="quick-label">Referral</p>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="market-overview">
          <h2>Market Overview</h2>
          <div className="market-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="refresh-button" onClick={handleRefresh}>
                🔄 Refresh
              </button>
            </div>
          </div>
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="market-list">
              {filteredMarketData.length > 0 ? (
                filteredMarketData.map((coin) => (
                  <div key={coin.id} className="market-item">
                    <div className="coin-info">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="coin-icon"
                      />
                      <span className="coin-name">{coin.name}</span>
                    </div>
                    <div className="coin-details">
                      <p className="coin-price">
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <p
                        className={`coin-change ${
                          coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No coins found.</p>
              )}
            </div>
          )}
          <button className="view-all-button" onClick={() => navigate("/market")}>
            View All Coins
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2023 Crypto Games. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
