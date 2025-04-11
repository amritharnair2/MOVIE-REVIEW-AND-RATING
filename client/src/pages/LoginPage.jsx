import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { userLogin } from '../services/userServices'
import { saveUser } from '../redux/features/userSlice'

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = () => {
    userLogin(values)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        toast.success("Login successful!!!")
        dispatch(saveUser(res.data.userExist))
        navigate("/")
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: 'top-center'
        })
      })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('src/images/regimg.jpg')` }} // Make sure this path is correct
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Frosted glass card */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl p-8 w-96 shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-1">
          Flick<span className="text-red-500">Rate</span>
        </h1>
        <p className="text-center text-sm mb-4">
          Share your thoughts on every movie
        </p>
        {/* <div className="flex justify-center mb-4">
          <img
            src="src/images/regimg.jpg"
            alt="Movie Banner"
            className="rounded-lg w-full h-[150px] object-cover"
          />
        </div> */}
        <h2 className="text-center text-lg font-semibold mb-4 underline">
          Login To Your Account
        </h2>
        <fieldset className="space-y-4">
          <div>
            <label className="block text-sm">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="input input-bordered w-full bg-white/80 text-black"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/80 text-black"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <button
              className="btn bg-red-600 text-white w-full hover:bg-red-700"
              onClick={onSubmit}
            >
              Login
            </button>
          </div>
        </fieldset>
        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-400 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

