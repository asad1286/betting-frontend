import React, { useState, useEffect } from "react";
import "./FreePlans.css"; // Import CSS for styling
import { FaCheckCircle, FaInfoCircle, FaQuoteLeft, FaQuestionCircle, FaSun, FaMoon, FaShareAlt } from "react-icons/fa"; // Icons for better visuals

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
    badge: "", // No badge for this plan
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
    badge: "Most Popular", // Badge for this plan
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
    badge: "Best Value", // Badge for this plan
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
    badge: "", // No badge for this plan
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
  const [theme, setTheme] = useState("dark"); // Default theme is dark
  const [showOnboarding, setShowOnboarding] = useState(true); // Show onboarding for new users
  const [expandedFaqId, setExpandedFaqId] = useState(null); // Track expanded FAQ item

  // Handle plan selection
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Handle plan activation
  const handleActivatePlan = () => {
    setActivatedPlans((prevPlans) => [...prevPlans, selectedPlan.id]);
    setIsModalOpen(false);
    alert(`Plan Activated: ${selectedPlan.name}`);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Close onboarding
  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  // Toggle FAQ item
  const toggleFaq = (id) => {
    setExpandedFaqId((prevId) => (prevId === id ? null : id));
  };

  // Show onboarding for new users
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(false);
    }, 5000); // Hide onboarding after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`free-plans-container ${theme}`}>
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>

      {/* Compact Header Section */}
      <div className="header-section">
        <h1>Start Your Free Earning Journey</h1>
        <p>Choose a plan and start earning effortlessly.</p>
      </div>

      {/* Onboarding Tour */}
      {showOnboarding && (
        <div className="onboarding-tour">
          <p>Welcome! Let's get started. Choose a plan to begin earning.</p>
          <button onClick={closeOnboarding}>Got it!</button>
        </div>
      )}

      {/* Plan Cards */}
      <div className="plan-cards">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${
              activatedPlans.includes(plan.id) ? "activated" : ""
            }`}
            onClick={() => handlePlanClick(plan)}
          >
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
            <h2>{plan.name}</h2>
            <p>Price: ${plan.price}</p>
            <p>Earn: ${plan.reward}</p>
            {activatedPlans.includes(plan.id) && (
              <span className="activated-label">
                <FaCheckCircle /> Activated
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Plan Comparison Table */}
      <div className="plan-comparison">
        <h2>Plan Comparison</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Reward</th>
                <th>Duration</th>
                <th>Daily Earnings</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>${plan.price}</td>
                  <td>${plan.reward}</td>
                  <td>{plan.duration}</td>
                  <td>${plan.dailyEarnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p>{testimonial.comment}</p>
              <h3>- {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faqs">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-card ${expandedFaqId === faq.id ? "expanded" : ""}`}
              onClick={() => toggleFaq(faq.id)}
            >
              <FaQuestionCircle className="faq-icon" />
              <h3>{faq.question}</h3>
              {expandedFaqId === faq.id && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Sharing */}
      <div className="social-sharing">
        <h2>Share Your Achievements</h2>
        <button className="share-button">
          <FaShareAlt /> Share on Social Media
        </button>
      </div>

      {/* Modal for Plan Details */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              <FaInfoCircle /> {selectedPlan.name} Plan Details
            </h2>
            <div className="plan-details">
              <p>
                <strong>Price:</strong> ${selectedPlan.price}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration}
              </p>
              <p>
                <strong>Expected Daily Earnings:</strong> $
                {selectedPlan.dailyEarnings}
              </p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "50%" }}></div>
              </div>
              <div className="useful-tips">
                <h3>Useful Tips:</h3>
                <ul>
                  {selectedPlan.usefulTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleActivatePlan}>Activate Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreePlans;