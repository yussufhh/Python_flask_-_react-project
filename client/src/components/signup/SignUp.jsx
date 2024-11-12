import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const SignUp = () => {
  const [signupMessage, setSignupMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setSignupMessage('Successful registration!');
      navigate('/login'); // Redirect to login after successful signup
    } else {
      const errorData = await response.json();
      setSignupMessage(errorData.message || 'Signup failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <Form
          name="signup"
          onFinish={onFinish}
          scrollToFirstError
        >
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <p className="text-center mb-4">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              className="py-2 px-4 rounded border border-gray-300 w-full"
            />
          </Form.Item>

          <Form.Item
            name="email"
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="py-2 px-4 rounded border border-gray-300 w-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </Button>
          </Form.Item>

          {signupMessage && (
            <p className="text-center text-red-500 mt-4">{signupMessage}</p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
