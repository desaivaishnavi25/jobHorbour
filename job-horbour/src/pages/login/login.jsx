
import './login.css';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const navigate = useNavigate();

    const handleLogin = async(e) => {
      e.preventDefault();

      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
      try{
        setError("");
      const res = await axios.post("/user/login",{
       email,password
      });
      const userId = res.data.userId;
      localStorage.setItem("userId", res.data.userId);
      navigate("/mainPage");
    }catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed.";
    
      setError(message);
    }
      
      
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

          <button type="submit" >Login</button>
          <p className="register-link">
            New here? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    );
  };
  
  export default Login;

