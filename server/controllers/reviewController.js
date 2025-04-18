const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const movieDb = require("../models/movieModel");

//Add a new Review
const addReview = async (req, res) => {
    try {
      const { user, movie, rating, review } = req.body;
      if (!user || !movie || !rating || !review) {
        return res.status(400).json({error: "All fields are required"})
      }
      const newReview = new Review({ user, movie, rating, review });
      await newReview.save();

      // res.status(201).json({message: "Review added successfully",newReview});

      // const newReview = new Review(req.body);
      // await newReview.save();
      const avgRating = await Review.aggregate([
        {
          $match: { movie: movie }
        },
        {
          $group: {
            _id: "$movie",
            avgRating: { $avg: "$rating" }
          },
        },
      ]);
      const avgRatingValue = avgRating[0]?.avgRating || 0
      await movieDb.findByIdAndUpdate(req.body.movie, {
        rating: avgRatingValue
      })
      res.status(201).json({message: "Review added successfully", review: newReview});
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  }
  
//Get Reviews of a specific movie
const getMovieReviews = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ error: "Invalid movie ID" });
        }
        const reviews = await Review.find({ movie: movieId })
            .populate("user", "name email") 
            .sort({ createdAt: -1 }); 
            return res.status(200).json(reviews);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
};

//Get Reviews by a Specific User
const getUserReviews = async (req, res) => {
    try {
      const userId = req.params.userId; 
      if (!userId) {
        return res.status(400).json({message: "User ID is required in URL params.",
        });
      }
      const userReviews = await Review.find({ user: userId }).populate('movie', 'title'); 
  
      if (!userReviews || userReviews.length === 0) {
        return res.status(404).json({message: "No reviews found for this user."});
      }
  
      return res.status(200).json({reviews: userReviews});
  
    } catch (error) {
      return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };

//Update a review
const updateReview = async (req, res) => {
    try {
      const reviewId = req.params.id; 
      if (!reviewId) {
        return res.status(400).json({error: "Review ID is required in URL params."});
      }
      const { rating, review } = req.body;
      const updatedReview = await Review.findByIdAndUpdate(reviewId,
        { rating, review },
        { new: true, runValidators: true }
      );
  
      if (!updatedReview) {
        return res.status(404).json({error: "Review not found."});
      }
  
      return res.status(200).json({message: "Review updated successfully",review: updatedReview});
  
    } catch (error) {
      return  res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };

//Delete a review
const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id; 
      if (!reviewId) {
        return res.status(400).json({error: "Review ID is required in URL params."});
      }
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({error: "Review not found."});
      }
  
      return res.status(200).json({message: "Review deleted successfully."});
  
    } catch (error) {
      return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };
  

module.exports = {
    addReview,
    getMovieReviews,
    getUserReviews,
    updateReview,
    deleteReview
};
