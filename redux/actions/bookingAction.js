import axios from 'axios';
import { BOOKED_DATES, CREATE_NEW_REVIEW, MY_BOOKIING_DETAILS, MY_BOOKINGS, ROOM_AVAILABILITY } from 'redux/constants/bookingConstant';

export const checkRoomAvailability = (room, checkInDate, checkOutDate) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ROOM_AVAILABILITY.pending });
            const { data } = await axios.get(`/api/bookings/check?room=${room}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
            dispatch({ type: ROOM_AVAILABILITY.success, payload: data.isAvailable });
        } catch (error) {
            dispatch({ type: ROOM_AVAILABILITY.failed, payload: error.response.data.message });
        }
    };
};

export const checkBookedDates = (roomId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: BOOKED_DATES.pending });
            const { data } = await axios.get(`/api/bookings/checkBookedDates?roomId=${roomId}`);
            dispatch({ type: BOOKED_DATES.success, payload: data.bookedDates });
        } catch (error) {
            dispatch({ type: BOOKED_DATES.failed, payload: error.response.data.message });
        }
    };
};

export const getMyBookings = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MY_BOOKINGS.pending });
            const { data } = await axios.get(`/api/bookings/me`);
            dispatch({ type: MY_BOOKINGS.success, payload: data.bookings });
        } catch (error) {
            dispatch({ type: MY_BOOKINGS.failed, payload: error.response.data.message });
        }
    };
};

export const getMyBookingDetail = (bookingId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MY_BOOKIING_DETAILS.pending });
            const { data } = await axios.get(`/api/bookings/${bookingId}`);
            dispatch({ type: MY_BOOKIING_DETAILS.success, payload: data.booking });
        } catch (error) {
            dispatch({ type: MY_BOOKIING_DETAILS.failed, payload: error.response.data.message });
        }
    };
};

export const createNewReview = (reviewData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: CREATE_NEW_REVIEW.pending});
            const {data} = await axios.post(`/api/reviews`, reviewData);
            dispatch({ type: CREATE_NEW_REVIEW.success, payload: data });
        } catch (error) {
            dispatch({ type: CREATE_NEW_REVIEW.failed, payload: error.response.data.message });
        }
    }
}
