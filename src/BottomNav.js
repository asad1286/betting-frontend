import React, { useState } from "react";
import { 
  FaHome, 
  FaExchangeAlt, 
  FaUserPlus, 
  FaCog, 
  FaTelegram, 
  FaWhatsapp 
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

// NavButton Component with hover state
const NavButton = ({ onClick, active, children, label }) => {
  const [hover, setHover] = useState(false);
  const style = {
    background: "none",
    border: "none",
    color: active ? "#ffcc00" : hover ? "#ffaa00" : "white",
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "color 0.35s ease",
    padding: "2px 0",
  };
  const spanStyle = { fontSize: "12px", marginTop: "2px" };
  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <span style={spanStyle}>{label}</span>
    </button>
  );
};

// ContactButton Component with hover effect
const ContactButton = ({ href, title, children, backgroundColor, size = 40, iconSize = 20 }) => {
  const [hover, setHover] = useState(false);
  const baseStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: `${iconSize}px`,
    color: "white",
    background: backgroundColor,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease",
    textDecoration: "none",
    transform: hover ? "scale(1.1)" : "scale(1)",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      style={baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Inline styles for the bottom nav and contact buttons container
  const bottomNavStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#222",
    display: "flex",
    justifyContent: "space-around",
    padding: "8px 0",
    boxShadow: "0 -3px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  };

  const contactButtonsStyle = {
    position: "fixed",
    bottom: "120px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    zIndex: 999,
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div style={bottomNavStyle}>
        <NavButton
          onClick={() => navigate("/")}
          active={location.pathname === "/"}
          label="Home"
        >
          <FaHome />
        </NavButton>

        <NavButton
          onClick={() => navigate("/trade")}
          active={location.pathname === "/trade"}
          label="Trade"
        >
          <FaExchangeAlt />
        </NavButton>

        <NavButton
          onClick={() => navigate("/invite")}
          active={location.pathname === "/invite"}
          label="Invite"
        >
          <FaUserPlus />
        </NavButton>

        <NavButton
          onClick={() => navigate("/settings")}
          active={location.pathname === "/settings"}
          label="Settings"
        >
          <FaCog />
        </NavButton>
      </div>

      {/* Floating Contact Buttons */}
      <div style={contactButtonsStyle}>
        <ContactButton
          href="https://t.me/yourtelegramusername"
          title="Contact us on Telegram"
          backgroundColor="#0088cc"
        >
          <FaTelegram />
        </ContactButton>
        <ContactButton
          href="https://wa.me/yourwhatsappnumber"
          title="Contact us on WhatsApp"
          backgroundColor="#25d366"
        >
          <FaWhatsapp />
        </ContactButton>
      </div>
    </>
  );
};

export default BottomNav;
