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
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
    {
      movies && movies.map((movie, i) => (
        <Card key={i} movie={movie} />
      ))
    }
  </div>
  )
}

export default HomePage
