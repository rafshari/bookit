import { combineReducers } from 'redux'
import { allRoomsReducer, roomsDetailsReducer } from './roomReducers'

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomsDetails: roomsDetailsReducer,
})

export default reducer
