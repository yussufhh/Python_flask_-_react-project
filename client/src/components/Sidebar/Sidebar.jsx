import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  CogIcon, // Import the settings icon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navLinks = [
    { to: "/", label: "Dashboard", icon: <HomeIcon className="h-5 w-5 mr-2" /> },
    { to: "/courses", label: "Courses", icon: <BookOpenIcon className="h-5 w-5 mr-2" /> },
    { to: "/assignments", label: "Assignments", icon: <ClipboardDocumentListIcon className="h-5 w-5 mr-2" /> },
    { to: "/calendar", label: "Calendar", icon: <CalendarDaysIcon className="h-5 w-5 mr-2" /> },
    { to: "/profile", label: "Profile", icon: <UserCircleIcon className="h-5 w-5 mr-2" /> },
    { to: "/settings", label: "Settings", icon: <CogIcon className="h-5 w-5 mr-2" /> }, // Settings link
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-400 w-64 min-h-screen p-4 text-white">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        {navLinks.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => 
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              aria-label={label}
            >
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
