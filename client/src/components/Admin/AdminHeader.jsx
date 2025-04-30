import React from 'react'
import { persistor } from '../../redux/store'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from '../../redux/features/userSlice';
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    try {
      persistor.purge()
      localStorage.removeItem("admin-token");
      dispatch(clearUser())
      toast.success("Admin Logout successful!!!");
      navigate("/admin/login");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="w-full bg-base-100 shadow-sm px-4 py-3 m-0">
      <div className="w-full navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/admin">Movies</Link></li>
              <li><Link to="/admin/user">Users</Link></li>
              <li><Link to="/admin/review">Reviews</Link></li>
            </ul>
          </div>
          <Link to="/admin" className="text-3xl font-bold whitespace-nowrap">
            Flick<span className="text-red-600">Rate</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-gray-400">
            <li><Link to="/admin">Movies</Link></li>
            <li><Link to="/admin/user">Users</Link></li>
            <li><Link to="/admin/review">Reviews</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <span className="hidden sm:inline text-md">Welcome Admin</span>
          <button onClick={handleLogout} className="btn btn-ghost btn-circle" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

