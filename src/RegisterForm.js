import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Registering:", registerName, registerEmail, registerPassword, inviteCode);
    // Place your registration logic here...
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
      <h1 style={styles.title}>Register</h1>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter your full name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <label style={styles.label}>Confirm Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Confirm your password"
          value={registerConfirmPassword}
          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
        />
        <label style={styles.label}>Invitation Code (Optional)</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter invitation code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <div style={styles.switchContainer}>
        <span style={{ color: "#ccc" }}>Already have an account? </span>
        <button style={styles.switchLink} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
