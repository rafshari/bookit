import {
  ALL_ROOM,
  CHECK_USER_CAN_REVIEW,
  GET_ROOM,
  NEW_ROOM,
  ALL_ROOM_ADMIN,
  CLEAR_ERRORS,
  UPDATE_ROOM,
  DELETE_ROOM,
  GET_REVIEWS
} from '../constants/roomConstant'
import axios from 'axios'
import absoluteURL from 'next-absolute-url'

// Get all rooms by Guest
export const getAllRoom = (
  req,
  currentPage,
  location,
  guestCapacity,
  category
) => {
  return async (dispatch, getState) => {
    dispatch({ 
      type: ALL_ROOM.pending })
    try {
      const { origin } = absoluteURL(req)
      let baseURL = `${origin}/api/rooms?`
      if (currentPage) {
        baseURL = baseURL + `page=${currentPage}&`
      }
      if (location) {
        baseURL = baseURL + `location=${location}&`
      }
      if (guestCapacity) {
        baseURL = baseURL + `guestCapacity=${guestCapacity}&`
      }
      if (category) {
        baseURL = baseURL + `category=${category}`
      }

      const response = await axios.get(baseURL)
      
      dispatch({
         type: ALL_ROOM.success,
          payload: response.data })
    } catch (error) {
      dispatch({ 
        type: ALL_ROOM.failed,
        payload: error.response.data.message })
    }
  }
}

// Get room details Guest
export const getRoom = (req, id) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ROOM.pending })
    try {
      const { origin } = absoluteURL(req)
      const response = await axios.get(`${origin}/api/rooms/${id}`)

      dispatch({
        type: GET_ROOM.success,
        payload: response.data
       })

    } catch (error) {
      dispatch({
         type: GET_ROOM.failed,
          payload: error.response.data.message 
        })
    }
  }
}

// GET ALL ROOMS  admin
export const getAdminRooms = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ALL_ROOM_ADMIN.pending })
    try {
      const { data } = await axios.get('/api/admin/rooms')
      dispatch({ 
        type: ALL_ROOM_ADMIN.success, 
        payload: data 
      })
    } catch (error) {
      dispatch({
        type: ALL_ROOM_ADMIN.failed,
        payload: error.response.data.message,
      })
    }
  }
}
// CREATE NEW ROOM
export const newRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROOM.pending })
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.post(`/api/rooms`, roomData, config)
    //console.log('دوم:', response.data.success)
    dispatch({
      type: NEW_ROOM.success,
      payload: response.data.success,
    })
  } catch (error) {
    dispatch({
      type: NEW_ROOM.failed,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}
// UPDATE ROOM  ADMIN
export const updateRoom = (id, roomData) => async (dispatch) => {
  try {

      dispatch({ type: UPDATE_ROOM.pending })

      const config = {
          header: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)

      dispatch({
          type: UPDATE_ROOM.success,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: UPDATE_ROOM.failed,
          payload: error.response.data.message
      })
  }
}
// Delete a Room  admin
export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch({
       type: DELETE_ROOM.pending 
      })

    const { data } = await axios.delete(`/api/rooms/${id}`)

    dispatch({
      type: DELETE_ROOM.success,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ROOM.failed,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}
// CHECK if user can add review
export const userCanReviewAction = (roomId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CHECK_USER_CAN_REVIEW.pending })
      const { data } = await axios.get(
        `/api/reviews/checkUserCanReview?roomId=${roomId}`
      )
      dispatch({
        type: CHECK_USER_CAN_REVIEW.success,
        payload: data.userCanReview,
      })
    } catch (error) {
      dispatch({
        type: CHECK_USER_CAN_REVIEW.failed,
        payload: error.response.data.message,
      })
    }
  }
}

// GET REVIEWS
export const getRoomReviews = (id) => async (dispatch) => {
  try {
      dispatch({ type: GET_REVIEWS.pending })

      const { data } = await axios.get(`/api/reviews/?id=${id}`)

      dispatch({
          type: GET_REVIEWS.success,
          payload: data.reviews
      })

  } catch (error) {
      dispatch({
          type: GET_REVIEWS.failed,
          payload: error.response.data.message
      })
  }
}

// DELETE REVIEWS
export const deleteReview = (id, roomId) => async (dispatch) => {
  try {

      dispatch({ type: DELETE_REVIEW_REQUEST })

      const { data } = await axios.delete(`/api/reviews/?id=${id}&roomId=${roomId}`)

      dispatch({
          type: DELETE_REVIEW_SUCCESS,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: DELETE_REVIEW_FAIL,
          payload: error.response.data.message
      })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
