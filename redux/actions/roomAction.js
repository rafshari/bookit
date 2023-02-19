import {
  ALL_ROOM,
  CHECK_USER_CAN_REVIEW,
  GET_ROOM,
} from "../constants/roomConstant";
import axios from "axios";
import absoluteURL from "next-absolute-url";

export const getAllRoom = (
  req,
  currentPage,
  location,
  guestCapacity,
  category
) => {
  return async (dispatch, getState) => {
    dispatch({ type: ALL_ROOM.pending });
    try {
      const { origin } = absoluteURL(req);
      let baseURL = `${origin}/api/rooms?`;
      if (currentPage) {
        baseURL = baseURL + `page=${currentPage}&`;
      }
      if (location) {
        baseURL = baseURL + `location=${location}&`;
      }
      if (guestCapacity) {
        baseURL = baseURL + `guestCapacity=${guestCapacity}&`;
      }
      if (category) {
        baseURL = baseURL + `category=${category}`;
      }
      const response = await axios.get(baseURL);
      dispatch({ type: ALL_ROOM.success, payload: response.data });
    } catch (error) {
      dispatch({ type: ALL_ROOM.failed, payload: error.response.data.message });
    }
  };
};

export const getRoom = (req, id) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ROOM.pending });
    try {
      const { origin } = absoluteURL(req);
      const response = await axios.get(`${origin}/api/rooms/${id}`);
      dispatch({ type: GET_ROOM.success, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ROOM.failed, payload: error.response.data.message });
    }
  };
};

export const userCanReviewAction = (roomId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CHECK_USER_CAN_REVIEW.pending });
      const { data } = await axios.get(`/api/reviews/checkUserCanReview?roomId=${roomId}`);
      dispatch({
        type: CHECK_USER_CAN_REVIEW.success,
        payload: data.userCanReview,
      });
    } catch (error) {
      dispatch({
        type: CHECK_USER_CAN_REVIEW.failed,
        payload: error.response.data.message,
      });
    }
  };
};
