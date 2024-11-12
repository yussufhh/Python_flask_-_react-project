// src/components/pages/Settings/PrivacySettings.jsx
import React from 'react';

const PrivacySettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Privacy Settings</h2>
      <form>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Make my profile private
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Allow search engines to index my profile
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save Privacy Settings</button>
      </form>
    </div>
  );
};

export default PrivacySettings;
