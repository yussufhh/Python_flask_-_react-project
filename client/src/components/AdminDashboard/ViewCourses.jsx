import React, { useEffect, useState } from 'react';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedData, setUpdatedData] = useState({ title: '', description: '', icon: '' });

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5300/api/featured-courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Handle delete course
  const deleteCourse = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5300/api/featured-courses/${id}`, { method: 'DELETE' });
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Handle update course
  const updateCourse = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5300/api/featured-courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const updatedCourse = await response.json();
      setCourses((prev) =>
        prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
      );
      setEditingCourse(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="border p-4 mb-4">
            {editingCourse?.id === course.id ? (
              <div>
                <input
                  type="text"
                  value={updatedData.title}
                  onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                  placeholder="Title"
                  className="border rounded p-2 w-full"
                />
                <input
                  type="text"
                  value={updatedData.description}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, description: e.target.value })
                  }
                  placeholder="Description"
                  className="border rounded p-2 w-full mt-2"
                />
                <input
                  type="text"
                  value={updatedData.icon}
                  onChange={(e) => setUpdatedData({ ...updatedData, icon: e.target.value })}
                  placeholder="Icon URL"
                  className="border rounded p-2 w-full mt-2"
                />
                <button
                  onClick={updateCourse}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p>{course.description}</p>
                <img src={course.icon} alt={course.title} />
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setUpdatedData({ title: course.title, description: course.description, icon: course.icon });
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCourses;
