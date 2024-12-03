import React, { useState, useEffect } from "react";
import axios from "axios";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || !selectedAssignment) {
      setMessage("Please select an assignment and provide an answer.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/submit-assignment", {
        assignment_id: selectedAssignment.id,
        answer,
      });
      setMessage(response.data.message);
      setAnswer("");
      setSelectedAssignment(null);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setMessage("Error submitting assignment. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assignments</h2>
      {isLoading ? (
        <p>Loading assignments...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Course</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="border border-gray-300 p-2">{assignment.title}</td>
                <td className="border border-gray-300 p-2">{assignment.description}</td>
                <td className="border border-gray-300 p-2">{assignment.due_date}</td>
                <td className="border border-gray-300 p-2">{assignment.course}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded"
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedAssignment && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-bold">
            Answer Assignment: {selectedAssignment.title}
          </h3>
          <div>
            <p className="mb-2 text-gray-700">
              <strong>Question:</strong> {selectedAssignment.description}
            </p>
            <label className="block font-medium mb-1">Your Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border rounded w-full p-2"
              rows="5"
              placeholder="Write your answer here..."
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit Assignment
          </button>
        </form>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Assignment;
