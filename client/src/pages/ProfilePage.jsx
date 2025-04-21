import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  console.log(user)
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.profilepic}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border"
          />
          <div className="text-center md:text-left">
            <h2>
              Name: <span>{user.name}</span>
            </h2>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/editprofile')}
          className="bg-blue-600 btn-sm text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
