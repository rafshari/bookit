import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import RoomFeature from "./RoomFeature";
import DatePicker from "react-datepicker";
import axios from "axios";
import {
  checkBookedDates,
  checkRoomAvailability,
} from "redux/actions/bookingAction";
import { RESET_CHECK_BOOKING } from "redux/constants/bookingConstant";
import getStripe from "utils/getStripe";
import { toast } from "react-toastify";
import NewReview from "components/review/NewReview";
import ListReview from "components/review/ListReview";

export default function RoomDetail  ()  {
  const { roomDetail } = useSelector((state) => state.room);
  const { roomAvailabilty, bookedDates } = useSelector(
    (state) => state.booking
  );
  const { user } = useSelector((state) => state.user);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setdaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const excludedDates = bookedDates.map((dates) => new Date(dates));

  const handleDate = (dates) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    if (checkInDate && checkOutDate) {
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );
      setdaysOfStay(days);
      dispatch(
        checkRoomAvailability(router.query.id, checkInDate, checkOutDate)
      );
    }
  };

  const handleBooking = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`/api/bookings`, bookingData, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);
    const amount = pricePerNight * daysOfStay;
    try {
      const link = `/api/checkoutSession/${id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&daysOfStay=${daysOfStay}`;
      const { data } = await axios.get(link, {
        params: {
          amount,
        },
      });
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: data.id });
      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      console.log(error);
      toast.error("Payment failed");
    }
  };

  useEffect(() => {
    dispatch(checkBookedDates(router.query.id));
    return () => {
      dispatch({ type: RESET_CHECK_BOOKING });
    };
  }, [dispatch, router.query.id]);

  return (
    <>
      <Head>
        <title>{roomDetail.name} -bookit</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{roomDetail.name}</h2>
        <p>{roomDetail.address}</p>
        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(roomDetail.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({roomDetail.numOfReviews} Reviews)</span>
        </div>

        <Carousel>
          {roomDetail?.images?.map((image) => (
            <Carousel.Item key={image.public_id}>
              <div style={{ width: "100px", height: "440px" }}>
                <Image
                  className="m-auto display-block"
                  src={image.url}
                  alt={roomDetail.name}
                  layout="fill"
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{roomDetail.description}</p>

            <RoomFeature roomDetail={roomDetail} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${roomDetail.pricePerNight}</b> / night
              </p>
              <hr />
              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={handleDate}
                startDate={checkInDate}
                endDate={checkOutDate}
                selectsRange
                inline
                minDate={Date.now()}
                excludeDates={excludedDates}
              />
              {checkInDate && checkOutDate && (
                <>
                  {roomAvailabilty && (
                    <div className="alert alert-success my-3 font-weight-bold">
                      Room is available. Book now
                    </div>
                  )}
                  {!roomAvailabilty && (
                    <div className="alert alert-danger my-3 font-weight-bold">
                      Room is not available. Try different date.
                    </div>
                  )}
                  {roomAvailabilty && !Object.keys(user).length && (
                    <div className="alert alert-danger my-3 font-weight-bold">
                      Login to book room
                    </div>
                  )}
                  {roomAvailabilty && !!Object.keys(user).length && (
                    <button
                      className="btn btn-block py-3 booking-btn"
                      onClick={() =>
                        bookRoom(roomDetail._id, roomDetail.pricePerNight)
                      }
                      disabled={paymentLoading}
                    >
                      Pay - ${daysOfStay * roomDetail.pricePerNight}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <NewReview />
        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <ListReview reviews={roomDetail.reviews}/>
        </div>
      </div>
    </>
  );
};

