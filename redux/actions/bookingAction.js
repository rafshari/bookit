import axios from 'axios'
import {
  ALL_BOOKINGS,
  BOOKED_DATES,
  CREATE_NEW_REVIEW,
  DELETE_BOOKING,
  MY_BOOKING_DETAILS,
  MY_BOOKINGS,
  ROOM_AVAILABILITY,
  BOOKING_DETAILS_ADMIN,
} from 'redux/constants/bookingConstant'
import { CLEAR_ERRORS } from '../constants/roomConstant'

// check Room Availability
export const checkRoomAvailability = (room, checkInDate, checkOutDate) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ROOM_AVAILABILITY.pending })
      const { data } = await axios.get(
        `/api/bookings/check?room=${room}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      )
      dispatch({ type: ROOM_AVAILABILITY.success, payload: data.isAvailable })
    } catch (error) {
      dispatch({
        type: ROOM_AVAILABILITY.failed,
        payload: error.response.data.message,
      })
    }
  }
}

// check Booked Dates
export const checkBookedDates = (roomId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: BOOKED_DATES.pending })
      const { data } = await axios.get(
        `/api/bookings/checkBookedDates?roomId=${roomId}`
      )
      dispatch({ type: BOOKED_DATES.success, payload: data.bookedDates })
    } catch (error) {
      dispatch({
        type: BOOKED_DATES.failed,
        payload: error.response.data.message,
      })
    }
  }
}
// Get my Bookings list
export const getMyBookings = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: MY_BOOKINGS.pending })
      const { data } = await axios.get(`/api/bookings/me`)
      dispatch({ 
        type: MY_BOOKINGS.success,
        payload: data.bookings
       })
    } catch (error) {
      dispatch({
        type: MY_BOOKINGS.failed,
        payload: error.response.data.message,
      })
    }
  }
}
// get My Booking Detail
export const getMyBookingDetail = (bookingId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: MY_BOOKING_DETAILS.pending })
      const { data } = await axios.get(`/api/bookings/${bookingId}`)
      dispatch({ 
        type: MY_BOOKING_DETAILS.success,
         payload: data.booking 
        })
    } catch (error) {
      dispatch({
        type: MY_BOOKING_DETAILS.failed,
        payload: error.response.data.message,
      })
    }
  }
}
//get Booking Details admin
export const getBookingDetailsAdmin = ( req, id) => async (dispatch) => {
  try {
    dispatch({ type: BOOKING_DETAILS_ADMIN.pending })

      const { origin } = absoluteUrl(req);

     
      const { data } = await axios.get(`${origin}/api/admin/bookings/${id}`)

      dispatch({
          type: BOOKING_DETAILS_ADMIN.success,
          payload: data.booking
      })
  } catch (error) {
      dispatch({
          type: BOOKING_DETAILS_ADMIN.failed,
          payload: error.response?.data.message
      })
  }
}
// create New Review
export const createNewReview = (reviewData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_NEW_REVIEW.pending })
      const { data } = await axios.post(`/api/reviews`, reviewData)
      dispatch({ type: CREATE_NEW_REVIEW.success, payload: data })
    } catch (error) {
      dispatch({
        type: CREATE_NEW_REVIEW.failed,
        payload: error.response.data.message,
      })
    }
  }
}

// ALL BOOKINGS  Admin
export const getAdminBookings = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOKINGS.pending })

    const { data } = await axios.get(`/api/admin/bookings`)
    console.log('first:', data)

    dispatch({
      type: ALL_BOOKINGS.success,
      payload: data.bookings,
    })
  } catch (error) {
    dispatch({
      type: ALL_BOOKINGS.failed,
      payload: error.response.data.message,
    })
  }
}
// DELETE BOOKINGS
export const deleteBooking = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKING.pending })

    const { data } = await axios.delete(`/api/admin/bookings/${id}`)

    dispatch({
      type: DELETE_BOOKING.success,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING.failed,
      payload: error.response.data.message,
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
