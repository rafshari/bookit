import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import authReducer from './authReducer';


const reducers = combineReducers({
    room: roomReducer,
    user: authReducer,


});

export default reducers;
