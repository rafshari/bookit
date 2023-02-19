const { getMiddlewareManifest } = require("next/dist/client/route-loader");
const {
  RESET_CHECK_BOOKING,
  ROOM_AVAILABILITY,
  BOOKED_DATES,
  MY_BOOKINGS,
  MY_BOOKIING_DETAILS,
  CREATE_NEW_REVIEW,
} = require("redux/constants/bookingConstant");

const intialState = {
  roomAvailabilty: false,
  loader: [],
  error: "",
  bookedDates: [],
  myBooking: [],
  myBookingDetails: {},
};

export const bookingReducer = (state = intialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ROOM_AVAILABILITY.pending: {
      newState.loader = [...newState.loader, ROOM_AVAILABILITY.pending];
      return newState;
    }

    case ROOM_AVAILABILITY.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== ROOM_AVAILABILITY.pending
      );
      newState.roomAvailabilty = action.payload;
    }

    case BOOKED_DATES.pending: {
      newState.loader = [...newState.loader, BOOKED_DATES.pending];
      return newState;
    }

    case BOOKED_DATES.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== BOOKED_DATES.pending
      );
      newState.bookedDates = action.payload;
    }

    case MY_BOOKINGS.pending: {
      newState.loader = [...newState.loader, MY_BOOKINGS.pending];
      return newState;
    }

    case MY_BOOKINGS.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKINGS.pending
      );
      newState.myBooking = action.payload;
      return newState;
    }

    case MY_BOOKINGS.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKINGS.pending
      );
      return newState;
    }

    case MY_BOOKIING_DETAILS.pending: {
      newState.loader = [...newState.loader, MY_BOOKIING_DETAILS.pending];
      return newState;
    }

    case MY_BOOKIING_DETAILS.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKIING_DETAILS.pending
      );
      newState.myBookingDetails = action.payload;
      return newState;
    }

    case MY_BOOKIING_DETAILS.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKIING_DETAILS.pending
      );
      return newState;
    }

    case RESET_CHECK_BOOKING: {
      newState.roomAvailabilty = null;
      return newState;
    }

    case CREATE_NEW_REVIEW.pending: {
      newState.loader = [...newState.loader, CREATE_NEW_REVIEW.pending];
      return newState;
    }

    case CREATE_NEW_REVIEW.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== CREATE_NEW_REVIEW.pending
      );
      return newState;
    }
  }
  return newState;
};
