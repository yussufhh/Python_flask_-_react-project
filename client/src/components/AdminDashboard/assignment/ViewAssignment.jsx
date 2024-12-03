import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/assignments");
        setAssignments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">View Assignments</h2>
      {isLoading ? (
        <p>Loading assignments...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="border border-gray-300 p-2">{assignment.title}</td>
                <td className="border border-gray-300 p-2">{assignment.description}</td>
                <td className="border border-gray-300 p-2">{assignment.due_date}</td>
                <td className="border border-gray-300 p-2">{assignment.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAssignment;
