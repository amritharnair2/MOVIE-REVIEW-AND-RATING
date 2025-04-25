import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../services/userServices'
import { toast } from 'react-toastify'
import { saveUser } from '../redux/features/userSlice'
import regImg from '../images/regimg.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignupPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    userSignup(values)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.userObject));
        const userData = localStorage.getItem('user');
        const user = JSON.parse(userData);
        console.log(user)
        localStorage.setItem("token", res.data.token)
        toast.success("User Signup successful!!!")
        dispatch(saveUser(res.data.userObject))
        navigate("/")
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: 'top-center'
        })
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${regImg})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl p-8 w-[400px] shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-1">
          Flick<span className="text-red-500">Rate</span>
        </h1>
        <p className="text-center text-sm mb-4">
          Share your thoughts on every movie
        </p>
        <h2 className="text-center text-lg font-semibold mb-4 underline">
          Register Your Account
        </h2>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm text-white">Name</span>
            </label>
            <input type="text" name='name' placeholder="Enter your name" className="input input-bordered w-full bg-white/80 text-black" onChange={handleChange} required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm text-white">Email</span>
            </label>
            <input type="email" name='email' placeholder="Enter your email" className="input input-bordered w-full bg-white/80 text-black" onChange={handleChange} required />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-sm text-white">Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/80 text-black pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-sm text-white">Confirm Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmpassword"
              placeholder="Confirm your password"
              className="input input-bordered w-full bg-white/80 text-black pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-black"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            <button className="btn bg-red-600 text-white w-full hover:bg-red-700">Register</button>
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
