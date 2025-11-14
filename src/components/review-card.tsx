import React, { useState } from 'react';

interface ReviewCardProps {
  name: string;
  title: string;
  review: string;
  rating: number;
  date: string;
  avatarUrl?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name = "Kiara Advain",
  title = "CEO OF EMPIRO",
  review = "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s --",
  rating = 4,
  date = "2 days ago",
  avatarUrl = "/placeholder.svg?height=48&width=48"
}) => {
  const [showFullReview, setShowFullReview] = useState(false);

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden min-h-[220px] max-h-[220px]">
      <div className="p-6 h-full flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-start space-x-4">
            <img
              src={avatarUrl}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="pl-[10px]">
              <h3 className="font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600 pl-[5px]">{title}</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            {showFullReview ? review : `${review.slice(0, 100)}...`}
            {review.length > 100 && (
              <span
                onClick={() => setShowFullReview(!showFullReview)}
                className="text-blue-500 cursor-pointer ml-2"
              >
                {showFullReview ? "Show Less" : "Read More"}
              </span>
            )}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Rating:</span>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
