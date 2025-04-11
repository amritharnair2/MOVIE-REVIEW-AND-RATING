import React from 'react'
import ThemeToggle from '../pages/ThemeToggle'
import { userLogout } from '../services/userServices'
import { persistor } from '../redux/store'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from '../redux/features/userSlice';
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    try {
      userLogout().then(() => {
            persistor.purge()
            localStorage.removeItem("token");
            dispatch(clearUser())
            toast.success("User Logout successful!!!"); 
            navigate("/login");
      })
    } catch (error) {
        console.log(error)
    }
  }
  

  return (
    <div>
        <div className="navbar bg-base-100 text-base-content w-full shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
    <h1 className="text-3xl font-bold">
           Flick<span className="text-red-600">Rate</span>
         </h1>
    </a>
  </div>
  <div className="flex gap-3">
  <ThemeToggle />
  <div className='flex items-center gap-2'>
  <span className='text-sm'>{user?.name}</span>
    <div className="dropdown dropdown-end">
      <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-8 rounded-full">
          <img
            alt="Img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSaWVN5ig-gqQzzBRyJDY6vBC_oDflVq-og&s" />
        </div>
      </div>
      <ul
        tabIndex="0"
        className="menu menu-sm bg-base-100 text-base-content dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between" onClick={() => navigate("/profile")}>
            Profile
          </a>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
        
  </div>


  </div>
</div>
    </div>
  )
}

export default Header
