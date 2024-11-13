import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Step 1: Track the login status

  // Step 2: Check for the token in localStorage when the component mounts
  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    if (userToken) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // Step 3: Handle Logout - remove token and update login state
  const handleLogout = () => {
    localStorage.removeItem("user-token");  // Remove the token
    setIsLoggedIn(false);  // Update the login state to false
    window.location.href = "/login";  // Redirect to the login page
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-500 to-blue-900 text-white p-4 h-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold font-sans">EduMaster - Learning Management System</div>
          <div className="hidden md:flex space-x-4 text-center">
            <a href="/main" className="hover:text-gray-400 font-sans">Main</a>

            {/* Step 4: Conditionally render Login/Signup or Profile/Logout */}
            {!isLoggedIn ? (
              <>
                <a href="/login" className="hover:text-gray-400 font-sans">Login</a>
                <a href="/signup" className="hover:text-gray-400 font-sans">SignUp</a>
              </>
            ) : (
              <>
                <a href="/profile" className="hover:text-gray-400 font-sans">Profile</a>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-400 font-sans text-left"
                >
                  Logout
                </button>
              </>
            )}

            <a href="/contact" className="hover:text-gray-400 font-sans">Contact</a>
          </div>
          <div className="md:hidden">
            <button id="menu-toggle" onClick={openDrawer} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
    
    </>
  );
};

export default Navbar;
