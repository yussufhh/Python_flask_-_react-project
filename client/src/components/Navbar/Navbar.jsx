import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = !!localStorage.getItem('auth-token');

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    navigate('/login');
  };

  const handleSignupOption = (role) => {
    setShowDropdown(false);
    if (role === 'student') {
      navigate('/signup');
    } else if (role === 'instructor') {
      navigate('/instructor'); // Navigate to the instructor signup page
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-600 to-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="text-xl font-bold">EduMaster Learning Management System</div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-4 justify-center flex-grow">
          <Link to="/" className="text-white hover:text-blue-800 bg-orange-800 px-4">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300 px-4">About Us</Link>

          {/* Conditional rendering */}
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white hover:text-blue-700 px-4">Profile</Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-700 px-4"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-700 px-4">Login</Link>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-white hover:text-blue-700 px-4"
                >
                  Sign Up
                </button>
                {showDropdown && (
                  <div className="absolute bg-white text-black shadow-lg rounded-md mt-2">
                    <button
                      onClick={() => handleSignupOption('student')}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Student
                    </button>
                    <button
                      onClick={() => handleSignupOption('instructor')}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Instructor
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
