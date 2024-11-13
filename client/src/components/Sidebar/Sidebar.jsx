// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  CogIcon // Import the settings icon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-500 to-gray-900 w-64 min-h-screen p-4 text-white">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => 
              `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            aria-label="Dashboard"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) => 
              `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            aria-label="Courses"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/assignments"
            className={({ isActive }) => 
              `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            aria-label="Assignments"
          >
            <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
            Assignments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) => 
              `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            aria-label="Calendar"
          >
            <CalendarDaysIcon className="h-5 w-5 mr-2" />
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => 
              `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            aria-label="Profile"
          >
            <UserCircleIcon className="h-5 w-5 mr-2" />
            Profile
          </NavLink>
        </li>
        {/* Add the Settings link here */}
        <li>
          <NavLink
            to="/settings" // Set the path for the settings
            className={({ isActive }) => 
              `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            aria-label="Settings"
          >
            <CogIcon className="h-5 w-5 mr-2" /> {/* Settings icon */}
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
