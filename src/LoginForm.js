import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    console.log("Logging in with:", loginEmail, loginPassword);
    
    // Simulate login API call
    setTimeout(() => {
      navigate("/"); // Navigate to home page after login
    }, 1000);
  };

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
      gap: "16px",
      textAlign: "left",
    },
    label: {
      fontSize: "14px",
      color: "#ccc",
    },
    input: {
      width: "100%",
      padding: "12px",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.bonusBanner}>
        🎉 New Users: Deposit & Get a 10% Bonus! 🎉
      </div>
      <h1 style={styles.title}>Login</h1>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button
          style={styles.button}
          type="submit"
          onMouseOver={(e) => (e.currentTarget.style.background = "#ff867c")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#ff6f61")}
        >
          Login
        </button>
      </form>
      <div style={styles.switchContainer}>
        <span style={{ color: "#ccc" }}>Don't have an account? </span>
        <button style={styles.switchLink} onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
