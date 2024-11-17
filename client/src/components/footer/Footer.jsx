import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-300 mb-4">
              We provide high-quality online courses to help you learn and grow in your field. Our mission is to empower individuals through education.
            </p>
            <a href="/about" className="text-blue-400 hover:underline">Learn More</a>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/courses" className="hover:text-blue-400 transition duration-200">Courses</a></li>
              <li><a href="/assignments" className="hover:text-blue-400 transition duration-200">Assignments</a></li>
              <li><a href="/calendar" className="hover:text-blue-400 transition duration-200">Calendar</a></li>
              <li><a href="/profile" className="hover:text-blue-400 transition duration-200">Profile</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
                <FaFacebook size={30} className="text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
                <FaTwitter size={30} className="text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
                <FaInstagram size={30} className="text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
                <FaLinkedin size={30} className="text-white" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
                <FaGithub size={30} className="text-white" />
              </a>
            </div>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-300">Email: support@yourdomain.com</p>
            <p className="text-gray-300">Phone: +123 456 7890</p>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-700 mt-6">
        <p className="text-sm">© {new Date().getFullYear()} EduMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
