const express = require("express");
const { addReview , getMovieReviews, updateReview, deleteReview, getUserReviews} = require("../../controllers/reviewController");
const authUser = require("../../middlewares/authUser");

const reviewRouter = express.Router();

reviewRouter.post("/addreview", authUser, addReview); // Add Review
reviewRouter.get("/getreview/:movieId", getMovieReviews); // Get Reviews by Movie
reviewRouter.get("/userreview/:userId",  getUserReviews); // Get Reviews by User
reviewRouter.put('/updatereview/:id', authUser, updateReview); // Update Review
reviewRouter.delete("/deletereview/:id", authUser, deleteReview); // Delete Review

module.exports = reviewRouter
