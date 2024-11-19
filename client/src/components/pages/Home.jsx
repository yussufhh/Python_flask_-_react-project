import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5500/api/featured-courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-6">Featured Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;
