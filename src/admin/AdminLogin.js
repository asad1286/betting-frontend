/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from "../contextApi/AdminContext";

function AdminLogin() {
   const [loginInput, setLoginInput] = useState(""); // Stores email or phone
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {adminLogin}=useAdmin()
  
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
        
          const response = await adminLogin(loginInput, loginPassword);
        
          if (response.status === 200) {
            // Navigate to home page after login if response is successful
            setTimeout(() => {
              navigate("/admin-dashboard"); // Navigate to home page after login
            }, 1000);
          } else {
            // Show error message from the backend
            setError(response.message);
          }
        
  };

  const styles = {
    pageWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh", // Full viewport height
      margin: "0",
      background: "#121212", // Optional background color
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      background: "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      width: "100%",
      maxWidth: "400px",
      color: "#fff",
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
  <div style={styles.pageWrapper}>
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
    <h1 style={styles.title}>Admin Login</h1>
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

  </div>
  </div>
);
}

export default AdminLogin;

// Inline CSS styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  box: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};