const express = require("express");
const { addReview , getMovieReviews, updateReview, deleteReview, getUserReviews} = require("../../controllers/reviewController");

const reviewRouter = express.Router();

reviewRouter.post("/addreview",  addReview); // Add Review
reviewRouter.get("/getreview/:movieId", getMovieReviews); // Get Reviews by Movie
reviewRouter.get("/userreview/:userId",  getUserReviews); // Get Reviews by User
reviewRouter.put('/updatereview/:id', updateReview); // Update Review
reviewRouter.delete("/deletereview/:id", deleteReview); // Delete Review

module.exports = reviewRouter
