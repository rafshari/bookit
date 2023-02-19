import { FORGOT_PASSWORD, GET_USER, REGISTER_USER, RESET_PASSWORD, UPDATE_USER } from 'redux/constants/authConstant';

const intialState = {
    success: {},
    loader: [],
    error: '',
    user: {},
    isAuthenticated: false,
    updateUser: false,
    forgotPasswordMessage: '',
    resetPasswordMessage: '',
};

const authReducer = (state = intialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case REGISTER_USER.pending: {
            newState.loader = [...newState.loader, REGISTER_USER.pending];
            newState.error = '';
            return newState;
        }

        case REGISTER_USER.success: {
            newState.loader = newState.loader.filter((el) => el !== REGISTER_USER.pending);
            newState.success = action.payload;
            return newState;
        }

        case REGISTER_USER.failed: {
            newState.loader = newState.loader.filter((el) => el !== REGISTER_USER.pending);
            newState.error = action.payload;
            return newState;
        }

        case GET_USER.pending: {
            newState.loader = [...newState.loader, GET_USER.pending];
            newState.error = '';
            return newState;
        }

        case GET_USER.success: {
            newState.loader = newState.loader.filter((el) => el !== GET_USER.pending);
            newState.user = action.payload;
            newState.isAuthenticated = true;
            return newState;
        }

        case GET_USER.failed: {
            newState.loader = newState.loader.filter((el) => el !== GET_USER.pending);
            return newState;
        }

        case UPDATE_USER.pending: {
            newState.loader = [...newState.loader, UPDATE_USER.pending];
            newState.error = '';
            return newState;
        }

        case UPDATE_USER.success: {
            newState.loader = newState.loader.filter((el) => el !== UPDATE_USER.pending);
            newState.updateUser = true;
            return newState;
        }

        case UPDATE_USER.failed: {
            newState.loader = newState.loader.filter((el) => el !== UPDATE_USER.pending);
            newState.error = action.payload;
            return newState;
        }
        case FORGOT_PASSWORD.pending: {
            newState.loader = [...newState.loader, FORGOT_PASSWORD.pending];
            newState.error = '';
            newState.forgotPasswordMessage = ''
            return newState;
        }

        case FORGOT_PASSWORD.success: {
            newState.loader = newState.loader.filter((el) => el !== FORGOT_PASSWORD.pending);
            newState.forgotPasswordMessage = action.payload;
            return newState;
        }

        case FORGOT_PASSWORD.failed: {
            newState.loader = newState.loader.filter((el) => el !== FORGOT_PASSWORD.pending);
            newState.error = action.payload;
            return newState;
        }

        case RESET_PASSWORD.pending: {
            newState.loader = [...newState.loader, RESET_PASSWORD.pending];
            newState.error = '';
            newState.resetPasswordMessage = '';
            return newState;
        }

        case RESET_PASSWORD.success: {
            newState.loader = newState.loader.filter((el) => el !== RESET_PASSWORD.pending);
            newState.resetPasswordMessage = action.payload;
            newState.error = '';
            return newState;
        }

        case RESET_PASSWORD.failed: {
            newState.loader = newState.loader.filter((el) => el !== RESET_PASSWORD.pending);
            newState.error = action.payload;
            return newState;
        }
    }
    return newState;
};

export default authReducer;
