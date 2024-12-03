import React, { useState } from "react";
import axios from "axios";

const AddAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/add-assignment", {
        title,
        description,
        due_date: dueDate,
        course,
      });

      setMessage(response.data.message); // Display success message
      setTitle(""); // Clear input fields
      setDescription("");
      setDueDate("");
      setCourse("");
    } catch (error) {
      console.error("Error adding assignment:", error);
      setMessage("Error adding assignment. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border rounded w-full p-2"
            required
          >
            <option value="" disabled>Select Course</option>
            <option value="HTML5">HTML5</option>
            <option value="CSS3">CSS3</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="Git">Git</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Assignment
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AddAssignment;
