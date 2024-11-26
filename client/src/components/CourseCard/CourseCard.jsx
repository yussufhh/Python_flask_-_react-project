// src/components/CourseCard/CourseCard.jsx
import React from 'react';

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <img src={course.icon} alt={course.title} className="w-12 h-12 mr-4" />
        <h2 className="text-xl font-bold">{course.title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{course.description}</p>
    </div>
  );
};

export default CourseCard;