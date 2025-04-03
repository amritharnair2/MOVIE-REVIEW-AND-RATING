import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { listMovies } from '../../services/userServices'

function HomePage() {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        listMovies().then((res) => {
            console.log(res)
            setMovies(res.data)
        }).catch((err) =>{
            console.log(err)
        })
    }, [])
  return (
    <div>      
   
  <div className="relative w-[700px] mb-5">
    <input 
      type="text" 
      placeholder="Search Movie" 
      className="input input-bordered w-full pr-12 text-lg"
    />
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 cursor-pointer"
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zm-6 4a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  </div>



        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
    {
      movies && movies.map((movie, i) => (
        <Card key={i} movie={movie} />
      ))
    }
  </div>
    </div>
    
  )
}

export default HomePage
