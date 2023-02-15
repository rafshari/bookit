import { combineReducers } from 'redux';
import roomReducer from './roomReducer';

const reducers = combineReducers({
    room: roomReducer,

});

export default reducers;
