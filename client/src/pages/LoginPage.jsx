import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { userLogin } from '../services/userServices'
import { saveUser } from '../redux/features/userSlice'

function LoginPage() {
  const [values, setValues] = useState ({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onSubmit =() => {
      userLogin(values).then((res) => {
        console.log(res)
        localStorage.setItem("token", res.data.token)
        toast.success("Login successful!!!"); 
        dispatch(saveUser(res.data.userExist))
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
    <div>
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="card w-96 bg-neutral shadow-xl p-6">
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
            Login To Your Account
          </p>
        </h2>
        <fieldset className="fieldset">
        <div className="space-y-4">
          <div>
            <label className="block">Email:</label>
            <input
              type="email" placeholder="Enter your Email" name='email' 
              className="input input-bordered w-full bg-gray-200 text-black" required onChange={(e) => {
                setValues({...values, [e.target.name]: e.target.value})
              }}
            />
          </div>
          <div>
            <label className="block">Password:</label>
            <input
              type="password" placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-200 text-black" name='password' required onChange={(e) => {
                setValues({...values, [e.target.name]: e.target.value})
              }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="btn bg-red-600 text-white w-full hover:bg-red-700" onClick={onSubmit}>
            Login
          </button>
        </div>
        </fieldset>
        <p className="text-center mt-4">
          Don’t have an account? <Link to={"/signup"} className='text-blue-400 underline'>Signup</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
