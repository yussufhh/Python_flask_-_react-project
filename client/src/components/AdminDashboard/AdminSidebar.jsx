import React, { useState } from 'react';
import {
  BookOpenIcon,
  PlusCircleIcon,
  ChatBubbleLeftIcon,
  UsersIcon,
  FolderIcon
} from '@heroicons/react/24/outline'; // Import Heroicons

// Import your components
import AddCourses from './AddCourses';
import ViewCourses from './ViewCourses';
import Messages from './Messages';
import Learners from './Learners';

const AdminAppointments = () => {
  const [activeSection, setActiveSection] = useState('viewcourses');

  // Handle sidebar link click to change active section
  const handleLinkClick = (section) => {
    setActiveSection(section);
  };

  // Navigation links with their labels, icons, and associated section
  const navLinks = [
    { label: 'View Courses', icon: <BookOpenIcon className="h-5 w-5 mr-2" />, section: 'viewcourses' },
    { label: 'Add Courses', icon: <PlusCircleIcon className="h-5 w-5 mr-2" />, section: 'addcourses' },
    { label: 'Messages', icon: <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />, section: 'messages' },
    { label: 'Manage Users', icon: <UsersIcon className="h-5 w-5 mr-2" />, section: 'learners' },
    
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-0 w-64 bg-gray-700 text-white h-screen">
        <ul className="space-y-4 p-4">
          {navLinks.map(({ label, icon, section }) => (
            <li key={section}>
              <button
                onClick={() => handleLinkClick(section)} // Set the active section on button click
                className="w-full text-left flex items-center p-2 rounded hover:bg-gray-600"
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
        {/* Conditionally render the active section's content */}
        {activeSection === 'viewcourses' && <ViewCourses />}
        {activeSection === 'addcourses' && <AddCourses />}
        {activeSection === 'messages' && <Messages />}
        {activeSection === 'learners' && <Learners />}
      </div>
    </div>
  );
};

export default AdminAppointments;
