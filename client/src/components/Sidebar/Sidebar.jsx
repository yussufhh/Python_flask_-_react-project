import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

// Importing the components for each section
import Dashboard from '../pages/Home';
import Courses from '../pages/Courses';
// import Assignments from './Assignments';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import Settings from '../Settings/Settings';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLinkClick = (section) => {
    setActiveSection(section);
  };

  const navLinks = [
    { to: "/", label: "Dashboard", icon: <HomeIcon className="h-5 w-5 mr-2" />, section: 'dashboard' },
    { to: "/courses", label: "Courses", icon: <BookOpenIcon className="h-5 w-5 mr-2" />, section: 'courses' },
    { to: "/assignments", label: "Assignments", icon: <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />, section: 'assignments' },
    { to: "/calendar", label: "Calendar", icon: <CalendarDaysIcon className="h-5 w-5 mr-2" />, section: 'calendar' },
    { to: "/profile", label: "Profile", icon: <UserCircleIcon className="h-5 w-5 mr-2" />, section: 'profile' },
    { to: "/settings", label: "Settings", icon: <CogIcon className="h-5 w-5 mr-2" />, section: 'settings' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-0 w-64 bg-gray-700 text-white h-screen">
        <h2 className="text-lg font-bold mb-4">Navigation</h2>
        <ul className="space-y-2 p-4">
          {navLinks.map(({ to, label, icon, section }) => (
            <li key={to}>
              <button
                onClick={() => handleLinkClick(section)}
                className={`flex items-center p-2 rounded ${activeSection === section ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                aria-label={label}
              >
                {icon}
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'courses' && <Courses />}
        {activeSection === 'assignments' && <Assignments />}
        {activeSection === 'calendar' && <Calendar />}
        {activeSection === 'profile' && <Profile />}
        {activeSection === 'settings' && <Settings />}
      </div>
      
    </div>
    
  );
};

export default Sidebar;
