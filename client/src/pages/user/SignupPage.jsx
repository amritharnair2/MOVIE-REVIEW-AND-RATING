import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../../services/userServices'
import { toast } from 'react-toastify'
import { saveUser } from '../../redux/features/userSlice'


function SignupPage() {

  const [values, setValues] = useState ({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit =() => {
    userSignup(values).then((res) => {
      console.log(res)
      toast.success("Signup successful!!!"); 
      dispatch(saveUser(res.data.savedUser))
      navigate("/home")
    }).catch((err) => {
      console.log(err)
      toast.error(err.response.data.error, {
        position: 'top-center'
      })
    })
    console.log(values, "values")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="card w-[400px] bg-neutral shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center">
          Flick<span className="text-red-500">Rate</span>
        </h1>
        <p className="text-center text-sm mt-1">
          Share your thoughts on every movie
        </p>
        <div className="flex justify-center my-4">
          <img
            src="src\images\regimg.jpg" 
            alt="Movie Banner"
            className="rounded-lg w-full h-[150px] object-cover"
          />
        </div>
       <h2 className="text-center text-lg font-semibold mb-2">
          <p className="text-white-400 underline">
            Register Your Account
          </p>
        </h2>
        <fieldset className="fieldset">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name:</span>
          </label>
          <input type="text" placeholder="Enter your name" className="input input-bordered w-full bg-gray-200 text-black" name='name' required onChange={(e) => {
          setValues({...values, [e.target.name]: e.target.value})
        }} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email:</span>
          </label>
          <input type="email" placeholder="Enter your email" className="input input-bordered w-full bg-gray-200 text-black" name='email' required onChange={(e) => {
          setValues({...values, [e.target.name]: e.target.value})
        }} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password:</span>
          </label>
          <input type="password" placeholder="Enter your password" className="input input-bordered w-full bg-gray-200 text-black" name='password' required onChange={(e) => {
          setValues({...values, [e.target.name]: e.target.value})
        }} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Confirm Password:</span>
          </label>
          <input type="password" placeholder="Confirm your password" className="input input-bordered w-full bg-gray-200 text-black" name='confirmpassword' required onChange={(e) => {
          setValues({...values, [e.target.name]: e.target.value})
        }} />
        </div>
        <div className="flex justify-center mt-4">
          <button className="btn bg-red-600 text-white w-full hover:bg-red-700" onClick={onSubmit}>
            Register
          </button>
        </div>
        </fieldset>
        <p className="text-center mt-4">
          Already have an account? <Link to={"/login"} className='text-blue-400 underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
