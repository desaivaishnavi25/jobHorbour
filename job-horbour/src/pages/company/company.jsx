import React, { useState, useEffect } from 'react';
import './company.css';
import { useParams } from "react-router-dom";

const Company = () => {
  const { companyId } = useParams();
  const [isCreated, setIsCreated] = useState(false);
  const isNew = companyId === "new";
  const [profile, setProfile] = useState({
    companyName: '',
    companyEmail: '',
    companyContactNumber: '',
    industry: '',
    country: '',
    city: '',
    description: '',
    foundedYear: '',
    title: ''
  });


  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!isNew) {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/user/company/${companyId}`);
        if (response.status === 404) {
          setIsCreated(false);
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch company");
        }
  
        const data = await response.json();
        setProfile(data);
        setIsCreated(data.companyEmail !== null && data.companyEmail.trim() !== '');
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    if (companyId) {
      fetchProfile();
    }
  }
  }, [companyId,isNew]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

   const handleSubmit = async()=>{
    try{
        const endpoint = isCreated ?  `/user/updateCompany/${companyId}`:`/user/${userId}/createCompany`;
        const method = isCreated ? 'PUT' : 'POST';
        const response = await fetch(endpoint,{
          method: method,
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile)
    });
    if (!response.ok) {
      throw new Error('Failed to save profile');
    }

    alert(isCreated ? 'Profile updated!' : 'Profile created!');
    setIsCreated(true);
    }
    catch (error) {
      console.error('Error saving profile:', error);
      alert('Something went wrong while saving the profile.');
    }
  };


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await fetch(`/user/${userId}/deleteCompany`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete profile');
        }
  
        setProfile({
            companyName: '',
            companyEmail: '',
            companyContactNumber: '',
            industry: '',
            country: '',
            city: '',
            description: '',
            foundedYear: '',
            title: ''
        });
        setIsCreated(false);
        alert('Profile deleted successfully!');
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Something went wrong while deleting the profile.');
      }
    }
  };
  
  return (
    <div className="profile-container">
      <h2>{isCreated ? 'Update Your Job Profile' : 'Create Your Job Profile'}</h2>
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Company Name</label>
          <input type="text" name="companyName" value={profile.companyName} onChange={handleChange} />
        </div>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={profile.title} onChange={handleChange} />
        </div>
        <div>
          <label>Company Email</label>
          <input type="email" name="companyEmail" value={profile.companyEmail} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Number</label>
          <input type="number" name="companyContactNumber" value={profile.companyContactNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Industry</label>
          <input type="text" name="industry" value={profile.industry} onChange={handleChange} />
        </div>
        <div>
          <label>Country</label>
          <input name="country" value={profile.country} onChange={handleChange}></input>
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={profile.city} onChange={handleChange} />
          <label>Description</label>
          <textarea type="text" name="description" value={profile.description} onChange={handleChange} />
          <label>Founded Year</label>
          <input type="number" name="foundedYear" value={profile.foundedYear} onChange={handleChange} />
        </div>

        <div className="profile-actions">
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            {isCreated ? 'Update Profile' : 'Create Profile'}
          </button>
          {isCreated && (
            <button type="button" className="delete-btn" onClick={handleDelete}>
              Delete Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Company;
