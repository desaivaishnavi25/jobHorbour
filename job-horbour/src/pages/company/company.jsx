import React, { useState, useEffect } from 'react';
import './company.css';

const Company = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    companyEmail: '',
    companyContactNumber: '',
    industry: '',
    country: '',
    city: '',
    description: '',
    foundedYear: ''
  });

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/user/${userId}/company`);
        if (response.status === 404) {
          setIsCreated(false);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch company");
        }

        const data = await response.json();
        setProfile(data);
        setIsCreated(data.email !== null && data.email.trim() !== '');
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

   const handleSubmit = async()=>{
    try{
        const endpoint = isCreated ?  `/user/${userId}/updateCompany`:`/user/${userId}/createCompany`;
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
            foundedYear: ''
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
      <h2>{isCreated ? 'Update Your Profile' : 'Create Your Profile'}</h2>
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name</label>
          <input type="text" name="companyName" value={profile.companyName} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="companyEmail" value={profile.companyEmail} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Number</label>
          <input type="text" name="companyContactNumber" value={profile.companyContactNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Industry</label>
          <input type="number" name="industry" value={profile.industry} onChange={handleChange} />
        </div>
        <div>
          <label>Country</label>
          <textarea name="country" value={profile.country} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={profile.city} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={profile.description} onChange={handleChange} />
          <label>Founded Year</label>
          <input type="text" name="foundedYear" value={profile.foundedYear} onChange={handleChange} />
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
