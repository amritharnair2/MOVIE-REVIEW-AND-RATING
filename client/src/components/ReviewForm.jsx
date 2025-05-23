import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ show, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false); 

  const handleSubmit = async () => {
    if (rating === 0 || !review.trim()) {
      alert("Please select a rating and write a review.");
      return;
    }

    if (submitting) return; 
    setSubmitting(true);

    try {
      await onSubmit({ rating, review });
      setRating(0);
      setReview("");
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add Review</h3>

        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => {
            const current = index + 1;
            return (
              <FaStar
                key={index}
                className="text-2xl cursor-pointer transition"
                color={current <= (hover || rating) ? "#facc15" : "#d1d5db"}
                onClick={() => setRating(current)}
                onMouseEnter={() => setHover(current)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="modal-action">
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewForm;



