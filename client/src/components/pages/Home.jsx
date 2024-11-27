// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // Tab state
  const [error, setError] = useState(null); // Error state

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5300/api/featured-courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError('Error fetching courses. Please try again later.');
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setActiveTab('overview'); // Reset to 'overview' tab when course is selected
  };

  const handleClose = () => {
    setSelectedCourse(null); // Close the drawer
  };

  return (
    <div>
      <div className="container mx-auto p-8">
        {/* Error message */}
        {error && <div className="text-red-600">{error}</div>}

        {/* Drawer for course details */}
        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
            selectedCourse ? 'translate-x-0' : 'translate-x-full'
          } w-full sm:w-2/3 lg:w-1/2 z-50`}
        >
          {selectedCourse && (
            <div className="p-6 relative overflow-y-auto h-full">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white bg-red-600 px-4 py-2 rounded-full"
                aria-label="Close course details"
              >
                &times; Close
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
              <p className="text-gray-600 mb-4 italic">{selectedCourse.description}</p>

              {/* Tab Navigation */}
              <div className="flex border-b mb-6">
                {['overview', 'keyTopics', 'courseContent', 'requirements'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-xl font-semibold ${
                      activeTab === tab ? 'border-b-4 border-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'overview' && (
                  <>
                    <h3 className="text-2xl font-semibold mb-2">Overview</h3>
                    <p className="text-gray-800 mb-4">
                      {selectedCourse.overview || "This is the overview of the course."}
                    </p>
                  </>
                )}

                {activeTab === 'keyTopics' && (
                  <>
                    <h3 className="text-2xl font-semibold mb-2">Key Topics</h3>
                    <ul className="list-disc list-inside text-gray-800 mb-4">
                      {selectedCourse.topics?.length
                        ? selectedCourse.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                          ))
                        : "No topics available."}
                    </ul>
                  </>
                )}

                {activeTab === 'courseContent' && (
                  <>
                    <h3 className="text-2xl font-semibold mb-2">Course Content</h3>
                    <p className="text-gray-800 mb-6">
                      {selectedCourse.content || "This section provides detailed content about the course."}
                    </p>
                  </>
                )}

                {activeTab === 'requirements' && (
                  <>
                    <h3 className="text-2xl font-semibold mb-2">Requirements</h3>
                    <p className="text-gray-800">
                      {selectedCourse.requirements || "This course requires no prior knowledge or skills."}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Featured Courses List */}
        <h2 className="text-3xl font-semibold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => handleCardClick(course)}
            />
          ))}
        </div>
      </div>

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

export default Home;
