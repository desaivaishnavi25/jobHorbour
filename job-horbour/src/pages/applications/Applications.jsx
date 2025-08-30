import React, { useState, useEffect } from 'react';
import './applications.css';
import Navbar from "../navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();  // get jobId from URL
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`/user/apply/${jobId}`);  
        
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  // pagination logic
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentApps = applications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(applications.length / jobsPerPage);

  return (
    <div className="company-listing">
      <Navbar/>
      <h1>Applications for Job #{jobId}</h1>
      <div className="job-cards">
        {currentApps.map((profile) => (
          <div key={profile.id} className="job-card">
            <h2>{profile.name}</h2>
            <div className="description">
              <p>{profile.contactNumber}</p>
            </div>
            <p className="email">{profile.email}</p>
            <div className="button-group">
              <button className="view-btn">
                View Resume
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

export default Applications;
