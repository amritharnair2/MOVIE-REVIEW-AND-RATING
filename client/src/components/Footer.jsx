import React from 'react'

function Footer() {
  return (
    <div>
       <footer className="bg-gray-900 text-white w-full text-center p-4 mt-auto">
        <p>&copy; 2025 FlickRate. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
