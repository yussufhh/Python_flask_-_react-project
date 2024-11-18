import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const EditProfile = () => {
  const [userData, setUserData] = useState({ username: "", email: "", profile_pic: "" });
  const [previewPic, setPreviewPic] = useState("");
  const [file, setFile] = useState(null); // State to hold the selected file
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile?user_id=1");
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setPreviewPic(data.profile_pic || "");
        } else {
          notification.error({ message: "Failed to load user data" });
        }
      } catch (error) {
        notification.error({ message: "An error occurred while fetching user data" });
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes (username, email)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewPic(imageUrl);
      setFile(selectedFile); // Save the selected file for upload
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for sending data to the backend
    const formData = new FormData();
    formData.append("user_id", 1); // Assuming user_id is 1 for this example
    formData.append("username", userData.username);
    formData.append("email", userData.email);

    // Add profile picture if selected
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        notification.success({ message: "Profile updated successfully!" });
        navigate("/profile");
      } else {
        const data = await response.json();
        notification.error({ message: data.error || "Failed to update profile" });
      }
    } catch (error) {
      notification.error({ message: "An error occurred while updating profile" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full p-2 border rounded mb-4"
        />
        {previewPic ? (
          <img src={previewPic} alt="Preview" className="w-32 h-32 rounded-full mb-4" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
