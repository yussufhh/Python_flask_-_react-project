import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

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
        setSignupMessage(data.message || 'Signup failed!');
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

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Sign Up
            </Button>
          </Form.Item>

          {signupMessage && (
            <p className={`text-center ${signupMessage.includes('failed') ? 'text-red-500' : 'text-green-500'} mt-4`}>
              {signupMessage}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
