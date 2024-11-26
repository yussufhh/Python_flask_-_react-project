import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [newProfile, setNewProfile] = useState({
    username: '',
    email: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate(); // For redirecting

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // Capture the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', newProfile.username);
    formData.append('email', newProfile.email);
    if (profilePic) {
      formData.append('profile_pic', profilePic); // Append the file to the FormData
    }

    try {
      const response = await fetch('http://127.0.0.1:4000/api/user/profile?user_id=1', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        // Show success message using SweetAlert2
        Swal.fire({
          title: 'Profile updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to profile page after closing the alert
          navigate('/profile');
        });
        console.log('Updated Profile:', updatedProfile);
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `Error updating profile: ${errorData.message || 'Unknown error'}`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        title: 'An error occurred while updating your profile.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Username
          </label>
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
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
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
          <label htmlFor="profile_pic" className="block text-gray-700 font-medium">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            accept="image/*" // Only allow image files
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
