/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { usePlans } from "./contextApi/PlanContext";
import { FaCheckCircle, FaSun, FaMoon, FaQuoteLeft, FaQuestionCircle, FaTimes } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "./AxiosInstance";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./contextApi/AuthContext";

const globalStyles = {
  dark: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    primary: "#ff6f61",
    buttonBg: "#ff6f61",
    buttonHover: "#ff867c",
    borderRadius: "12px",
    transition: "0.3s ease",
  },
  light: {
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
};

const testimonials = [
  { id: 1, name: "John Doe", comment: "The Simple plan helped me earn extra income effortlessly!" },
  { id: 2, name: "Jane Smith", comment: "I upgraded to the Pro plan, and the rewards are amazing." },
  { id: 3, name: "Alice Johnson", comment: "The Premium plan is worth every penny." },
];

const faqs = [
  { id: 1, question: "How do I activate a plan?", answer: "Select a plan and click 'Activate'." },
  { id: 2, question: "Can I switch plans?", answer: "Yes, you can switch anytime." },
  { id: 3, question: "What happens if I refund my deposit?", answer: "The AI plan will be paused." },
];

const FreePlans = () => {
  const { plans } = usePlans();
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [userPlans, setUserPlans] = useState([]);
  const [theme, setTheme] = useState("dark");
  const {fetchUserTRXBalance}=useAuth()
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleFaq = (id) => setExpandedFaqId(expandedFaqId === id ? null : id);

  // Fetch logged-in user's plans
  const getLoggedInUserPlans = async () => {
    try {
      if (!token) {
        console.log("No token available. Exiting function.");
        return;
      }

      const response = await axiosInstance.get('auth/user/user-plans');

      // Debugging: log the response data
      console.log("Fetched plans:", response.data.plans);

      const updatedPlans = response.data.plans.map(plan => {
        const isExpired = new Date(plan.expiresAt) < new Date();
        const isActivated = plan.paymentStatus === "completed";
        console.log(`Plan ${plan.name} - Expired: ${isExpired}, Activated: ${isActivated}`);

        return {
          ...plan,
          isExpired,
          isActivated,
        };
      });

      setUserPlans(updatedPlans);
      console.log("Updated plans:", updatedPlans);
    } catch (error) {
      console.error("Error fetching user plans:", error);
    }
  };

  const isPlanActivated = (planId) => {
    const userPlan = userPlans.find((plan) => plan.planId === planId);
    return userPlan && userPlan.isActivated && !userPlan.isExpired;
  };



  useEffect(() => {
    // Fetch user plans when the component mounts
    getLoggedInUserPlans();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmPurchase = async () => {
    try {
      setIsLoading(true); // Start loading

      // Make API call to activate plan
      const response = await axiosInstance.post('/auth/user/assign-plan', {
        planId: selectedPlan.id
      });

      if (response.status === 200) {
        await getLoggedInUserPlans(); // Add selected plan to userPlans
        await fetchUserTRXBalance();
        toast.success("Plan purchased successfully!");
         // Show success toast
        closeModal(); // Close modal after confirmation
      }

      setIsLoading(false); // End loading
    } catch (error) {
      console.error("Error activating plan:", error);
      setIsLoading(false); // End loading even if there's an error
      toast.error(error?.response.data.message); // Show error toast
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const handleModalClick = (e) => {
    // Prevent modal from closing if clicked inside the modal
    e.stopPropagation();
  };

  const selectPlan = (plan) => {
    // Disable selection for expired or already activated plans
    if (plan.isExpired || isPlanActivated(plan.id)) {
      return; // Don't allow selecting expired or activated plans
    }
    setSelectedPlan(plan);
    setIsModalOpen(true); // Open modal when a plan is selected
  };

  return (
    <div style={{ ...globalStyles[theme], minHeight: "100vh", padding: "16px", textAlign: "center" }}>
      {/* Theme Toggle */}
      <button onClick={toggleTheme} style={{ position: "fixed", top: 20, right: 20, background: globalStyles.dark.buttonBg, border: "none", padding: "8px", borderRadius: "50%", cursor: "pointer" }}>
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>

      <h1>Start Your Free Earning Journey</h1>
      <p>Choose a plan and start earning effortlessly.</p>

      {/* Plans Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // Set to 3 columns
          gap: "20px",
          marginTop: "20px",
          maxWidth: "1000px", // Limit width for better alignment
          margin: "20px auto", // Center the grid
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => selectPlan(plan)}
            style={{
              background: "#222",
              padding: "16px",
              borderRadius: globalStyles.dark.borderRadius,
              cursor: plan.isExpired || isPlanActivated(plan.id) ? "not-allowed" : "pointer", // Disable click if expired or activated
              textAlign: "center",
              position: "relative", // To position the activated label
              opacity: plan.isExpired || isPlanActivated(plan.id) ? 0.6 : 1, // Make expired/activated plans less visible
            }}
          >
            {/* Mark plan as activated if it's in userPlans and not expired */}
            {isPlanActivated(plan.id) && (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#28a745",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Activated
              </span>
            )}
            <h2 style={{ color: globalStyles.dark.primary }}>{plan.name}</h2>
            <p>Price: ${plan.price}</p>
            <p>Daily Earning: ${plan.dailyReward}</p>
          </div>
        ))}
      </div>



      {/* Modal */}
      {isModalOpen && selectedPlan && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: theme === "dark" ? "#333" : "#fff",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              width: "300px",
              color: theme === "dark" ? "#fff" : "#333",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: theme === "dark" ? "#ff6f61" : "#333" }}>Confirm Plan Purchase</h3>
            <p>Are you sure you want to purchase the <strong>{selectedPlan?.name}</strong> plan for ${selectedPlan?.price}?</p>
            <p><strong>Earn: ${selectedPlan?.dailyReward}</strong></p>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={confirmPurchase}
                style={{
                  background: globalStyles.dark.buttonBg,
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  margin: "10px",
                  width: "100%",
                }}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Processing..." : "Yes, Purchase"}
              </button>
              <button
                onClick={closeModal}
                style={{
                  background: "#f44336",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  margin: "10px",
                  width: "100%",
                }}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

<ToastContainer />
{/* Plan Comparison Table */}
<div style={{ marginTop: "40px", textAlign: "center" }}>
        <h2>Plan Comparison</h2>
        <div style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}>
          <table style={{ width: "90%", borderCollapse: "collapse", background: "#222", borderRadius: "12px", overflow: "hidden", border: "2px solid #ff6f61" }}>
            <thead>
              <tr style={{ background: globalStyles.dark.primary, color: "white", fontSize: "18px" }}>
                <th style={{ padding: "12px", border: "2px solid #ff6f61" }}>Plan</th>
                <th style={{ padding: "12px", border: "2px solid #ff6f61" }}>Price</th>
              
                <th style={{ padding: "12px", border: "2px solid #ff6f61" }}>Duration</th>
                <th style={{ padding: "12px", border: "2px solid #ff6f61" }}>Daily Earnings</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} style={{ borderBottom: "2px solid #ff6f61", fontSize: "16px" }}>
                  <td style={{ padding: "12px", border: "2px solid #ff6f61" }}>{plan.name}</td>
                  <td style={{ padding: "12px", border: "2px solid #ff6f61" }}>${plan.price}</td>
    
                  <td style={{ padding: "12px", border: "2px solid #ff6f61" }}>{plan.duration}</td>
                  <td style={{ padding: "12px", border: "2px solid #ff6f61" }}>${plan.dailyReward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Testimonials Section */}
      <div style={{ marginTop: "50px" }}>
        <h2>What Our Users Say</h2>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id}>
            <p><FaQuoteLeft /> "{testimonial.comment}"</p>
            <p><strong>- {testimonial.name}</strong></p>
          </div>
        ))}
      </div>

      {/* FAQs Section */}
      <div style={{ marginTop: "50px" }}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.id}>
            <h3 onClick={() => toggleFaq(faq.id)} style={{ cursor: "pointer", color: globalStyles.dark.primary }}>
              <FaQuestionCircle /> {faq.question}
            </h3>
            {expandedFaqId === faq.id && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FreePlans;
