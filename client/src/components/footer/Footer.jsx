import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">About Us</h2>
            <p className="text-base text-gray-400 mb-4">
              We provide high-quality online courses to help you learn and grow in your field. Our mission is to empower individuals through education.
            </p>
            <a href="/about" className="text-blue-400 hover:text-blue-300 text-base transition duration-300">Learn More</a>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-base text-gray-400 hover:text-blue-400 transition duration-300">Courses</a></li>
              <li><a href="/assignments" className="text-base text-gray-400 hover:text-blue-400 transition duration-300">Assignments</a></li>
              <li><a href="/calendar" className="text-base text-gray-400 hover:text-blue-400 transition duration-300">Calendar</a></li>
              <li><a href="/profile" className="text-base text-gray-400 hover:text-blue-400 transition duration-300">Profile</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">Follow Us</h2>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-blue-600 p-2 rounded-full transition duration-300"
              >
                <FaFacebook size={28} className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-blue-400 p-2 rounded-full transition duration-300"
              >
                <FaTwitter size={28} className="text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-pink-500 p-2 rounded-full transition duration-300"
              >
                <FaInstagram size={28} className="text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-blue-800 p-2 rounded-full transition duration-300"
              >
                <FaLinkedin size={28} className="text-white" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gray-700 p-2 rounded-full transition duration-300"
              >
                <FaGithub size={28} className="text-white" />
              </a>
            </div>
            <h2 className="text-base font-semibold mb-2 text-gray-300">Contact Us</h2>
            <p className="text-base text-gray-400">Email: support@yourdomain.com</p>
            <p className="text-base text-gray-400">Phone: +123 456 7890</p>
            <a
              href="https://wa.me/254793477632"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 mt-4 bg-green-500 hover:bg-green-600 text-white text-base py-2 px-4 rounded-full transition duration-300"
            >
              <FaWhatsapp size={28} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-700 mt-6">
        <p className="text-base text-gray-400">© {new Date().getFullYear()} EduMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
