import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
  return (
    <div>
        <div className="bg-black flex justify-center items-center min-h-screen">
      <div className="bg-black text-center text-white p-6 max-w-sm w-full">
        <h1 className="text-4xl font-bold">
          Flick<span className="text-red-600">Rate</span>
        </h1>
        <img
          src="src\images\disimg.jpg"
          alt="Stranger Things Poster"
          className="w-full h-80 rounded-lg mt-4"
        />
        <p className="mt-4 text-sm italic">
          Explore every film under the sun, leave your mark with a review, and
          help others find their next favorite.
        </p>
        <div className="mt-6 space-y-3">
          <button className="btn bg-red-600 text-white w-full hover:bg-red-700 text-lg" onClick={() => navigate("/signup")}> 
            Sign up
          </button>
          <button className="btn bg-red-600 text-white w-full hover:bg-red-700 text-lg" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LandingPage
