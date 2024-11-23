import React, { useState } from 'react';
import AddCourses from './AddCourses';
import ViewCourses from './ViewCourses';
import Messages  from './Messages';
import Learners from './Learners';


const AdminAppointments = () => {
  const [activeSection, setActiveSection] = useState('viewcourses');

  const handleLinkClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-0 w-64  bg-gray-700 text-white h-screen">
        <ul className="space-y-4 p-4">
          <li>
            <button onClick={() => handleLinkClick('viewcourses')} className="w-full mt-10 text-left">
              View Courses
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick('addcourses')} className="w-full text-left">
              Add Courses
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick('messages')} className="w-full text-left">
              Messages
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick('learners')} className="w-full text-left">
              Manage users
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick('doctors')} className="w-full text-left">
              
            </button>
          </li>
        
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeSection === 'addcourses' && <AddCourses/>}
        {activeSection === 'users'}
        {activeSection === 'viewcourses'   && <ViewCourses />}
        {activeSection === 'messages' && <Messages/>}
        {activeSection === 'learners' && <Learners />}
      </div>
    </div>
  );
};

export default AdminAppointments;