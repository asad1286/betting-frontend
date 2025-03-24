import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contextApi/AuthContext";

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState(""); // Stores email or phone
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login}=useAuth()

  // Check if the input appears to be an email or a phone number
  const isEmail = loginInput.includes("@") || loginInput.includes(".");
  const isPhone = /^\d+$/.test(loginInput) && loginInput.length >= 8;

  // Determine the input type for mobile keyboards
  const inputFieldType =
    loginInput === ""
      ? "text"
      : isEmail
      ? "email"
      : isPhone
      ? "tel"
      : "text";

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!loginInput) {
          setError("Please enter your email or phone number.");
          return;
        }
        if (!isEmail && !isPhone) {
          setError("Enter a valid email or phone number.");
          return;
        }
        if (!loginPassword) {
          setError("Please enter your password.");
          return;
        }
      
        setError(""); // Reset error message
      
        const response = await login(loginInput, loginPassword);
      
        if (response.status === 200) {
          // Navigate to home page after login if response is successful
          setTimeout(() => {
            navigate("/"); // Navigate to home page after login
          }, 1000);
        } else {
          // Show error message from the backend
          setError(response.message);
        }
      };
      
      
    // Simulate login API call

    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        width: "100%",
        maxWidth: "400px",
        color: "#fff",
        margin: "40px auto",
        animation: "fadeIn 0.8s ease-in-out",
      },
      title: {
        fontSize: "32px",
        marginBottom: "20px",
        textAlign: "center",
        color: "#ff6f61",
        fontWeight: "700",
      },
      bonusBanner: {
        background: "#ff6f61",
        color: "#fff",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "20px",
      },
      form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px", // Reduced gap between form elements
        textAlign: "left",
      },
      label: {
        fontSize: "14px",
        color: "#ccc",
        marginBottom: "-7px", // Reduced margin between label and input
      },
      input: {
        width: "100%",
        padding: "10px", // Reduced padding for input field
        fontSize: "16px",
        border: "none",
        borderRadius: "6px",
        background: "#333",
        color: "#fff",
      },
      button: {
        width: "100%",
        padding: "12px",
        fontSize: "18px",
        background: "#ff6f61",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.35s ease, transform 0.35s ease",
      },
      error: {
        color: "#ff6f61",
        fontSize: "14px",
        marginBottom:"5px",
        textAlign: "center",
      },
      switchContainer: {
        marginTop: "20px",
        textAlign: "center",
      },
      switchLink: {
        background: "none",
        border: "none",
        color: "#ff6f61",
        textDecoration: "underline",
        cursor: "pointer",
        fontSize: "14px",
        padding: 0,
      },
      forgotContainer: {
        textAlign: "center",
        marginTop: "10px",
      },
      forgotLink: {
        background: "none",
        border: "none",
        color: "#ff6f61",
        textDecoration: "underline",
        cursor: "pointer",
        fontSize: "14px",
        padding: 0,
      },
    };
    

  return (
    <div style={styles.container}>
      {/* Custom focus style */}
      <style>
        {`
          input:focus {
            outline: none;
            box-shadow: 0 0 5px 2px rgba(255, 111, 97, 0.8);
            border: 1px solid #ff6f61;
          }
        `}
      </style>
      {/* <div style={styles.bonusBanner}>
        🎉 New Users: Deposit & Get a 10% Bonus! 🎉
      </div> */}
      <h1 style={styles.title}>Login</h1>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Single Input for Email or Phone */}
        <label style={styles.label}>Email or Phone Number</label>
        <input
          style={styles.input}
          type={inputFieldType}
          placeholder="Enter your email or phone number"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />

        {/* Password Input */}
        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          style={styles.button}
          type="submit"
          onMouseOver={(e) => (e.currentTarget.style.background = "#ff867c")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#ff6f61")}
        >
          Login
        </button>
      </form>

      {/* Forgot Password Link */}
      <div style={styles.forgotContainer}>
        <button
          style={styles.forgotLink}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </div>

      {/* Register Link */}
      <div style={styles.switchContainer}>
        <span style={{ color: "#ccc" }}>Don't have an account? </span>
        <button style={styles.switchLink} onClick={() => navigate("/signup")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
