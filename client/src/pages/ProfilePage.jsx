import React from 'react'
import { useSelector } from 'react-redux';

function ProfilePage() {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
        <div className="w-40 rounded-full">
          <img
            alt="Img"
            src={user.profilepic} />
        </div>
      <h1 className='pt-4'>Name: <span className='text-sm'>{user.name}</span>
      </h1>
      <h1>Email: <span className='text-sm'>{user.email}</span>
      </h1>
    </div>
  )
}

export default ProfilePage
