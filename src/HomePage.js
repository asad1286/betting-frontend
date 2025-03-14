import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaBitcoin,
  FaHistory,
  FaGift,
  FaLifeRing,
  FaUserFriends,
} from "react-icons/fa";
import { MdNotifications } from "react-icons/md";

function HomePage() {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [usdtBalance, setUsdtBalance] = useState(1000.0);
  const [announcements, setAnnouncements] = useState([
    "Welcome to QuickCash! Enjoy our exclusive rewards.",
    "Check out our Free Plans to earn daily bonuses.",
    "Refer your friends and get extra benefits!",
  ]);

  // Responsive check
  const isMobile = window.innerWidth < 768;

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

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  // Inline styles
  const styles = {
    homeContainer: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "10px",
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      lineHeight: 1.6,
    },
    topHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      marginBottom: "20px",
    },
    brandContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    brandLogo: {
      fontSize: isMobile ? "20px" : "28px",
      fontWeight: "bold",
      color: "#f7931a",
    },
    brandText: {
      fontSize: isMobile ? "18px" : "24px",
      fontWeight: "bold",
      color: "#ffffff",
    },
    bellContainer: {
      position: "relative",
      cursor: "pointer",
    },
    bellIcon: {
      fontSize: "24px",
      color: "#ffffff",
    },
    bellDot: {
      position: "absolute",
      top: "0px",
      right: "-5px",
      width: "10px",
      height: "10px",
      background: "red",
      borderRadius: "50%",
      border: "2px solid transparent",
    },
    bannerContainer: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "10px",
      marginBottom: "20px",
    },
    card: {
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "12px",
      padding: "15px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "transform 0.35s ease, boxShadow 0.35s ease",
    },
    balanceCard: {
      background: "#2c2c2c",
      borderRadius: "8px",
      padding: isMobile ? "4px" : "6px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "transform 0.35s ease, boxShadow 0.35s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    balanceRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    balanceTitle: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#ff6f61",
      marginBottom: "2px",
    },
    balanceItem: {
      marginBottom: "3px",
    },
    balanceIcon: {
      fontSize: "18px",
      color: "#ff6f61",
      marginBottom: "2px",
    },
    balanceLabel: {
      fontSize: "10px",
      color: "#cccccc",
      marginBottom: "1px",
    },
    balanceValueContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2px",
    },
    balanceValue: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#ff6f61",
    },
    eyeButton: {
      background: "none",
      border: "none",
      color: "#ff6f61",
      cursor: "pointer",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
    },
    balanceActions: {
      display: "flex",
      gap: "4px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "4px",
    },
    actionButton: {
      background: "#ff6f61",
      color: "#ffffff",
      border: "none",
      padding: "6px 10px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 600,
      transition: "background 0.35s ease, transform 0.35s ease",
      minWidth: "80px",
      fontSize: "12px",
    },
    withdrawButton: {
      background: "#f44336",
    },
    depositButton: {
      background: "#4caf50",
    },
    freePlansCard: {
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "12px",
      padding: isMobile ? "10px" : "15px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "transform 0.35s ease, boxShadow 0.35s ease",
    },
    freePlansTitle: {
      fontSize: "20px",
      fontWeight: 600,
      marginBottom: "8px",
      color: "#ff6f61",
    },
    freePlansText: {
      fontSize: "16px",
      marginBottom: "12px",
      color: "#cccccc",
    },
    explorePlansButton: {
      background: "linear-gradient(135deg, #ff6f61, #ffc371)",
      border: "none",
      color: "#ffffff",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      transition: "transform 0.3s ease, background 0.3s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      marginTop: "10px",
      display: "inline-block",
    },
    quickOptions: {
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "12px",
      padding: "15px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      marginBottom: "20px",
      transition: "transform 0.35s ease, boxShadow 0.35s ease",
    },
    quickOptionsTitle: {
      fontSize: "20px",
      fontWeight: 600,
      marginBottom: "10px",
      color: "#ff6f61",
    },
    quickButtons: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "8px",
    },
    quickOption: {
      background: "#ff6f61",
      color: "#ffffff",
      borderRadius: "8px",
      padding: "10px",
      width: "80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      transition: "background 0.35s ease, transform 0.35s ease",
    },
    quickIcon: {
      fontSize: "24px",
      marginBottom: "4px",
    },
    quickLabel: {
      fontSize: "12px",
      textAlign: "center",
    },
    marketOverview: {
      background: "#2c2c2c",
      border: "1px solid #3b3b3b",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      marginBottom: "20px",
    },
    marketOverviewTitle: {
      textAlign: "center",
      marginBottom: "12px",
      fontSize: "28px",
      color: "#ff6f61",
      letterSpacing: "0.5px",
    },
    marketControls: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      background: "#3b3b3b",
      padding: "8px",
      border: "1px solid #3b3b3b",
      borderRadius: "8px",
      flex: 1,
      minWidth: "220px",
      marginRight: "8px",
    },
    searchBarInput: {
      background: "transparent",
      border: "none",
      color: "#ffffff",
      marginLeft: "8px",
      width: "100%",
      fontSize: "16px",
      outline: "none",
    },
    marketList: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "15px",
    },
    marketItem: {
      background: "#3b3b3b",
      border: "1px solid #3b3b3b",
      borderRadius: "12px",
      padding: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "transform 0.35s ease",
    },
    coinInfo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    coinIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    coinName: {
      fontWeight: 600,
      color: "#ffffff",
    },
    coinPrice: {
      fontSize: "16px",
      color: "#ffffff",
    },
    coinChange: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    viewAllButton: {
      background: "#ff6f61",
      border: "none",
      color: "#ffffff",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
      transition: "background 0.35s ease, transform 0.35s ease",
      display: "block",
      margin: "15px auto 0",
    },
    footer: {
      background: "#2c2c2c",
      borderTop: "1px solid #3b3b3b",
      padding: "15px",
      textAlign: "center",
      marginTop: "20px",
      borderRadius: "8px",
    },
    footerLinks: {
      marginTop: "8px",
    },
    footerLink: {
      color: "#ff6f61",
      margin: "0 8px",
      textDecoration: "none",
      transition: "color 0.35s ease",
    },
    loadingSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "180px",
      fontSize: "18px",
      color: "#ff6f61",
    },
    // Additional Promotion / Announcements Section
    announcementsContainer: {
      background: "#333",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "20px",
      overflow: "hidden",
      position: "relative",
    },
    announcementsText: {
      color: "#ffcc00",
      fontSize: "16px",
      whiteSpace: "nowrap",
      animation: "scroll 15s linear infinite",
    },
    "@keyframes scroll": {
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(-100%)" },
    },
  };

  return (
    <div style={styles.homeContainer}>
      {/* Top Header */}
      <div style={styles.topHeader}>
        <div style={styles.brandContainer}>
          <span style={styles.brandLogo}>QC</span>
          <span style={styles.brandText}>QuickCash</span>
        </div>
        <div style={styles.bellContainer}>
          <MdNotifications style={styles.bellIcon} />
          <div style={styles.bellDot} />
        </div>
      </div>

      {/* Announcements Section */}
      <div style={styles.announcementsContainer}>
        <p style={styles.announcementsText}>
          {announcements.join(" • ")}
        </p>
      </div>

      {/* Banner Section */}
      <div style={styles.bannerContainer}>
        {/* Balance Card */}
        <div style={styles.card}>
          <div style={styles.balanceCard}>
            <div style={styles.balanceRow}>
              <p style={styles.balanceTitle}>Your Balance</p>
              <div style={styles.balanceItem}>
                <span style={styles.balanceIcon}>💰</span>
                <p style={styles.balanceLabel}>USDT</p>
                <div style={styles.balanceValueContainer}>
                  <p style={styles.balanceValue}>
                    {isBalanceVisible ? usdtBalance.toFixed(2) : "****"}
                  </p>
                  <button
                    style={styles.eyeButton}
                    onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  >
                    {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div style={styles.balanceActions}>
                <button
                  style={{ ...styles.actionButton, ...styles.withdrawButton }}
                  onClick={() => navigate("/withdraw")}
                >
                  Withdraw
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.depositButton }}
                  onClick={() => navigate("/deposit")}
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Free Plans Card */}
        <div style={styles.card}>
          <div style={styles.freePlansCard}>
            <p style={styles.freePlansTitle}>Free Plans</p>
            <p style={styles.freePlansText}>
              Earn rewards daily with Free Plans!
            </p>
            <button
              style={styles.explorePlansButton}
              onClick={() => navigate("/free-plans")}
            >
              Explore Plans
            </button>
          </div>
        </div>
      </div>

      {/* Quick Options Section */}
      <div style={styles.quickOptions}>
        <p style={styles.quickOptionsTitle}>Quick Options</p>
        <div style={styles.quickButtons}>
          <div
            style={styles.quickOption}
            onClick={() => navigate("/btc-page")}
          >
            <FaBitcoin style={styles.quickIcon} />
            <p style={styles.quickLabel}>BTC Game</p>
          </div>
          <div
            style={styles.quickOption}
            onClick={() => navigate("/history")}
          >
            <FaHistory style={styles.quickIcon} />
            <p style={styles.quickLabel}>History</p>
          </div>
          <div
            style={styles.quickOption}
            onClick={() => navigate("/rewards")}
          >
            <FaGift style={styles.quickIcon} />
            <p style={styles.quickLabel}>Rewards</p>
          </div>
          <div
            style={styles.quickOption}
            onClick={() => navigate("/help-desk")}
          >
            <FaLifeRing style={styles.quickIcon} />
            <p style={styles.quickLabel}>Help Desk</p>
          </div>
          <div
            style={styles.quickOption}
            onClick={() => navigate("/referral")}
          >
            <FaUserFriends style={styles.quickIcon} />
            <p style={styles.quickLabel}>Referral</p>
          </div>
        </div>
      </div>

      {/* Market Overview Section */}
      <div style={styles.marketOverview}>
        <h2 style={styles.marketOverviewTitle}>Market Overview</h2>
        <div style={styles.marketControls}>
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchBarInput}
            />
          </div>
        </div>
        {loading ? (
          <div style={styles.loadingSpinner}>Loading...</div>
        ) : (
          <div style={styles.marketList}>
            {filteredMarketData.length > 0 ? (
              filteredMarketData.map((coin) => {
                const coinChangeStyle = {
                  color:
                    coin.price_change_percentage_24h >= 0
                      ? "#52c41a"
                      : "#f5222d",
                  fontWeight: "bold",
                  fontSize: "16px",
                };
                return (
                  <div key={coin.id} style={styles.marketItem}>
                    <div style={styles.coinInfo}>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        style={styles.coinIcon}
                      />
                      <span style={styles.coinName}>{coin.name}</span>
                    </div>
                    <div>
                      <p style={styles.coinPrice}>
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <p style={coinChangeStyle}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No coins found.</p>
            )}
          </div>
        )}
        <button
          style={styles.viewAllButton}
          onClick={() => navigate("/market")}
        >
          View All Coins
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2023 QuickCash. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a href="/terms" style={styles.footerLink}>
            Terms
          </a>
          <a href="/privacy" style={styles.footerLink}>
            Privacy
          </a>
          <a href="/contact" style={styles.footerLink}>
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
