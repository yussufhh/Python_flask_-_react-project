import React, { useState } from "react";
import { Form, Input, Card, Button, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";

const Profile = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState("https://img.freepik.com/free-photo/dreamlike-surrealistic-landscape_23-2150525023.jpg?ga=GA1.1.324353260.1725517862&semt=ais_hybrid");

  // Handle form submission
  const handleSubmit = (values) => {
    // Assuming you will handle profile update here
    notificationsService.showNotification("Profile updated successfully!");
    console.log("Updated profile data:", values);
  };

  // Handle image upload (if needed)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <Meta
          avatar={
            <Avatar size={64} src={profileImage || "default-avatar.png"} />
          }
          title="Moon Lover" // Replace with dynamic user name
          description="Web Developer" // Replace with dynamic user role
        />
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            username: "Moon lover", // Replace with dynamic user data
            email: "moonlover88@gmail.com", // Replace with dynamic user email
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Profile Picture">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
