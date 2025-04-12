import React from "react";
import { useParams } from "react-router-dom";
import { singleMovieDetails } from "../services/MovieServices";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import { addReview, getMovieReviews } from "../services/ReviewServices";
import { toast } from "react-toastify";


const SingleMoviePage = () => {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const handleReviewSubmit = async ({ rating, review }) => {
    try {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      console.log(user)
      const userId = user?._id;
      const payload = {
        user: userId,
        movie: movieId,
        rating,
        review,
      };

      const fetchReviews = () => {
        getMovieReviews(movieId)
          .then((res) => setReviews(res.data))
          .catch((err) => console.error("Error fetching reviews:", err));
      };
  
      console.log("Sending payload:", payload);
      const res = await addReview(payload);
      setReviews((prev) => {
        if (!Array.isArray(prev)) return [res.data.review]; // Get the actual review object
        return [...prev, res.data.review]; // Add just the review object to the array
      });   
      toast.success("Review added!", { position: "top-center" });
      fetchReviews();
      setShowReviewForm(false);
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error("Failed to add review", { position: "top-center" });
    }
  };

  const hasUserReviewed = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    
    return reviews.some(review => 
      // Check if review.user is an object or string ID
      (typeof review.user === 'object' ? review.user._id === userId : review.user === userId)
    );
  };


  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = rating || 0;
    const emptyStars = totalStars - filledStars;
    
    // Create filled stars and empty stars
    const stars = [
      ...Array(filledStars).fill('★'), // Filled stars (yellow)
      ...Array(emptyStars).fill('☆')  // Empty stars (gray)
    ];

    return stars.map((star, idx) => (
      <span key={idx} className={star === '★' ? "text-yellow-500" : "text-gray-300"}>
        {star}
      </span>
    ));
  };
  

  useEffect(() => {
    if (!movieId) return;
  
    // Fetch movie details
    singleMovieDetails(movieId)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movie:", err));
  
    // Fetch movie reviews
    getMovieReviews(movieId)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [movieId]);
  



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
    return <div className="flex items-center justify-center h-screen"><span className="loading loading-spinner loading-3xl text-primary"></span>
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


      <div className="flex-1 grid grid-cols-[auto_1fr] gap-x-32 gap-y-1 text-sm sm:text-base">
        <p className="font-semibold">Language:</p>
        <p>{movie.language}</p>

        <p className="font-semibold">Genre:</p>
        <p>{movie.genre}</p>

        <p className="font-semibold">Release Date:</p>
        <p>{new Date(movie.releaseDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}</p>

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
  <hr className="my-4 border-black dark:border-white" />
  <div className="flex justify-between items-center mb-4">
  <span className="text-xl font-semibold">Reviews</span>
  {hasUserReviewed() ? (
    <button className="btn btn-disabled" title="You have already reviewed this movie">
      Already Reviewed
    </button>
  ) : (
    <button className="btn btn-primary" onClick={() => setShowReviewForm(true)}>
      Add Review
    </button>
  )}
</div>

{/* Review Modal */}
<ReviewForm
  show={showReviewForm}
  onClose={() => setShowReviewForm(false)}
  onSubmit={handleReviewSubmit}
/>






<div className="space-y-4">
  {reviews.length > 0 ? (
    reviews.map((rev, idx) => (
      <div key={idx} className="p-4 border rounded shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold">{rev?.user?.name || "User"}</span>
        </div>
        {typeof rev.rating === "number" && rev.rating > 0 && rev.rating <= 5 ? (
          <div className="text-yellow-500">{renderStars(rev.rating)}</div>
        ) : (
          <p>No rating yet</p>
        )}
        <div className="mt-2">{rev?.review}</div>
      </div>
    ))
  ) : (
    <p>No reviews yet. Be the first to leave a review!</p>
  )}
</div>









</div>
  );
};

export default SingleMoviePage;



