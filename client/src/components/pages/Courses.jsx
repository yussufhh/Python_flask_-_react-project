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
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Testimonial */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
              <p className="italic text-lg mb-4">
                "This platform changed my life! The courses are comprehensive and easy to follow."
              </p>
              <p className="text-right text-blue-700 font-bold">- Zakaria Abdullahi</p>
            </div>
            {/* Second Testimonial */}
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
              <p className="italic text-lg mb-4">
                "I landed my dream job after completing the Python course!"
              </p>
              <p className="text-right text-yellow-700 font-bold">- Moon Lover</p>
            </div>
            {/* Third Testimonial */}
            <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
              <p className="italic text-lg mb-4">
                "The instructors are amazing, and the content is top-notch!"
              </p>
              <p className="text-right text-green-700 font-bold">- Sahara Mohamed</p>
            </div>
            {/* Fourth Testimonial */}
            <div className="bg-purple-100 p-6 rounded-lg shadow-lg text-center">
              <p className="italic text-lg mb-4">
                "The flexibility of the courses allowed me to learn at my own pace."
              </p>
              <p className="text-right text-purple-700 font-bold">- Amina Yusuf</p>
            </div>
            {/* Fifth Testimonial */}
            <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
              <p className="italic text-lg mb-4">
                "EduMaster provided me with the skills I needed to transition into a tech career."
              </p>
              <p className="text-right text-red-700 font-bold">- Ahmed Noor</p>
            </div>
            {/* Sixth Testimonial */}
            <div className="bg-teal-100 p-6 rounded-lg shadow-lg text-center">
              <p className="italic text-lg mb-4">
                "The support from the instructors and community is unparalleled!"
              </p>
              <p className="text-right text-teal-700 font-bold">- Fatima Ali</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
