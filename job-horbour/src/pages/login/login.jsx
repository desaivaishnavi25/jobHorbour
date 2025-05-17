
import './login.css';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Simple validation
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
  
      // TODO: Handle authentication logic here
      console.log("Logging in with", { email, password });
      setError("");
      alert("Login successful (simulated)!");
    };
  
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <div className="divider">or</div>

            <button type="button" className="google-login" >
            <FcGoogle className="google-icon" />
          Login with Gmail
             </button>
          <p className="register-link">
            New here? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    );
  };
  
  export default Login;

