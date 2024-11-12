// src/pages/Calendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import CSS for styling

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Example courses enrolled by the user
  const enrolledCourses = [
    { title: 'HTML5 Fundamentals', description: 'Undated Event' },
    { title: 'CSS Essentials', description: 'Undated Event' },
    { title: 'JavaScript Basics', description: 'Undated Event' },
    { title: 'React Development', description: 'Undated Event' },
    { title: 'Python Programming', description: 'Undated Event' },
    { title: 'Git Version Control', description: 'Undated Event' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <p className="text-gray-600 mb-2">October 2024</p>
      
      <Calendar onChange={onChange} value={date} className="mb-4" />
      
      <div className="mt-6">
        <h3 className="text-lg font-bold">Enrolled Courses</h3>
        <div className="mt-2">
          {enrolledCourses.map((course, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-2">
              <h4 className="font-semibold">{course.title}</h4>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
