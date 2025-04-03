import React from 'react'
import ThemeToggle from './ThemeToggle'

function Header() {
  return (
    <div>
        <div className="navbar bg-gray-900 w-full text-white shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">
    <h1 className="text-3xl font-bold">
           Flick<span className="text-red-600">Rate</span>
         </h1>
    </a>
  </div>
  <div className="flex gap-2">
  <ThemeToggle />
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
        className="menu menu-sm text-black dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Header
