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
