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
import Settings from './components/Settings/Settings';
import Footer from './components/footer/Footer';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import EditProfile from './components/pages/EditProfile';
import Main from './components/pages/Main';
import AboutUs from './components/pages/About';
import AdminSidebar from './components/AdminDashboard/AdminSidebar';
import Instructor from './components/instructor/Instructor';
import InstructorLogin from './components/InstructorLogin/InstructorLogin';

function App() {
  return (
    <Router>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Authenticated Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/adminsidebar" element={<AdminSidebar />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructorlogin" element={<InstructorLogin />} />
        </Routes>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </Router>
  );
}

export default App;
