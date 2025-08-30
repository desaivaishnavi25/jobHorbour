import React, { useState } from 'react';
import './navbar.css'; 
import { Menu, Bell, User, Backpack } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleProfileClick = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      alert("User not logged in");
      return;
    }
  
    try {
      // const response = await fetch(`/user/${userId}/profile`);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch profile");
      // }
      // const data = await response.json();
      // console.log("User Profile:", data);
      navigate("/profile");

    } catch (err) {
      console.error(err.message);
      alert("Could not load profile.");
    }
  };

  const handleAddJobClick = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      alert("User not logged in");
      return;
    }
  
    try {
      // const response = await fetch(`/user/${userId}/profile`);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch profile");
      // }
      // const data = await response.json();
      // console.log("User Profile:", data);
      navigate("/companyListings");

    } catch (err) {
      console.error(err.message);
      alert("Could not load profile.");
    }
  };

  const handleViewMyApplications = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      alert("User not logged in");
      return;
    }
  
    try {
      // const response = await fetch(`/user/${userId}/profile`);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch profile");
      // }
      // const data = await response.json();
      // console.log("User Profile:", data);
      navigate("/appliedCompanies");

    } catch (err) {
      console.error(err.message);
      alert("Could not load profile.");
    }
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hamburger"
        >
          <Menu size={24} />
        </button>
        {isMenuOpen && (
          <div className="dropdown">
           <button onClick={handleViewMyApplications}>Dashboard</button>
            <a href="/jobs">Jobs</a>
            <a href="/settings">Settings</a>
          </div>
        )}
        <h1 className="logo">JobHourbour</h1>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs, companies..."
        />
      </div>
      <div className="navbar-right">
        <button className="notification">
          <Bell size={20} />
          <span className="notif-dot"></span>
          <div class="hide">Notification</div>
        </button>
        <button className="profile-btn" onClick={handleProfileClick}>
        <div class="hide">Profile</div>
          <User size={20} />
        </button>
        <button className="add-job-btn" onClick={handleAddJobClick}>
        <div class="hide">Add Job</div>
          <Backpack size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
