import React, { useState } from 'react';

const AddCourses = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    icon: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5500/api/featured-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      if (response.ok) {
        setMessage('Course added successfully!');
        setCourseData({ title: '', description: '', icon: '' }); // Clear the form
      } else {
        setMessage('Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('An error occurred while adding the course.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Add a New Course</h2>
      <form onSubmit={handleAddCourse} className="bg-white p-6 shadow-md rounded">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="icon" className="block text-gray-700 font-bold mb-2">
            Icon URL
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={courseData.icon}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default AddCourses;
