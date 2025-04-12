import React, { useEffect, useState } from 'react';
import { listMovies } from '../services/MovieServices';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listMovies()
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-start mb-5">
            <div className="relative w-full max-w-[700px]">
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
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zm-6 4a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <div
              key={movie?._id} 
              className="border border-gray-300 p-3 shadow-md dark:border-gray-700 cursor-pointer"  onClick={() => navigate(`/movie/${movie._id}`)}
            >
                <img
                  src={movie?.image}
                  alt="Movie"
                  className="w-full h-60 pb-3 rounded"
                />
                <h1 className="text-xl font-semibold">{movie?.name}  
                  <span> ({new Date(movie?.releaseDate).getFullYear()})</span>
                </h1>
                <hr className="my-2 border-black dark:border-white" />
                <div className="flex justify-between text-sm my-3">
                  <span>Language</span>
                  <span className="capitalize">{movie?.language}</span>
                </div>
                <div className="flex justify-between text-sm my-3">
                  <span>Genre</span>
                  <span className="capitalize">{movie?.genre}</span>
                </div>
                <div className="flex justify-between text-sm my-3">
                  <span>Rating</span>
                  <span>
                   <StarRating rating={movie?.rating} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;



