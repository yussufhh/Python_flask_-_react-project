import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentAssignment = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/submissions");
        setSubmittedAssignments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching submitted assignments:", error);
        setError("Failed to load submitted assignments. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchSubmittedAssignments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Submitted Assignments</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading submitted assignments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : submittedAssignments.length === 0 ? (
        <p className="text-gray-500">No submitted assignments available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-4">Assignment ID</th>
              <th className="border border-gray-300 p-4">Student Name</th>
              <th className="border border-gray-300 p-4">File</th>
              <th className="border border-gray-300 p-4">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-4">{submission.assignment_id}</td>
                <td className="border border-gray-300 p-4">{submission.student_name || "N/A"}</td>
                <td className="border border-gray-300 p-4">
                  {submission.file_url ? (
                    <a
                      href={submission.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View File
                    </a>
                  ) : (
                    "No file available"
                  )}
                </td>
                <td className="border border-gray-300 p-4">
                  {new Date(submission.submission_date).toLocaleDateString() || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentAssignment;
