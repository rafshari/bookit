import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import authReducer from './authReducer';
import { bookingReducer } from './bookingReducer';
const reducers = combineReducers({
    room: roomReducer,
    user: authReducer,
    booking: bookingReducer,
});

export default reducers;
