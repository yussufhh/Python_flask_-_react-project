import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('auth-token'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    navigate('/login'); // Redirect to login page
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
              <Link to="/signup" className="text-white hover:text-blue-700 px-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
