import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/reducers'

const bindMiddlware = (middlware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middlware))
    }

    return applyMiddleware(...middlware)
}

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    } else {
        return reducers(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddlware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)


// import {createWrapper} from 'next-redux-wrapper';
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import reducers from '../redux/reducers/reducers'

// // initial states here
// const initalState = {};

// // middleware
// const middleware = [thunk];

// // creating store
// export const store = createStore(
//   reducers,
//   initalState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// // assigning store to next wrapper
// const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);