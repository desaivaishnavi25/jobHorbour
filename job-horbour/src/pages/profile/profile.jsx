import React, { useState, useEffect } from 'react';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contactNumber: '',
    experience: '',
    description: '',
    links: ''
  });

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/user/${userId}/profile`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
        setIsCreated(data.email !== null && data.email.trim() !== '');
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(isCreated ? 'Profile updated!' : 'Profile created!');
    setIsCreated(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      setProfile({
        name: '',
        email: '',
        contactNumber: '',
        experience: '',
        description: '',
        links: ''
      });
      setIsCreated(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>{isCreated ? 'Update Your Profile' : 'Create Your Profile'}</h2>
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Number</label>
          <input type="text" name="contactNumber" value={profile.contactNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Experience (years)</label>
          <input type="number" name="experience" value={profile.experience} onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={profile.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Links</label>
          <input type="text" name="links" value={profile.links} onChange={handleChange} />
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

export default Profile;
