// src/components/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard';

const Courses = () => {
  // Sample data for all courses
  const allCourses = [
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

  // State for counters
  const [enrolled, setEnrolled] = useState(0);
  const [graduated, setGraduated] = useState(0);
  const [reviews, setReviews] = useState(0);

  // Animate counters
  useEffect(() => {
    const targetEnrolled = 1200;
    const targetGraduated = 950;
    const targetReviews = 300;

    const interval = setInterval(() => {
      setEnrolled((prev) => Math.min(prev + Math.ceil(targetEnrolled / 50), targetEnrolled));
      setGraduated((prev) => Math.min(prev + Math.ceil(targetGraduated / 50), targetGraduated));
      setReviews((prev) => Math.min(prev + Math.ceil(targetReviews / 50), targetReviews));
    }, 100); // Adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      {/* Heading and styled text */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-center mb-2">Explore Our Courses</h2>
        <p className="text-center text-gray-600">
          Discover a wide range of courses designed to help you enhance your skills and advance your career. 
          Whether you are just starting or looking to deepen your knowledge, we have something for everyone!
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {allCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Counters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 p-4 rounded-lg text-center text-white">
          <h2 className="text-2xl font-bold">{enrolled}+</h2>
          <p className="text-gray-200">Enrolled Students</p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg text-center text-white">
          <h2 className="text-2xl font-bold">{graduated}+</h2>
          <p className="text-gray-200">Graduates</p>
        </div>
        <div className="bg-purple-500 p-4 rounded-lg text-center text-white">
          <h2 className="text-2xl font-bold">{reviews}+</h2>
          <p className="text-gray-200">Positive Reviews</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-200 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-center mb-4">What Our Learners Say</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-center italic">
              "This platform changed my life! The courses are comprehensive and easy to follow."
            </p>
            <p className="text-right text-gray-500">- Zakaria Abdullahi</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-center italic">
              "I landed my dream job after completing the Python course!"
            </p>
            <p className="text-right text-gray-500">- Moon lover</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-center italic">
              "The instructors are amazing, and the content is top-notch!"
            </p>
            <p className="text-right text-gray-500">- Sahara Mohamed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

// import React, { useState, useEffect } from 'react';
// import CourseCard from '../CourseCard/CourseCard';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolled, setEnrolled] = useState(0);
//   const [graduated, setGraduated] = useState(0);
//   const [reviews, setReviews] = useState(0);

//   useEffect(() => {
//     fetch('/api/courses')
//       .then(response => response.json())
//       .then(data => {
//         setCourses(data);
//         // Compute counters based on data if needed
//       })
//       .catch(error => console.error("Error fetching courses:", error));
//   }, []);

//   return (
//     <div className="container mx-auto p-8">
//       {/* Render your components as before */}
//     </div>
//   );
// };

// export default Courses;
