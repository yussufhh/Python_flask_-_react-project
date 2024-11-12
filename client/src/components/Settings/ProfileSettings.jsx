// src/components/pages/Settings/ProfileSettings.jsx
import React from 'react';

const ProfileSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Profile Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" className="border rounded w-full p-2" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" className="border rounded w-full p-2" placeholder="Enter your email" />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
