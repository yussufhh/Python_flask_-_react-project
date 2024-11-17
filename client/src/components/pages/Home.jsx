// src/components/pages/Home.jsx
import React, { useContext } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { ThemeContext } from '../Settings/ThemeContext'

const Home = () => {
  const { theme } = useContext(ThemeContext);

  // Sample data for featured courses
  const featuredCourses = [
    {
      id: 1,
      title: 'HTML5',
      description: 'Learn the structure of web pages with HTML5.',
      icon: 'https://img.icons8.com/color/48/000000/html-5.png',
    },
    {
      id: 2,
      title: 'CSS3',
      description: 'Style your web pages with CSS3.',
      icon: 'https://img.icons8.com/color/48/000000/css3.png',
    },
    {
      id: 3,
      title: 'JavaScript',
      description: 'Make your web pages interactive with JavaScript.',
      icon: 'https://img.icons8.com/color/48/000000/javascript.png',
    },
    {
      id: 4,
      title: 'React',
      description: 'Build dynamic web applications with React.',
      icon: 'https://img.icons8.com/color/48/000000/react-native.png',
    },
    {
      id: 5,
      title: 'Python',
      description: 'Learn programming with Python.',
      icon: 'https://img.icons8.com/color/48/000000/python.png',
    },
    {
      id: 6,
      title: 'Git',
      description: 'Version control your projects with Git.',
      icon: 'https://img.icons8.com/color/48/000000/git.png',
    },
  ];

  return (
    <div className={`container mx-auto p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-6">Welcome to  EduMaster Learning Management System</h1>
      <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;
