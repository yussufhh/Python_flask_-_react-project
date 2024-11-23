import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
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
        setSignupMessage('Registration successful!');
        message.success('Signup successful, redirecting to login');
        navigate('/login');
      } else {
        setSignupMessage(data.error || 'Signup failed!');
        message.error(data.error || 'Signup failed!');
      }
    } catch (error) {
      setSignupMessage('An error occurred. Please try again later.');
      message.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <Form name="signup" onFinish={onFinish} layout="vertical" scrollToFirstError>
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <p className="text-center mb-4">
            Already have an account? <Link to="/login">Login</Link>
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

          {/* Dropdown for Course Selection */}
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

          {/* Dropdown for Gender Selection */}
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

          {/* Dropdown for County Selection */}
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
              {/* Add more counties as needed */}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Sign Up
            </Button>
          </Form.Item>

          {signupMessage && (
            <p
              className={`text-center ${
                signupMessage.includes('failed') ? 'text-red-500' : 'text-green-500'
              } mt-4`}
            >
              {signupMessage}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
