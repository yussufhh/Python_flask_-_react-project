import React, { useState } from 'react';

const EditProfile = () => {
  const [newProfile, setNewProfile] = useState({
    username: '',
    email: '',
    profile_pic: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:4000/api/user/profile?user_id=1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProfile)
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      alert('Profile updated successfully!');
    } else {
      console.error('Error updating profile');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newProfile.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newProfile.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="profile_pic" className="block text-gray-700 font-medium">Profile Picture URL</label>
          <input
            type="text"
            id="profile_pic"
            name="profile_pic"
            value={newProfile.profile_pic}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
