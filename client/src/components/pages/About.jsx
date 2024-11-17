import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [bgImage, setBgImage] = useState(0);

  // List of background images for alternating effect
  const bgImages = [
    "https://img.freepik.com/free-photo/programming-background-collage_23-2149901782.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid", // Replace with real images
    "https://img.freepik.com/premium-photo/seo-optimization-modern-tech-php-syntax-highlighted-writing-programming-functions-laptop-big-data-internet-things-trend_372999-2442.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/computer-program-coding-screen_53876-138060.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1812.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/html-system-website-concept_23-2150376770.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1652.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/computer-programming-often-shortened-programming-is-process-original-formulation-computing-problem-executable-computer-programs-such-as-analysis-developing-algorithms-verificatio_372999-2387.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/laptop-with-word-code-screen-is-lit-up_524325-5472.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => (prev + 1) % bgImages.length); // Change background image every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-cover bg-center py-16"
      style={{ backgroundImage: `url(${bgImages[bgImage]})` }}
    >
      <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        {/* About Us Introduction Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold leading-tight text-white tracking-wide">
            About EduMaster Learning Management System
          </h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            EduMaster LMS provides accessible, high-quality education for all. With our system, you can learn at your own pace, anytime, anywhere.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="w-full md:w-1/2">
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-base">
                Our mission is to provide accessible, affordable, and high-quality education to learners across the world, ensuring equal opportunities for everyone.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-base">
                To be a global leader in the education industry, empowering individuals to unlock their full potential with innovative and effective learning methods.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-white mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Integrity</h3>
              <p className="text-gray-700 text-base">
                We maintain the highest ethical standards, ensuring trust and transparency in every interaction.
              </p>
            </div>
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Innovation</h3>
              <p className="text-gray-700 text-base">
                We embrace new ideas and strive to continuously innovate to enhance learning experiences.
              </p>
            </div>
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-700 text-base">
                We are committed to achieving excellence in everything we do, ensuring that our learners receive the best educational experience.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500 text-center">
              <img
                src="https://img.freepik.com/free-photo/concentrated-students-working-with-computers-library_74855-4099.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-700">CEO & Founder</p>
            </div>
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500 text-center">
              <img
                src="https://img.freepik.com/free-photo/boy-studying-peacefully-library_23-2148844707.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-700">CTO</p>
            </div>
            <div className="bg-green-400 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-500 text-center">
              <img
                src="https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8173.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Alice Johnson</h3>
              <p className="text-gray-700">Lead Instructor</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-gray-500 to-blue-900 py-12">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Get In Touch</h2>
          <p className="text-lg text-white text-center mb-4">
            Have any questions or want to know more? Reach out to us, and we'll be happy to assist you.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:support@edumaster.com"
              className="text-white bg-blue-700 px-6 py-3 rounded-xl shadow-lg hover:bg-blue-800 transition duration-300"
            >
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="text-white bg-green-700 px-6 py-3 rounded-xl shadow-lg hover:bg-green-800 transition duration-300"
            >
              Call Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
