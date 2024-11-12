// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import CourseDetail from './components/pages/CourseDetail';
import Profile from './components/pages/Profile';
import Calendar from './components/pages/Calendar'; 
import Contact from './components/contact/Contact'; 
import Settings from './components/Settings/Settings'; // Import the Settings component
import Footer from './components/footer/Footer';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import EditProfile from './components/pages/EditProfile'; // Import the EditProfile component

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} /> {/* Add EditProfile route */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} /> {/* Add Settings route */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
