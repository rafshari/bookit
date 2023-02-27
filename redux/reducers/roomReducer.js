import {
  ALL_ROOM,
  CHECK_USER_CAN_REVIEW,
  GET_ROOM,
  ALL_ROOM_ADMIN,
  NEW_ROOM,
  NEW_ROOM_RESET,
  UPDATE_ROOM,
  DELETE_ROOM,
  DELETE_ROOM_RESET,
  } from 'redux/constants/roomConstant'

const intialState = {
  roomList: [],
  loader: [],
  error: '',
  roomsCount: 0,
  filteredRoomsCount: 0,
  resPerPage: 4,
  roomDetail: {},
  userCanReview: false,
  success: false,
  roomUpdate:{loading:false, isUpdated: false, roomDetail:{}, error:''},
  roomDelete:{isDeleted: false, error:''}
}

const roomReducer = (state = intialState, action) => {
  const newState = { ...state }

  switch (action.type) {
    case ALL_ROOM.pending:
      newState.loader = [...newState.loader, ALL_ROOM.pending]
      newState.error = ''
      return newState

    case ALL_ROOM.success:
      newState.roomList = action.payload.rooms
      newState.roomsCount = action.payload.count
      newState.filteredRoomsCount = action.payload.filteredRoomCount
      newState.resPerPage = action.payload.resPerPage
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending)
      return newState

    case ALL_ROOM.failed:
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending)
      newState.error = action.payload
      return newState

    case ALL_ROOM_ADMIN.pending:
      newState.loader = [...newState.loader, ALL_ROOM.pending]
      newState.error = ''
      return newState

    case ALL_ROOM_ADMIN.success:
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending)
      newState.roomList = action.payload.rooms
      return newState

    case ALL_ROOM_ADMIN.failed:
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending)
      newState.error = action.payload
      return newState

    // GET ROOM
    case GET_ROOM.pending:
      newState.loader = [...newState.loader, GET_ROOM.pending]
      newState.error = ''
      return newState

    case GET_ROOM.success:
      newState.loader = newState.loader.filter((el) => el !== GET_ROOM.pending)
      newState.roomDetail = action.payload.room
      return newState

    case GET_ROOM.failed:
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending)
      newState.error = action.payload
      return newState

    case CHECK_USER_CAN_REVIEW.pending:
      newState.loader = [...newState.loader, CHECK_USER_CAN_REVIEW.pending]
      return newState

    case CHECK_USER_CAN_REVIEW.success:
      newState.loader = newState.loader.filter(
        (el) => el !== CHECK_USER_CAN_REVIEW.pending
      )
      newState.userCanReview = action.payload
      return newState

    //  NEW ROOM
    case NEW_ROOM.pending:
      newState.loader = [...newState.loader, NEW_ROOM.pending]
      newState.error = ''
      return newState

    case NEW_ROOM.success:
      newState.loader = newState.loader.filter((el) => el !== NEW_ROOM.pending)
      newState.success = action.payload
      return newState

    case NEW_ROOM.failed:
      newState.loader = newState.loader.filter((el) => el !== NEW_ROOM.pending)
      newState.error = action.payload
      return newState

    case NEW_ROOM_RESET:
      newState.success = false
      return newState

      //  UPDATE  ROOM
      case UPDATE_ROOM.pending:
        newState.roomUpdate.loading = true
        newState.roomUpdate.error = ''
        return newState
  
      case UPDATE_ROOM.success:
        newState.roomUpdate.loading = false
        newState.roomUpdate.roomDetail = action.payload.room
        newState.roomUpdate.isUpdated = action.payload.success
        return newState
  
      case UPDATE_ROOM.failed:
        newState.roomUpdate.loading = false
        newState.roomUpdate.error = action.payload
        return newState
  
      case UPDATE_ROOM.reset:
        newState.roomUpdate.isUpdated = false
        return newState

    //  DELETE ROOM
    case DELETE_ROOM.pending:
      newState.roomDelete.error = ''
      return newState

    case DELETE_ROOM.success:
      newState.roomDelete.isDeleted = action.payload
      return newState

    case DELETE_ROOM.failed:
      newState.roomDelete.error = action.payload
      return newState
      case DELETE_ROOM_RESET:
        newState.roomDelete.isDeleted = false
        return newState

}
  return newState
}

export default roomReducer
