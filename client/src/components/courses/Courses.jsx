import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Correct URL
    fetch('http://127.0.0.1:5000/api/featured-courses') // Correct API endpoint
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  const enrollCourse = (id) => {
    fetch(`http://127.0.0.1:5000/api/enroll/${id}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate(`/course-content/${id}`); // Navigate to the course content page
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <p className="font-bold mb-2">Instructor: {course.instructor}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={() => enrollCourse(course.id)}
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
