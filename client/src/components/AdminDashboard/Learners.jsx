import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Learners = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/auth/users')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setFilteredUsers(data.users);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user =>
        user.username.toLowerCase().startsWith(query)
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sendEmail = (action, userEmail) => {
    const emailUrl = `http://127.0.0.1:5000/api/send-email`;
    const emailData = {
      email: userEmail,
      subject: action === 'accept' ? 'Your application has been accepted!' : 'Your application has been rejected!',
      body: action === 'accept' 
        ? 'Congratulations, your application has been accepted. Welcome aboard!' 
        : 'We regret to inform you that your application has been rejected.',
    };

    fetch(emailUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`${action} email sent successfully!`);
      })
      .catch((error) => {
        console.error(`${action} email sending failed`, error);
      });
  };

  const handleUserAction = (action, id, userEmail) => {
    const url = `http://127.0.0.1:5000/api/auth/users/${id}/${action}`;
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire('Success!', `User ${action}ed successfully!`, 'success');
        setUsers(data.users);
        setFilteredUsers(data.users);
        sendEmail(action, userEmail); // Send email notification
      })
      .catch((error) => {
        console.error(`${action} failed`, error);
        Swal.fire('Error!', `Error: ${action} failed`, 'error');
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://127.0.0.1:5000/api/auth/users/${id}`;
        fetch(url, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then(() => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
            setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.filter(user => user.id !== id));
          })
          .catch((error) => {
            console.error('Delete failed', error);
            Swal.fire('Error!', 'Error: Delete failed', 'error');
          });
      }
    });
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h1>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300">
        <table className="min-w-full bg-white table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-sm">
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Course</th>
              <th className="px-6 py-3 text-left">Gender</th>
              <th className="px-6 py-3 text-left">County</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.course}</td>
                <td className="px-6 py-3">{user.gender}</td>
                <td className="px-6 py-3">{user.county}</td>
                <td className="px-6 py-3">{user.status}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleUserAction('accept', user.id, user.email)}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    <FaCheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleUserAction('reject', user.id, user.email)}
                    className="text-red-500 hover:text-red-700 mr-2"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <nav>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-2 text-sm font-medium text-gray-700 border ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Learners;
