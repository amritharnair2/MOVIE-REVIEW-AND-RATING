import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { userLogin } from '../services/userServices';
import { saveUser } from '../redux/features/userSlice';
import regImg from '../images/regimg.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    userLogin(values).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.userObject));
      localStorage.setItem('token', res.data.token);
      dispatch(saveUser(res.data.userObject));
      toast.success("User Login successful!!!");
      navigate("/");
    }).catch((err) => {
      toast.error(err.response?.data?.error || 'Login failed', {
        position: 'top-center'
      });
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${regImg})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl p-8 w-96 shadow-2xl m-5">
        <h1 className="text-4xl font-bold text-center mb-1">
          Flick<span className="text-red-500">Rate</span>
        </h1>
        <p className="text-center text-sm mb-4">
          Share your thoughts on every movie
        </p>
        <h2 className="text-center text-lg font-semibold mb-4 underline">
          Login To Your Account
        </h2>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/80 text-black"
              onChange={handleChange}
              required
            />
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
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div>
            <button className="btn bg-red-600 text-white w-full hover:bg-red-700">Login</button>
          </div>
        </form>
        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-400 underline">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

