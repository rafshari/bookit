const { getMiddlewareManifest } = require('next/dist/client/route-loader')
import {
  RESET_CHECK_BOOKING,
  ROOM_AVAILABILITY,
  BOOKED_DATES,
  MY_BOOKINGS,
  MY_BOOKING_DETAILS,
  CREATE_NEW_REVIEW,
  ALL_BOOKINGS,
  DELETE_BOOKING,
} from 'redux/constants/bookingConstant'

const initialState = {
  roomAvailability: false,
  loader: [],
  error: '',
  bookedDates: [],
  myBooking: [],
  myBookingDetails: {},
  bookings: [],
  deleteBooking: { loader: false, error: '', isDeleted: false },
}

const bookingReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case ROOM_AVAILABILITY.pending: {
      newState.loader = [...newState.loader, ROOM_AVAILABILITY.pending]
      return newState
    }

    case ROOM_AVAILABILITY.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== ROOM_AVAILABILITY.pending
      )
      newState.roomAvailability = action.payload
      return newState
    }

    case BOOKED_DATES.pending: {
      newState.loader = [...newState.loader, BOOKED_DATES.pending]
      return newState
    }

    case BOOKED_DATES.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== BOOKED_DATES.pending
      )
       newState.bookedDates = action.payload
       return newState
    }
    
    case MY_BOOKINGS.pending: {
      newState.loader = [...newState.loader, MY_BOOKINGS.pending]
      return newState
    }

    case MY_BOOKINGS.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKINGS.pending
      )
      newState.myBooking = action.payload
      return newState
    }

    case MY_BOOKINGS.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKINGS.pending
      )
      return newState
    }

    case MY_BOOKING_DETAILS.pending: {
      newState.loader = [...newState.loader, MY_BOOKING_DETAILS.pending]
      return newState
    }

    case MY_BOOKING_DETAILS.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKING_DETAILS.pending
      )
      newState.myBookingDetails = action.payload
      return newState
    }

    case MY_BOOKING_DETAILS.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== MY_BOOKING_DETAILS.pending
      )
      return newState
    }

    case RESET_CHECK_BOOKING: {
      newState.roomAvailability = null
      return newState
    }

    case CREATE_NEW_REVIEW.pending: {
      newState.loader = [...newState.loader, CREATE_NEW_REVIEW.pending]
      return newState
    }

    case CREATE_NEW_REVIEW.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== CREATE_NEW_REVIEW.pending
      )
      return newState
    }

    // ALL BOOKINGS
    case ALL_BOOKINGS.pending: {
      newState.loader = [...newState.loader, ALL_BOOKINGS.pending]
      return newState
    }

    case ALL_BOOKINGS.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== ALL_BOOKINGS.pending
      )
      newState.bookings = action.payload
      return newState
    }

    case ALL_BOOKINGS.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== ALL_BOOKINGS.pending
      )
      newState.error = action.payload
      return newState
    }
    // Delete Bookings
    case DELETE_BOOKING.pending: {
      newState.deleteBooking.loader = true
      return newState
    }

    case DELETE_BOOKING.success: {
      newState.deleteBooking.loader = false
      newState.deleteBooking.isDeleted = action.payload
      return newState
    }

    case DELETE_BOOKING.failed: {
      newState.deleteBooking.loader = false
       newState.deleteBooking.error = action.payload
        return newState
      }
    }
    return newState
}
export default bookingReducer
