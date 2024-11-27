import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message, Upload } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send POST request to the Flask backend
      const response = await fetch('http://127.0.0.1:5002/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      setSignupMessage('Instructor registration successful!');
      message.success('Instructor sign-up successful');

      // Redirect to Instructor login page after successful signup
      navigate('/instructorlogin');
    } catch (error) {
      setSignupMessage('An error occurred. Please try again later.');
      message.error('Sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Updated Interactive Text */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
          Ready to inspire and educate the next generation? Join us as an instructor and start making an impact today!
        </p>
        <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
          Share your knowledge in your area of expertise and help students excel. Your journey begins here.
        </p>
        <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
          Already a member? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">Log in</Link> to get started.
        </p>
      </div>

      {/* Instructor Sign-Up Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          
          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-[#004d8d] text-center mb-8">Instructor Sign-Up</h2>
          
          {/* Sign-Up Form */}
          <Form name="signup" onFinish={onFinish} layout="vertical" scrollToFirstError>
            
            {/* Username Input */}
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Email Input */}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { type: 'email', message: 'The input is not a valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-Mail" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Gender Dropdown */}
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
            >
              <Select placeholder="Select gender" className="focus:ring-2 focus:ring-blue-500">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            {/* County Dropdown */}
            <Form.Item
              name="county"
              label="County"
              rules={[{ required: true, message: 'Please select your county!' }]}
            >
              <Select placeholder="Select county" className="focus:ring-2 focus:ring-blue-500">
                <Option value="Nairobi">Nairobi</Option>
                <Option value="Mombasa">Mombasa</Option>
                <Option value="Kisumu">Kisumu</Option>
                <Option value="Garissa">Garissa</Option>
              </Select>
            </Form.Item>

            {/* Specialization Input */}
            <Form.Item
              name="specialization"
              label="Specialization"
              rules={[{ required: true, message: 'Please input your area of specialization!' }]}
            >
              <Input placeholder="Your area of expertise" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Qualification Input */}
            <Form.Item
              name="qualification"
              label="Qualification"
              rules={[{ required: true, message: 'Please input your qualification!' }]}
            >
              <Input placeholder="Your highest qualification" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Experience Textarea */}
            <Form.Item name="experience" label="Experience">
              <Input.TextArea placeholder="Describe your teaching experience" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Profile Picture Upload */}
            <Form.Item
              name="profilePicture"
              label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={({ fileList }) => fileList}
            >
              <Upload
                name="profilePicture"
                action="/upload"
                listType="picture"
                accept="image/*"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} className="bg-blue-500 text-white hover:bg-blue-600">
                  Upload Profile Picture
                </Button>
              </Upload>
            </Form.Item>

            {/* Teaching Methodology Textarea */}
            <Form.Item
              name="methodology"
              label="Teaching Methodology"
            >
              <Input.TextArea placeholder="Describe your teaching methodology" className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Register as Instructor
              </Button>
            </Form.Item>

            {/* Sign-Up Message */}
            {signupMessage && (
              <p
                className={`text-center ${signupMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}
              >
                {signupMessage}
              </p>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
