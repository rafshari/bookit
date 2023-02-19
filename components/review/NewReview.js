import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewReview } from "redux/actions/bookingAction";
import { userCanReviewAction } from "redux/actions/roomAction";

export default function NewReview  () {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { userCanReview } = useSelector((state) => state.room);

  const handleSubmit = (e) => {
    const reviewData = {
      comment,
      rating,
      roomId: router.query.id,
    };
    dispatch(createNewReview(reviewData));
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("red");

            setRating(this.starValue);
          } else {
            star.classList.remove("red");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("light-red");
          } else {
            star.classList.remove("light-red");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("light-red");
        }
      });
    }
  }

  useEffect(() => {
    dispatch(userCanReviewAction(router.query.id));
  }, [router.query.id, dispatch]);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-between">
          {userCanReview && (
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4 mb-5"
              data-toggle="modal"
              data-target="#ratingModal"
              onClick={setUserRatings}
            >
              Submit Your Review
            </button>
          )}

          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="stars">
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>

                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    className="btn my-3 float-right review-btn px-4 text-white"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

