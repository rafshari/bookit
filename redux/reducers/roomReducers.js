import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  CLEAR_ERRORS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL, 
} from '../constants/roomConstants'

//All room reducer
export const allRoomsReducer = (state={ rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      }
    case ALL_ROOMS_FAIL:
      return {
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

// room detail reducer
export const roomsDetailsReducer = (state={ room: {} }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        room: action.payload,
      }
    case ALL_ROOMS_FAIL:
      return {
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}