import React, { useState } from "react";
import "./register.css";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPass) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: Implement actual registration logic
    console.log("Registering:", { name, email, password });
    alert("Registration successful (simulated)!");
    setError("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button type="submit">Register</button>
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;