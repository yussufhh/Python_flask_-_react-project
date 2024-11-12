import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePic: '',
  });
  const [previewPic, setPreviewPic] = useState('');
  const navigate = useNavigate();

  const defaultProfilePic = 'https://img.freepik.com/free-photo/dreamlike-surrealistic-landscape_23-2150525023.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid';

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData')) || {};
    setUserData(data);
    setPreviewPic(data.profilePic || defaultProfilePic);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPic(imageUrl);
      setUserData((prevData) => ({
        ...prevData,
        profilePic: imageUrl, // Store the image URL as a string
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the userData (including profilePic) in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/profile');
  };

  return (
    <div className="relative max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 p-3 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="profilePic" className="text-lg">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            onChange={handleImageChange}
            className="border-2 border-gray-300 p-3 rounded-lg"
          />
          {previewPic && (
            <div className="mt-4">
              <img
                src={previewPic}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
