import React from "react";

export default function ListReview  ({ reviews = [] })  {
  return (
    <>
      {reviews?.map((review, index) => (
        <div className="review-card my-3" key={index}>
          <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
          </div>
          <p className="review_user">by {review.name}</p>
          <p className="review_comment">{review.comment}</p>

          <hr />
        </div>
      ))}
    </>
  );
};


