import React, { useState, useEffect } from "react";
import { notification } from "antd";

const Profile = () => {
  const [userData, setUserData] = useState({ username: "", email: "", profile_pic: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile?user_id=1");
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          notification.error({ message: data.error || "Error fetching profile" });
        }
      } catch (error) {
        notification.error({ message: "An error occurred while fetching profile" });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4">
        <img
          src={userData.profile_pic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
      </div>
      <p className="mb-2">Username: {userData.username || "N/A"}</p>
      <p className="mb-2">Email: {userData.email || "N/A"}</p>
    </div>
  );
};

export default Profile;
