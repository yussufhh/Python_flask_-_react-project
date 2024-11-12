// src/components/pages/Settings/AccountSettings.jsx
import React from 'react';

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Change Password</label>
          <input type="password" className="border rounded w-full p-2" placeholder="New Password" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input type="password" className="border rounded w-full p-2" placeholder="Confirm New Password" />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Update Password</button>
      </form>
    </div>
  );
};

export default AccountSettings;
