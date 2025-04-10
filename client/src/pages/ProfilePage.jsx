import React from 'react'
import { useSelector } from 'react-redux';

function ProfilePage() {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className="btn btn-ghost btn-circle avatar">
        <div className="w-44 rounded-full">
          <img
            alt="Img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSaWVN5ig-gqQzzBRyJDY6vBC_oDflVq-og&s" />
        </div>
      </div>
      <h1 className='pt-4'>Name: <span className='text-sm'>{user.name}</span>
      </h1>
      <h1>Email: <span className='text-sm'>{user.email}</span>
      </h1>
    </div>
  )
}

export default ProfilePage
