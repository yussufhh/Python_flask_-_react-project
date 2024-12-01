import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseContent = () => {
  const { id } = useParams();  // Get the course ID from URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/courses/${id}`)  // Fetch specific course content
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="flex mb-4">
        <img src={course.icon} alt={course.title} className="w-16 h-16 mr-4" />
        <p className="text-lg">{course.description}</p>
      </div>
      <div className="course-content">
        {/* Render the course content */}
        <div dangerouslySetInnerHTML={{ __html: course.content }} />
      </div>
    </div>
  );
};

export default CourseContent;
