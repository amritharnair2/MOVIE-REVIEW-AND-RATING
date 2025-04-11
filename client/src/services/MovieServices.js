
import { userInstance } from "../axios/axiosInstance"

export const singleMovieDetails = (movieId) => {
    return userInstance.get(`/movie/moviedetails/${movieId}`);
};
  
export const listMovies = () => {
    return userInstance.get("/movie/listmovies")
}