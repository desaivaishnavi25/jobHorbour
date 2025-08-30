import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/user/company"); 
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json(); 
        setJobs(data); 
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };
  
    fetchJobs(); 
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleView = (id) => {
    try {
      navigate(`/companyDetail/${id}`);
    } catch (err) {
      console.error(err.message);
      alert("Could not load profile.");
    }
  };
  

  const handleApply = async (companyId) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      if (!userId) {
        alert("User not logged in.");
        return;
      }
  
      const response = await fetch("/user/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          company: companyId,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to apply");
      }
  
      // Try parsing JSON, fallback to text if no content
      let result = null;
      try {
        result = await response.json();
      } catch {
        // No JSON returned
      }
  
      alert("Applied successfully!");
      console.log("Apply Response:", result);
    } catch (err) {
      console.error("Error while applying:", err);
      alert("Something went wrong while applying.");
    }
  };
  
  

  return (
    
    <div className="main-page">
        <Navbar/>
      <h1>Job Listings</h1>
      <div className="job-cards">
        {currentJobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <div className='description'>
            <p>{job.description}</p>
            </div>
            <p className="email">{job.emailId}</p>
            <div className="button-group">
              <button onClick={() => handleView(job.id)} className="view-btn">
                View
              </button>
              <button onClick={() => handleApply(job.id)} className="apply-btn">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;
