import React, { useState } from "react";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Track drawer state

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-600 to-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Branding */}
          <div className="text-xl font-bold">EduMaster Learning Management System</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 justify-center flex-grow">
            <a href="/main" className="text-white hover:text-red-700 bg-green-800 px-4">Home</a>
            <a href="/about" className="text-white hover:text-gray-300 px-4">About Us</a> {/* Added About Us link */}
            <a href="/Login" className="text-white hover:text-blue-700 px-4">Login</a>
            <a href="/signup" className="text-white hover:text-blue-700 px-4">SignUp</a>
            <a href="/contact" className="text-white hover:text-gray-300 px-4">Contact</a>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleDrawer}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer for Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center">
          <div className="w-64 bg-white h-full shadow-md p-4">
            <button
              onClick={toggleDrawer}
              className="mb-4 text-right text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav className="flex flex-col items-center space-y-4">
              <a href="/main" className="text-white hover:text-blue-700 px-4">Home</a>
              <a href="/about" className="text-white hover:text-blue-700 px-4">About Us</a> {/* Added About Us link */}
              <a href="/Login" className="text-white hover:text-blue-700 px-4">Login</a>
              <a href="/signup" className="text-white hover:text-blue-700 px-4">SignUp</a>
              <a href="/contact" className="text-white hover:text-blue-700 px-4">Contact</a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
