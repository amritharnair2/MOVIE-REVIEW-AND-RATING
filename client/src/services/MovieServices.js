import { axiosInstance } from "../axios/axiosInstance";

export const singleMovieDetails = (movieId) => {
    return axiosInstance.get(`/movie/moviedetails/${movieId}`);
};
  
export const listMovies = () => {
    return axiosInstance.get("/movie/listmovies")
}