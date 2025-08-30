import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaIndustry, FaGlobe, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import "./companyDetail.css";
import { useParams } from "react-router-dom";

const CompanyDetail = () => {
  const { companyId } = useParams();
  console.log("Route param companyId:", companyId);
  const [profile, setProfile] = useState({
    companyName: "",
    title: "",
    companyEmail: "",
    companyContactNumber: "",
    industry: "",
    country: "",
    city: "",
    description: "",
    foundedYear: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/user/company/${companyId}`);
        if (!response.ok) throw new Error("Failed to fetch company");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    fetchProfile();
  }, [companyId]);

  return (
    <div className="company-wrapper">
      {/* Banner */}
      <div className="company-banner">
        <div className="company-logo">🏢</div>
        <div>
          <h1>{profile.companyName || "Company Profile"}</h1>
          <p className="company-title">{profile.title}</p>
        </div>
      </div>

      {/* Details */}
      <div className="company-details">
        <div className="company-info">
          <p><FaEnvelope /> {profile.companyEmail}</p>
          <p><FaPhone /> {profile.companyContactNumber}</p>
          <p><FaIndustry /> {profile.industry}</p>
          <p><FaGlobe /> {profile.country}</p>
          <p><FaMapMarkerAlt /> {profile.city}</p>
          <p><FaRegCalendarAlt /> Founded: {profile.foundedYear}</p>
        </div>
        <div className="company-description">
          <h2>About Us</h2>
          <p>{profile.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
