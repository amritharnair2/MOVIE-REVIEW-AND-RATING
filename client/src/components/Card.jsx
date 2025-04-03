import React from 'react'
import StarRating from "./StarRating";


function Card({movie}) {
  return (
    
      <div className="card px-4 card-side bg-base-100 shadow-sm grid grid-cols-1">
  <figure>
    <img
      src={movie.image}
      alt="Movie" className="w-full h-60 object-cover rounded-lg m-4 mx-auto"/>
  </figure>
 
  <div>
    <h1 className="card-title text-xl">{movie.name}</h1>
    <div className="flex justify-between pt-2">
  <p className='text-sm'>Language:</p>
  <p className="text-right text-sm">{movie.language}</p>
</div>

<div className="flex justify-between pt-2">
  <p className='text-sm'>Genre:</p>
  <p className="text-right text-sm">{movie.genre}</p>
</div>

<div className="flex justify-between items-center pt-2">
  <p className='text-sm'>Rating:</p>
  <StarRating rating={movie.rating} />
</div>

    <div className="card-actions my-3 justify-end">
      <button className="btn btn-sm btn-primary">View Details</button>
    </div>
</div>
  </div>
  )
}

export default Card
