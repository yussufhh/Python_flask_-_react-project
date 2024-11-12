// src/components/pages/Settings/AppearanceSettings.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../Settings/ThemeContext';

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleThemeChange = (event) => {
    toggleTheme(event.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Appearance Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Theme</label>
          <select
            className="border rounded w-full p-2"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Save Appearance Settings
        </button>
      </form>
    </div>
  );
};

export default AppearanceSettings;
