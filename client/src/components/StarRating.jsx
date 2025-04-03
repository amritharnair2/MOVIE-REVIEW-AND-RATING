import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const validRating = Number(rating) || 0; // Ensure rating is a number

  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, index) =>
        index < validRating ? (
          <AiFillStar key={index} className="text-yellow-500 text-lg" />
        ) : (
          <AiOutlineStar key={index} className="text-gray-400 text-lg" />
        )
      )}
    </div>
  );
};

export default StarRating;
