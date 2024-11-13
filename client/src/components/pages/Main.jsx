import React from "react";

const Main = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-500 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to EduMaster</h2>
          <p className="text-lg mb-8">
            Discover a world of knowledge and elevate your skills with our top-notch online courses.
          </p>
          <a href="#courses" className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-100">
            Explore Courses
          </a>
        </div>
      </section>

      {/* Course Categories Section */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Course Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h4 className="text-2xl font-semibold mb-4">Programming</h4>
              <p>Learn the latest in coding and software development.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h4 className="text-2xl font-semibold mb-4">Design</h4>
              <p>Master graphic, web, and UX design techniques.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h4 className="text-2xl font-semibold mb-4">Marketing</h4>
              <p>Develop skills in digital marketing and brand management.</p>
            </div>
          </div>
        </div>
      </section>

       {/* Featured Courses Section */}
       <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="data:image/png;base64,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" alt="Course 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Introduction to JavaScript</h4>
                <p className="text-gray-700 mb-4">Get started with JavaScript programming from scratch.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="data:image/png;base64,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" alt="Course 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Advanced CSS Techniques</h4>
                <p className="text-gray-700 mb-4">Enhance your styling skills with advanced CSS.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="data:image/png;base64,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" alt="Course 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Digital Marketing Essentials</h4>
                <p className="text-gray-700 mb-4">Explore the key strategies in digital marketing.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="data:image/png;base64,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" alt="Course 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Introduction to JavaScript</h4>
                <p className="text-gray-700 mb-4">Get started with JavaScript programming from scratch.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="data:image/png;base64,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" alt="Course 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Advanced CSS Techniques</h4>
                <p className="text-gray-700 mb-4">Enhance your styling skills with advanced CSS.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="data:image/png;base64,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" alt="Course 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Digital Marketing Essentials</h4>
                <p className="text-gray-700 mb-4">Explore the key strategies in digital marketing.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Main;
