import {
  ALL_ROOM,
  CHECK_USER_CAN_REVIEW,
  GET_ROOM,
} from "redux/constants/roomConstant";

const intialState = {
  roomList: [],
  loader: [],
  error: "",
  roomsCount: 0,
  filteredRoomsCount: 0,
  resPerPage: 4,
  roomDetail: {},
  userCanReview: false,
};

const roomReducer = (state = intialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case ALL_ROOM.pending:
      newState.loader = [...newState.loader, ALL_ROOM.pending];
      newState.error = "";
      return newState;

    case ALL_ROOM.success:
      newState.roomList = action.payload.rooms;
      newState.roomsCount = action.payload.count;
      newState.filteredRoomsCount = action.payload.filteredRoomCount;
      newState.resPerPage = action.payload.resPerPage;
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending);
      return newState;

    case ALL_ROOM.failed:
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending);
      newState.error = action.payload;
      return newState;

    case GET_ROOM.pending:
      newState.loader = [...newState.loader, GET_ROOM.pending];
      newState.error = "";
      return newState;

    case GET_ROOM.success:
      newState.loader = newState.loader.filter((el) => el !== GET_ROOM.pending);
      newState.roomDetail = action.payload.room;
      return newState;

    case GET_ROOM.failed:
      newState.loader = newState.loader.filter((el) => el !== ALL_ROOM.pending);
      newState.error = action.payload;
      return newState;

    case CHECK_USER_CAN_REVIEW.pending:
      newState.loader = [...newState.loader, CHECK_USER_CAN_REVIEW.pending];
      return newState;
    
    case CHECK_USER_CAN_REVIEW.success:
      newState.loader = newState.loader.filter(el => el !== CHECK_USER_CAN_REVIEW.pending);
      newState.userCanReview = action.payload;
  }
  return newState;
};

export default roomReducer;
