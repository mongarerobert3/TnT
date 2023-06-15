import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews data and update the reviews state
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="review-item">
          <div className="avatar">
            <img src={`/api/users/${review.user}/avatar`} alt="User Avatar" />
          </div>
          <div className="review-content">
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
