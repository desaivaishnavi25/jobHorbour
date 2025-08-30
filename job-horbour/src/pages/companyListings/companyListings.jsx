import React, { useState, useEffect } from 'react';
import './companyListings.css';
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

const CompanyListings = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userId = localStorage.getItem("userId");   
        if (!userId) {
          console.error("User not logged in");
          return;
        }

        const response = await fetch(`/user/${userId}/company`);  
        
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

  const handleUpdate = (id) => {
    try {
      navigate(`/companyProfile/${id}`);
    } catch (err) {
      console.error(err.message);
      alert("Could not load profile.");
    }
  };
  

  const handleAddNewJob = () => {
    navigate("/companyProfile/new"); // special route for creating new job
  };

  const handleViewApplication = async (jobId) => {
    try{
      navigate(`/applications/${jobId}`);

    } catch (err) {
      console.error(err.message);
      alert("Could not load profile.");
    }
  };

  return (
    
    <div className="company-listing">
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
              <button onClick={() => handleUpdate(job.id)} className="view-btn">
                Update
              </button>
              <button onClick={() => handleApply(job.id)} className="apply-btn">
                Delete
              </button>
              <button onClick={() => handleViewApplication(job.id)} className="view-btn">
                View Applications
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
      <button onClick={handleAddNewJob} className="apply-btn">
                Add new job
              </button>
    </div>
  );
};

export default CompanyListings;
