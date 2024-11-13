import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const Login = () => {
  const [loading, setLoading] = useState(false)  // For handling loading state

  const onFinish = async (values) => {
    const { email, password, remember } = values
    
    // Set the credentials to localStorage if "Remember me" is checked
    if (remember) {
      window.localStorage.setItem(
        'eduhub-remember-cred',
        JSON.stringify({ remember, email })
      )
    } else {
      window.localStorage.setItem('eduhub-remember-cred', JSON.stringify({ remember: false }))
    }

    // Set loading state
    setLoading(true)

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })

      // Handle successful login
      if (response.status === 200) {
        message.success('Login successful')
        // Redirect to dashboard or home page
        history.push('/dashboard')  // Replace '/dashboard' with the correct route
      }
    } catch (error) {
      // Handle failed login
      message.error(error.response?.data?.error || 'Login failed')
    } finally {
      // Reset loading state
      setLoading(false)
    }
  }

  const getInitialValues = () => {
    const savedCredentials = JSON.parse(window.localStorage.getItem('eduhub-remember-cred'))
    return savedCredentials ? savedCredentials : {}
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={getInitialValues()}
          scrollToFirstError
        >
          <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>

          <p className="text-center mb-4">
            New user? <Link to="/register" className="text-blue-500">Create Account</Link>
          </p>

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
            rules={[
              { required: true, message: 'Please input your password!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="py-2 px-4 rounded border border-gray-300 w-full"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              loading={loading}  // Show loading state
            >
              Login
            </Button>
          </Form.Item>

          {/* Uncomment below for Google login */}
          {/* <div className="text-center mt-4">
            <Divider plain>Or</Divider>
            <Button
              block
              icon={<GoogleOutlined />}
              className="w-full border border-gray-300 py-2 mt-2 text-gray-700"
            >
              Sign in with Google
            </Button>
          </div> */}
        </Form>
      </div>
    </div>
  )
}

export default Login
