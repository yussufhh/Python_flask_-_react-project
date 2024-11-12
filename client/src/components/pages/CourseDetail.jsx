// src/components/pages/CourseDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Course Detail: {id}</h1>
      <p>This page will contain detailed information about the selected course.</p>
    </div>
  );
};

export default CourseDetail;
