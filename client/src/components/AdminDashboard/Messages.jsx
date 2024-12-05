import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const Messages = () => {
  const [users, setUsers] = useState([]); // State to store fetched users
  const [error, setError] = useState(""); // State to handle errors
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    const fetchUsers = async () => {
      // Show SweetAlert2 loading spinner
      Swal.fire({
        title: "Loading...",
        text: "Fetching data, please wait.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await fetch("http://127.0.0.1:5400/api/contact");
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        Swal.fire("Error", err.message, "error"); // Display error notification
      } finally {
        Swal.close(); // Close SweetAlert2 spinner
      }
    };

    fetchUsers();
  }, []);

  // Calculate paginated users
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const paginatedUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">New Messages</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg mb-4">
        <table className="table-auto w-full text-left bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">#</th>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-sm font-semibold">Message</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200`}
              >
                <td className="px-6 py-3 text-sm text-gray-800">
                  {indexOfFirstUser + index + 1}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">{user.user_name}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{user.user_email}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{user.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
          (_, pageIndex) => (
            <button
              key={pageIndex + 1}
              onClick={() => handlePageChange(pageIndex + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === pageIndex + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-500 hover:text-white`}
            >
              {pageIndex + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Messages;
