import React, { useState, useEffect } from "react";
import axios from "axios";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentSubmission, setStudentSubmission] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    // Fetch assignments
    axios
      .get("http://127.0.0.1:5001/api/assignments")
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      assignment_id: selectedAssignment.id,
      student_name: studentName,
      submission_content: studentSubmission,
    };

    axios
      .post("http://127.0.0.1:5001/api/submit-assignment", submissionData)
      .then((response) => {
        setSubmissionMessage(response.data.message);
        setSelectedAssignment(null);
        setStudentName("");
        setStudentSubmission("");
      })
      .catch((error) => {
        console.error("Error submitting assignment:", error);
        setSubmissionMessage("Error submitting assignment.");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Assignments</h2>

      {/* Assignments Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.title}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.description}</td>
              <td className="border border-gray-300 px-4 py-2">{assignment.due_date}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Do Assignment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assignment Submission Form */}
      {selectedAssignment && (
        <form
          onSubmit={handleAssignmentSubmit}
          className="mt-6 p-4 border rounded shadow-md bg-white"
        >
          <h3 className="text-xl font-bold mb-4">
            Completing: {selectedAssignment.title}
          </h3>

          <div className="mb-4">
            <label className="block font-medium">Student Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Your Answer</label>
            <textarea
              rows={5}
              value={studentSubmission}
              onChange={(e) => setStudentSubmission(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Assignment
          </button>
        </form>
      )}

      {submissionMessage && (
        <p className="mt-4 text-center text-green-500 font-bold">
          {submissionMessage}
        </p>
      )}
    </div>
  );
};

export default Assignment;
