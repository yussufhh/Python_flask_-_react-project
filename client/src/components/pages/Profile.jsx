import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profile_pic: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://127.0.0.1:4000/api/user/profile?user_id=1');
      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
      } else {
        console.error('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.profile_pic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Username */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{profile.username || 'Username'}</h2>
        </div>

        {/* Email */}
        <div className="text-center mb-6">
          <p className="text-gray-600">{profile.email || 'user@example.com'}</p>
        </div>

        {/* Profile Edit Button */}
        <div className="text-center">
          <Link to="/profile/edit">  {/* Updated Link */}
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
