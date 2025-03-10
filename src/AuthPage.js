import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function AuthPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields.");
      return;
    }
    setLoginError("");
    // Simulate login API call
    setIsLoading(true);
    console.log("Logging in with:", loginEmail, loginPassword);
    // Simulate a delay (2 seconds) before navigating to Home
    setTimeout(() => {
      setIsLoading(false);
      navigate("/"); // Redirect to HomePage after login
    }, 2000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError("Please fill in all fields.");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }
    setRegisterError("");
    console.log("Registering:", registerName, registerEmail, registerPassword, inviteCode);
    // Simulate registration API call and then navigate to Home
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="auth-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h1>Welcome to Crypto Games!</h1>
            <div className="spinner"></div>
          </div>
        </div>
      )}

      <div className="auth-card">
        <h1 className="auth-main-title">
          {activeForm === "login" ? "Login" : "Register"}
        </h1>

        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeForm === "login" ? "active" : ""}`}
            onClick={() => setActiveForm("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeForm === "register" ? "active" : ""}`}
            onClick={() => setActiveForm("register")}
          >
            Register
          </button>
        </div>

        {activeForm === "login" && (
          <>
            {loginError && <p className="auth-error">{loginError}</p>}
            <form onSubmit={handleLogin} className="auth-form">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button type="submit" className="auth-button">
                Login
              </button>
            </form>
            <div className="auth-banner">
              <p>
                New to our platform?{" "}
                <button className="switch-link" onClick={() => setActiveForm("register")}>
                  Register now
                </button>{" "}
                and get a 20% bonus on your first deposit!
              </p>
            </div>
          </>
        )}

        {activeForm === "register" && (
          <>
            {registerError && <p className="auth-error">{registerError}</p>}
            <form onSubmit={handleRegister} className="auth-form">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
              <label>Invitation Code (Optional)</label>
              <input
                type="text"
                placeholder="Enter invitation code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <button type="submit" className="auth-button">
                Register
              </button>
            </form>
            <p className="auth-switch">
              Already have an account?{" "}
              <button className="switch-link" onClick={() => setActiveForm("login")}>
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
