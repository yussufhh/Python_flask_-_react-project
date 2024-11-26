import React, { useState } from 'react';

const AddCourses = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    icon: '',
    content: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!courseData.title || !courseData.description || !courseData.icon || !courseData.content) {
      setMessage({ text: 'All fields are required!', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5300/api/featured-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        setMessage({ text: 'Course added successfully!', type: 'success' });
        setCourseData({ title: '', description: '', icon: '', content: '' }); // Clear the form
      } else {
        setMessage({ text: 'Failed to add course. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage({ text: 'An error occurred while adding the course.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Course</h2>
      <form
        onSubmit={handleAddCourse}
        className="bg-white p-6 shadow-md rounded max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            className="border rounded p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="border rounded p-3 w-full h-24 focus:outline-none focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="icon" className="block text-gray-700 font-semibold mb-2">
            Icon URL
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={courseData.icon}
            onChange={handleInputChange}
            className="border rounded p-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={courseData.content}
            onChange={handleInputChange}
            className="border rounded p-3 w-full h-32 focus:outline-none focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full"
          disabled={loading}
        >
          {loading ? 'Adding Course...' : 'Add Course'}
        </button>
      </form>

      {message.text && (
        <p
          className={`mt-4 text-center px-4 py-2 rounded ${
            message.type === 'success'
              ? 'text-green-700 bg-green-100'
              : 'text-red-700 bg-red-100'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AddCourses;
