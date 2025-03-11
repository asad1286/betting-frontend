import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaInfoCircle, FaQuoteLeft, FaQuestionCircle, FaSun, FaMoon, FaShareAlt } from "react-icons/fa";

// Define global styles as a JavaScript object
const globalStyles = {
  root: {
    "--primary-color": "#ff6f61",
    "--secondary-color": "#ffffff",
    "--accent-gradient": "linear-gradient(135deg, #ff6f61, #ffc371)",
    "--text-color": "#333333",
    "--bg-color": "#1a1a1a",
    "--border-color": "#3b3b3b",
    "--transition-speed": "0.35s",
    "--shadow-light": "0 4px 12px rgba(0, 0, 0, 0.08)",
    "--shadow-hover": "0 8px 20px rgba(0, 0, 0, 0.15)",
    "--button-bg-color": "#ff6f61",
    "--button-hover-bg": "#ff867c",
    "--error-color": "#f44336",
    "--success-color": "#4caf50",
    "--info-color": "#2196f3",
  },
  body: {
    fontFamily: "'Roboto', sans-serif",
    background: "var(--bg-color)",
    color: "var(--secondary-color)",
    lineHeight: 1.6,
    WebkitFontSmoothing: "antialiased",
  },
  a: {
    color: "var(--primary-color)",
    textDecoration: "none",
    transition: "color var(--transition-speed) ease",
  },
  aHover: {
    color: "var(--button-hover-bg)",
  },
};

// Plans data
const plans = [
  {
    id: 1,
    name: "Simple",
    price: 5,
    reward: 0.5,
    duration: "30 days",
    dailyEarnings: 0.08,
    usefulTips: [
      "The AI plan must be started after purchase to work.",
      "The AI plan is paused if the initial deposit is refunded.",
      "An inactive AI plan can be gifted.",
    ],
    badge: "",
  },
  {
    id: 2,
    name: "Pro",
    price: 10,
    reward: 1.0,
    duration: "30 days",
    dailyEarnings: 0.16,
    usefulTips: [
      "The AI plan must be started after purchase to work.",
      "The AI plan is paused if the initial deposit is refunded.",
      "An inactive AI plan can be gifted.",
    ],
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Premium",
    price: 20,
    reward: 2.0,
    duration: "30 days",
    dailyEarnings: 0.32,
    usefulTips: [
      "The AI plan must be started after purchase to work.",
      "The AI plan is paused if the initial deposit is refunded.",
      "An inactive AI plan can be gifted.",
    ],
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Diamond",
    price: 50,
    reward: 5.0,
    duration: "30 days",
    dailyEarnings: 0.8,
    usefulTips: [
      "The AI plan must be started after purchase to work.",
      "The AI plan is paused if the initial deposit is refunded.",
      "An inactive AI plan can be gifted.",
    ],
    badge: "",
  },
];

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    comment: "The Simple plan helped me earn extra income effortlessly! Highly recommended.",
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "I upgraded to the Pro plan, and the rewards are amazing. Great service!",
  },
  {
    id: 3,
    name: "Alice Johnson",
    comment: "The Premium plan is worth every penny. I’ve seen consistent earnings.",
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I activate a plan?",
    answer: "Simply select a plan and click 'Activate Plan' in the details modal.",
  },
  {
    id: 2,
    question: "Can I switch plans?",
    answer: "Yes, you can switch plans at any time. Your progress will be saved.",
  },
  {
    id: 3,
    question: "What happens if I refund my deposit?",
    answer: "The AI plan will be paused until you reactivate it.",
  },
];

const FreePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activatedPlans, setActivatedPlans] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [userCount, setUserCount] = useState(0); // Dummy user subscription counter

  // Simulate user subscription count
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prevCount) => prevCount + Math.floor(Math.random() * 10));
    }, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleActivatePlan = () => {
    setActivatedPlans((prevPlans) => [...prevPlans, selectedPlan.id]);
    setIsModalOpen(false);
    alert(`Plan Activated: ${selectedPlan.name}`);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  const toggleFaq = (id) => {
    setExpandedFaqId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic styles based on theme
  const containerStyles = {
    backgroundColor: theme === "dark" ? globalStyles.root["--bg-color"] : "#f5f5f5",
    color: theme === "dark" ? globalStyles.root["--secondary-color"] : "#333",
    minHeight: "100vh",
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  };

  const headerStyles = {
    background: globalStyles.root["--accent-gradient"],
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: globalStyles.root["--shadow-light"],
    textAlign: "center",
  };

  const planCardStyles = {
    backgroundColor: globalStyles.root["--bg-color"],
    border: `1px solid ${globalStyles.root["--border-color"]}`,
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
    position: "relative",
    color: globalStyles.root["--secondary-color"],
    overflow: "hidden",
  };

  const modalStyles = {
    backgroundColor: globalStyles.root["--bg-color"],
    padding: "20px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "left",
    color: globalStyles.root["--secondary-color"],
  };

  return (
    <div style={containerStyles}>
      {/* Theme Toggle Button */}
      <button
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: globalStyles.root["--button-bg-color"],
          border: "none",
          padding: "8px",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: globalStyles.root["--secondary-color"],
          fontSize: "16px",
          transition: "background 0.3s ease",
        }}
        onClick={toggleTheme}
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>

      {/* Header Section */}
      <div style={headerStyles}>
        <h1 style={{ fontSize: "24px", color: globalStyles.root["--secondary-color"], marginBottom: "8px" }}>
          Unlock Your Earnings Potential
        </h1>
        {/* Dummy User Subscription Counter */}
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <p style={{ fontSize: "14px", color: globalStyles.root["--secondary-color"] }}>
            <strong>{userCount}+</strong> users have subscribed to our plans!
          </p>
        </div>
      </div>

      {/* Onboarding Tour */}
      {showOnboarding && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: globalStyles.root["--bg-color"],
            padding: "12px",
            borderRadius: "12px",
            boxShadow: globalStyles.root["--shadow-light"],
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <p>Welcome! Let's get started. Choose a plan to begin earning.</p>
          <button
            style={{
              background: globalStyles.root["--button-bg-color"],
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              color: globalStyles.root["--secondary-color"],
              cursor: "pointer",
              transition: "background 0.3s ease",
              fontSize: "12px",
            }}
            onClick={closeOnboarding}
          >
            Got it!
          </button>
        </div>
      )}

      {/* Plan Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              ...planCardStyles,
              transform: activatedPlans.includes(plan.id) ? "translateY(-4px)" : "none",
              boxShadow: activatedPlans.includes(plan.id) ? globalStyles.root["--shadow-hover"] : "none",
              border: activatedPlans.includes(plan.id) ? `1px solid ${globalStyles.root["--button-hover-bg"]}` : `1px solid ${globalStyles.root["--border-color"]}`,
            }}
            onClick={() => handlePlanClick(plan)}
          >
            {plan.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  background: plan.badge === "Most Popular" ? globalStyles.root["--success-color"] : globalStyles.root["--info-color"],
                  color: globalStyles.root["--secondary-color"],
                  padding: "4px 8px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  boxShadow: globalStyles.root["--shadow-light"],
                }}
              >
                {plan.badge}
              </span>
            )}
            <h2 style={{ fontSize: "24px", marginBottom: "8px", color: globalStyles.root["--primary-color"] }}>
              {plan.name}
            </h2>
            <p>Price: ${plan.price}</p>
            <p>Earn: ${plan.reward}</p>
            {activatedPlans.includes(plan.id) && (
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: globalStyles.root["--secondary-color"],
                  color: globalStyles.root["--success-color"],
                  padding: "4px 8px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaCheckCircle /> Activated
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Plan Comparison Table */}
      <div style={{ margin: "20px 0" }}>
        <h2>Plan Comparison</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: globalStyles.root["--bg-color"], borderRadius: "12px" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", textAlign: "center", background: globalStyles.root["--primary-color"], color: globalStyles.root["--secondary-color"], fontSize: "14px" }}>
                  Plan
                </th>
                <th style={{ padding: "10px", textAlign: "center", background: globalStyles.root["--primary-color"], color: globalStyles.root["--secondary-color"], fontSize: "14px" }}>
                  Price
                </th>
                <th style={{ padding: "10px", textAlign: "center", background: globalStyles.root["--primary-color"], color: globalStyles.root["--secondary-color"], fontSize: "14px" }}>
                  Reward
                </th>
                <th style={{ padding: "10px", textAlign: "center", background: globalStyles.root["--primary-color"], color: globalStyles.root["--secondary-color"], fontSize: "14px" }}>
                  Duration
                </th>
                <th style={{ padding: "10px", textAlign: "center", background: globalStyles.root["--primary-color"], color: globalStyles.root["--secondary-color"], fontSize: "14px" }}>
                  Daily Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} style={{ borderBottom: `1px solid ${globalStyles.root["--border-color"]}` }}>
                  <td style={{ padding: "10px", textAlign: "center" }}>{plan.name}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>${plan.price}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>${plan.reward}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>{plan.duration}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>${plan.dailyEarnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ margin: "20px 0" }}>
        <h2>What Our Users Say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: globalStyles.root["--bg-color"],
                padding: "20px",
                borderRadius: "12px",
                textAlign: "left",
              }}
            >
              <FaQuoteLeft style={{ fontSize: "18px", color: globalStyles.root["--primary-color"], marginBottom: "6px" }} />
              <p>{testimonial.comment}</p>
              <h3 style={{ fontSize: "16px", color: globalStyles.root["--primary-color"], marginTop: "6px" }}>
                - {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ margin: "20px 0" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              style={{
                background: globalStyles.root["--bg-color"],
                padding: "20px",
                borderRadius: "12px",
                textAlign: "left",
                cursor: "pointer",
              }}
              onClick={() => toggleFaq(faq.id)}
            >
              <FaQuestionCircle style={{ fontSize: "18px", color: globalStyles.root["--primary-color"], marginBottom: "6px" }} />
              <h3 style={{ fontSize: "16px", color: globalStyles.root["--primary-color"], marginBottom: "6px" }}>
                {faq.question}
              </h3>
              {expandedFaqId === faq.id && (
                <p style={{ fontSize: "14px", color: "#ccc", marginTop: "6px" }}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Sharing */}
      <div style={{ margin: "20px 0" }}>
        <h2>Share Your Achievements</h2>
        <button
          style={{
            background: globalStyles.root["--primary-color"],
            border: "none",
            padding: "10px 20px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: globalStyles.root["--secondary-color"],
            transition: "background 0.3s ease",
          }}
        >
          <FaShareAlt /> Share on Social Media
        </button>
      </div>

      {/* Modal for Plan Details */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={modalStyles}>
            <h2 style={{ fontSize: "20px", marginBottom: "12px", color: globalStyles.root["--primary-color"], display: "flex", alignItems: "center", gap: "8px" }}>
              <FaInfoCircle /> {selectedPlan.name} Plan Details
            </h2>
            <div>
              <p>
                <strong>Price:</strong> ${selectedPlan.price}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration}
              </p>
              <p>
                <strong>Expected Daily Earnings:</strong> ${selectedPlan.dailyEarnings}
              </p>
              <div
                style={{
                  background: "#444",
                  borderRadius: "10px",
                  height: "8px",
                  margin: "12px 0",
                }}
              >
                <div
                  style={{
                    background: globalStyles.root["--primary-color"],
                    height: "100%",
                    borderRadius: "10px",
                    width: "50%",
                    animation: "progress-animation 2s ease-in-out infinite",
                  }}
                ></div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "8px", color: globalStyles.root["--primary-color"] }}>
                  Useful Tips:
                </h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  {selectedPlan.usefulTips.map((tip, index) => (
                    <li key={index} style={{ fontSize: "14px", marginBottom: "4px", color: "#ccc" }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  background: globalStyles.root["--error-color"],
                  color: globalStyles.root["--secondary-color"],
                  transition: "background 0.3s ease",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  background: globalStyles.root["--success-color"],
                  color: globalStyles.root["--secondary-color"],
                  transition: "background 0.3s ease",
                }}
                onClick={handleActivatePlan}
              >
                Activate Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreePlans;