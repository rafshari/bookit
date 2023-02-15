import {
  ALL_ROOM,

} from '@/redux/constants/roomConstant'

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
  }
  return newState;

}

export default roomReducer
