
import { userInstance } from "../axios/axiosInstance"

//Get a single movie details
export const singleMovieDetails = (movieId) => {
    return userInstance.get(`/movie/moviedetails/${movieId}`);
};
  
//list all movies
export const listMovies = () => {
    return userInstance.get("/movie/listmovies")
}

//search movies
export const searchMovies = (search) => {
    return userInstance.get('/movie/searchmovie', { params: { search } })
}