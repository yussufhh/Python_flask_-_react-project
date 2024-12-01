import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Signup successful');
        navigate('/login');
      } else {
        message.error(data.error || 'Signup failed!');
      }
    } catch (error) {
      message.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg mt-10 mb-10">
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
          initialValues={{
            username: '',
            email: '',
            password: '',
            course: null,
            gender: null,
            county: null,
          }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Register For a Course</h2>

          <p className="text-center text-blue-700 mb-4 text-sm">
            Already have an account? <Link to="/login" className="underline">Login</Link>
          </p>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-Mail" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="course"
            label="Select a Course"
            rules={[{ required: true, message: 'Please select a course!' }]}
          >
            <Select placeholder="Choose a course">
              <Option value="HTML5">HTML5</Option>
              <Option value="CSS3">CSS3</Option>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="Python">Python</Option>
              <Option value="Git">Git</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Select Gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Choose gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="county"
            label="Select County"
            rules={[{ required: true, message: 'Please select your county!' }]}
          >
            <Select placeholder="Choose your county">
              <Option value="Nairobi">Nairobi</Option>
              <Option value="Mombasa">Mombasa</Option>
              <Option value="Kisumu">Kisumu</Option>
              <Option value="Garissa">Garissa</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
