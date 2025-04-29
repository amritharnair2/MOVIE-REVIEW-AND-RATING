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
    <header className="w-full bg-base-100 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link to="/admin" className="text-3xl font-bold">
            Flick<span className="text-red-600">Rate</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 items-center text-md font-semibold text-gray-400">
          <Link to="/admin" className="hover:underline">Movies</Link>
          <Link to="/admin/user" className="hover:underline">Users</Link>
          <Link to="/admin/review" className="hover:underline">Reviews</Link>
        </nav>

        {/* Admin Info and Logout */}
        <div className="flex items-center gap-3">
          <span className="text-md hidden sm:inline">Welcome Admin</span>
          <button onClick={handleLogout} className="cursor-pointer" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
