// src/components/pages/Settings/Settings.jsx
import React, { useState, Suspense, lazy } from 'react';

// Lazy-load subcomponents for each settings category
const ProfileSettings = lazy(() => import('./ProfileSettings'));
const AccountSettings = lazy(() => import('./AccountSettings'));
const NotificationSettings = lazy(() => import('./NotificationSettings'));
const PrivacySettings = lazy(() => import('./PrivacySettings'));
const AppearanceSettings = lazy(() => import('./AppearanceSettings'));

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="settings-container p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="tabs flex space-x-4 mb-4">
        {['profile', 'account', 'notifications', 'privacy', 'appearance'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`p-2 rounded ${selectedTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="tab-content mt-4">
          {renderTabContent()}
        </div>
      </Suspense>
    </div>
  );
};

export default Settings;
