import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

const Login = () => {
  const onFinish = (values) => {
    if (values.remember) {
      window.localStorage.setItem(
        'eduhub-remember-cred',
        JSON.stringify({ remember: values.remember, email: values.email })
      )
    } else {
      window.localStorage.setItem(
        'eduhub-remember-cred',
        JSON.stringify({ remember: false })
      )
    }
    // Dispatch login action here if needed
  }

  const getInitialValues = () => {
    return JSON.parse(window.localStorage.getItem('eduhub-remember-cred'))
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
            {/* <Link to="/ForgetPassword" className="text-blue-500">Forgot Password?</Link> */}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
