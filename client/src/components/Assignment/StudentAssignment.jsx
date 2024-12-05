import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentAssignment = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch submitted assignments
    axios
      .get("http://127.0.0.1:5001/api/submitted-assignments")
      .then((response) => setSubmissions(response.data))
      .catch((error) => console.error("Error fetching submissions:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Submitted Assignments</h2>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Assignment</th>
            <th className="border border-gray-300 px-4 py-2">Submission</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{submission.student_name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {submission.assignment_title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {submission.submission_content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAssignment;
