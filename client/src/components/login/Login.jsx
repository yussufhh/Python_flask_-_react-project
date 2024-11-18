import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password, remember } = values;

    if (remember) {
      localStorage.setItem('eduhub-remember-cred', JSON.stringify({ remember, email }));
    } else {
      localStorage.removeItem('eduhub-remember-cred');
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data; // Extract token and role
        // Store the token and role in localStorage or other state management method
        localStorage.setItem('auth-token', token);
        localStorage.setItem('user-role', role);
        
        message.success('Login successful');
        navigate('/main');
      }
    } catch (error) {
      message.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const getInitialValues = () => {
    const savedCredentials = JSON.parse(localStorage.getItem('eduhub-remember-cred'));
    return savedCredentials ? savedCredentials : {};
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <Form name="login" onFinish={onFinish} initialValues={getInitialValues()} scrollToFirstError>
          <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>

          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-Mail" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Login
            </Button>
            <p className="text-center mt-4">
              New user? <Link to="/signup">Create Account</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
