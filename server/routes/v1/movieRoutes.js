const { addMovie, listMovies, movieDetails, updateMovie, deleteMovie } = require('../../controllers/movieController')
const authAdmin = require('../../middlewares/authAdmin')

const movieRouter = require('express').Router()
const upload = require('../../middlewares/multer')

movieRouter.post("/create", upload.single("image"), authAdmin, addMovie) //add a movie
movieRouter.get("/listmovies", listMovies) //list all movies
movieRouter.get("/moviedetails/:movieId", movieDetails) //List details of a specific movie
movieRouter.put("/updatemovie/:movieId", upload.single("image"), authAdmin, updateMovie) //update a movie details
movieRouter.delete("/deletemovie/:movieId", authAdmin , deleteMovie) //delete a movie

module.exports = movieRouter