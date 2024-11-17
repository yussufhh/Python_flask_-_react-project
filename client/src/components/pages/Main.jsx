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
              <div className="flex justify-center p-6">
                <i className="fab fa-html5 text-5xl text-orange-600"></i>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">HTML5 Essentials</h4>
                <p className="text-gray-700 mb-4">Master the building blocks of the web with HTML5.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center p-6">
                <i className="fab fa-css3-alt text-5xl text-blue-500"></i>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">CSS3 Mastery</h4>
                <p className="text-gray-700 mb-4">Create beautiful, responsive layouts with CSS3.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center p-6">
                <i className="fab fa-js-square text-5xl text-yellow-500"></i>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">JavaScript for Beginners</h4>
                <p className="text-gray-700 mb-4">Learn JavaScript to add interactivity to your web pages.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center p-6">
                <i className="fab fa-react text-5xl text-blue-600"></i>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">React Development</h4>
                <p className="text-gray-700 mb-4">Build dynamic user interfaces with React.js.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center p-6">
                <i className="fab fa-python text-5xl text-yellow-600"></i>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Python Programming</h4>
                <p className="text-gray-700 mb-4">Learn Python to build applications and analyze data.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center p-6">
                <i className="fab fa-git-alt text-5xl text-orange-700"></i>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Git Version Control</h4>
                <p className="text-gray-700 mb-4">Master Git to track and manage your code changes.</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
        
      </section>
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

export default Main;
