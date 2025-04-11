import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleMovieDetails } from "../services/MovieServices";


const SingleMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    singleMovieDetails(movieId)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
      });
  }, [movieId]);

  if (!movie) {
    return <div className="text-white p-8"><span className="loading loading-spinner loading-3xl text-primary"></span>
</div>;
  }

  return (
    <div>
  <div className="max-w-5x">
    <h2 className="text-3xl font-bold mb-6">{movie.name}</h2>

    <div className="flex flex-col md:flex-row gap-10">
  
      <img
        src={movie.image}
        alt={movie.name}
        className="w-full md:w-1/3 h-auto object-cover"
      />


      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm sm:text-base">
        <p className="font-semibold">Language:</p>
        <p>{movie.language}</p>

        <p className="font-semibold">Genre:</p>
        <p>{movie.genre}</p>

        <p className="font-semibold">Release Date:</p>
        <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>

        <p className="font-semibold">Director:</p>
        <p>{movie.director}</p>

        <p className="font-semibold">Hero:</p>
        <p>{movie.hero}</p>

        <p className="font-semibold">Heroine:</p>
        <p>{movie.heroine}</p>
      </div>
    </div>

    {movie.plot && (
      <p className="mt-6 leading-relaxed">{movie.plot}</p>
    )}
  </div>
</div>
  );
};

export default SingleMoviePage;


