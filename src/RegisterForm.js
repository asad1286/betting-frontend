import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./contextApi/AuthContext";

const RegisterForm = () => {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmLoginPassword, setConfirmLoginPassword] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [inviteCode, setInviteCode] = useState(""); // State for invitation code
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL location

  // Extract invitationCode from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const invitationCode = params.get('invitationCode'); // Get invitationCode from URL
    if (invitationCode) {
      setInviteCode(invitationCode); // Set inviteCode state if exists in URL
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !loginPassword ||
      !confirmLoginPassword ||
      !withdrawalPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (loginPassword !== confirmLoginPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setError("");
    try {
      const response = await signup(firstName, lastName, email, phone, loginPassword, withdrawalPassword, inviteCode);
      if (response.status === 201) {
        navigate("/login");
      }else{
        setError(response.data.message);
      }
    } catch (errors) {
      const errorMessages = errors.map((error) => `${error.message}`).join(", ");
      setError(errorMessages);
    }
  };

  const styles = {
    container: {
      padding: "40px",
      background: "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      width: "90%",
      maxWidth: "600px",
      color: "#fff",
      margin: "40px auto",
      animation: "fadeIn 0.8s ease-in-out",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      fontSize: "32px",
      marginBottom: "20px",
      textAlign: "center",
      color: "#ff6f61",
      fontWeight: "700",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
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
  };

  const inputStyles = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    background: "#333",
    color: "#fff",
    transition: "box-shadow 0.3s ease",
  };

  const labelStyles = {
    fontSize: "14px",
    color: "#ccc",
    marginBottom: "6px",
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          input:focus {
            outline: none;
            box-shadow: 0 0 5px 2px rgba(255, 111, 97, 0.5);
          }
          button:hover {
            background: #ff847a;
            transform: scale(1.02);
          }
          .grid-row-2 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 768px) {
            .grid-row-2 {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}
      </style>
      <h1 style={styles.title}>Register</h1>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="grid-row-2">
          <div>
            <label style={labelStyles}>First Name</label>
            <input
              style={inputStyles}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyles}>Last Name</label>
            <input
              style={inputStyles}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid-row-2">
          <div>
            <label style={labelStyles}>Email</label>
            <input
              style={inputStyles}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyles}>Phone Number</label>
            <input
              style={inputStyles}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="grid-row-2">
          <div>
            <label style={labelStyles}>Password</label>
            <input
              style={inputStyles}
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyles}>Confirm Password</label>
            <input
              style={inputStyles}
              type="password"
              placeholder="Confirm Password"
              value={confirmLoginPassword}
              onChange={(e) => setConfirmLoginPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="grid-row-2">
          <div>
            <label style={labelStyles}>Withdrawal Password</label>
            <input
              style={inputStyles}
              type="password"
              placeholder="Withdrawal Password"
              value={withdrawalPassword}
              onChange={(e) => setWithdrawalPassword(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyles}>Invitation Code (Optional)</label>
            <input
              style={inputStyles}
              type="text"
              placeholder="Invitation Code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>
        </div>
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
