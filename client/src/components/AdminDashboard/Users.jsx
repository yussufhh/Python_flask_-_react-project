import React, { useEffect, useState } from 'react';
import { Select, Table, message, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = async (userId, course) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/auth/update-course/${userId}`, {
        course,
      });
      message.success('Course updated successfully');
      fetchUsers(); // Refresh the users list
    } catch (error) {
      message.error('Failed to update course');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Course',
      key: 'course',
      render: (text, record) => (
        <Select
          defaultValue={record.course || 'Select a course'}
          onChange={(value) => handleCourseChange(record.id, value)}
          style={{ width: 200 }}
        >
          <Option value="HTML5">HTML5</Option>
          <Option value="CSS3">CSS3</Option>
          <Option value="JavaScript">JavaScript</Option>
          <Option value="Python">Python</Option>
          <Option value="Git">Git</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User List</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        bordered
      />
    </div>
  );
};

export default Users;
