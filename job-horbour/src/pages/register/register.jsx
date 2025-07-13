import React, { useState } from "react";
import "./register.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleRegister  = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPass) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
      try{
        setError(false);
      const res = await axios.post("/user/registration",{
        username,email,password,role
      });
      res.data && window.location.replace("/login");
    }catch (err) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed.";
    
      setError(message);
    }
      
  };


  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

<div className="role-selection">
  <label>Select Role:</label>
  <div className="role-options">
    <label>
      <input
        type="radio"
        name="role"
        value="employer"
        checked={role === "employer"}
        onChange={(e) => setRole(e.target.value)}
      />
      Employer
    </label>
    <label>
      <input
        type="radio"
        name="role"
        value="employee"
        checked={role === "employee"}
        onChange={(e) => setRole(e.target.value)}
      />
      Employee
    </label>
  </div>
</div>

        <button type="submit">Register</button>
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;