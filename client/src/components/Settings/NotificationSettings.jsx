// src/components/pages/Settings/NotificationSettings.jsx
import React from 'react';

const NotificationSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <form>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Email Notifications
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            SMS Notifications
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save Notification Settings</button>
      </form>
    </div>
  );
};

export default NotificationSettings;
