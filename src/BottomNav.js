import React from "react";
import { FaHome, FaExchangeAlt, FaUserPlus, FaCog, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css"; // Import CSS for styling

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <button
          onClick={() => navigate("/")}
          className={`nav-button ${location.pathname === "/" ? "active" : ""}`}
        >
          <FaHome />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate("/trade")} // Updated to navigate to "/trade"
          className={`nav-button ${location.pathname === "/trade" ? "active" : ""}`} // Updated to check for "/trade"
        >
          <FaExchangeAlt />
          <span>Trade</span>
        </button>

        <button
          onClick={() => navigate("/invite")}
          className={`nav-button ${location.pathname === "/invite" ? "active" : ""}`}
        >
          <FaUserPlus />
          <span>Invite</span>
        </button>

        <button
          onClick={() => navigate("/settings")}
          className={`nav-button ${location.pathname === "/settings" ? "active" : ""}`}
        >
          <FaCog />
          <span>Settings</span>
        </button>
      </div>

      {/* Telegram & WhatsApp Floating Buttons */}
      <div className="contact-buttons">
        <a
          href="https://t.me/yourtelegramusername"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn telegram"
          title="Contact us on Telegram"
        >
          <FaTelegram />
        </a>
        <a
          href="https://wa.me/yourwhatsappnumber"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn whatsapp"
          title="Contact us on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </>
  );
};

export default BottomNav;