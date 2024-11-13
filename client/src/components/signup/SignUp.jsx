import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const SignUp = () => {
  const [signupMessage, setSignupMessage] = useState('');
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
        setSignupMessage('Successful registration!');
        navigate('/login'); // Redirect to login after successful signup
      } else {
        setSignupMessage(data.message || 'Signup failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupMessage('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <Form
          name="signup"
          onFinish={onFinish}
          scrollToFirstError
          layout="vertical"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <p className="text-center mb-4">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>

          {/* Username */}
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              className="py-2 px-4 rounded border border-gray-300 w-full"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="E-Mail"
              className="py-2 px-4 rounded border border-gray-300 w-full"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="py-2 px-4 rounded border border-gray-300 w-full"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>

          {/* Error or Success Message */}
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
