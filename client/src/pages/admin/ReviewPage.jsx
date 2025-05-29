import React, { useEffect, useState } from 'react';
import { listReviews } from '../../services/AdminServices';
import StarRating from '../../components/StarRating';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ Added loading state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await listReviews();
        const reviewsAsc = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(reviewsAsc);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const time = date.toTimeString().split(" ")[0];
    return `${formattedDate}, ${time}`;
  };

  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold">Reviews</h2>
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block w-6 h-6 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full text-left border border-black mt-5">
            <thead className="bg-gray-400 text-black font-bold">
              <tr>
                <th className="p-2 border border-black">User</th>
                <th className="p-2 border border-black">Movie</th>
                <th className="p-2 border border-black">Review</th>
                <th className="p-2 border border-black">Rating</th>
                <th className="p-2 border border-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="bg-white border border-black">
                  <td className="p-2 border border-black text-black">{review?.user?.name || 'Unknown User'}</td>
                  <td className="p-2 border border-black text-black">{review?.movie?.name || 'Unknown Movie'}</td>
                  <td className="p-2 border border-black text-black">{review.review}</td>
                  <td className="p-2 border border-black text-black">
                    <StarRating rating={review.rating} />
                  </td>
                  <td className="p-2 border border-black text-black">{formatDate(review.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminReviewsPage;


