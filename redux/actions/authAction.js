import axios from 'axios';
import { FORGOT_PASSWORD, GET_USER, REGISTER_USER, RESET_PASSWORD, UPDATE_USER } from 'redux/constants/authConstant';

export const registerAction = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: REGISTER_USER.pending });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            console.log(data);
            const response = await axios.post('/api/auth/register', data, config);
            dispatch({ type: REGISTER_USER.success, payload: response.data });
        } catch (error) {
            dispatch({ type: REGISTER_USER.failed, payload: error.response.data.message });
        }
    };
};

export const getUserDetails = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: GET_USER.pending });
            const response = await axios.get('/api/me');
            dispatch({ type: GET_USER.success, payload: response.data?.user });
        } catch (error) {
            dispatch({ type: GET_USER.failed, payload: error.response.data.message });
        }
    };
};

export const updateUserDetail = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: UPDATE_USER.pending });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.put('/api/me/update', data, config);
            dispatch({ type: UPDATE_USER.success, payload: response.data?.success });
        } catch (error) {
            dispatch({ type: UPDATE_USER.failed, payload: error.response.data.message });
        }
    };
};

export const forgotPasswordAction = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: FORGOT_PASSWORD.pending });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.post('/api/password/forgot', data, config);
            console.log(response);
            dispatch({ type: FORGOT_PASSWORD.success, payload: response.data.message });
        } catch (error) {
            console.log(error);
            dispatch({ type: FORGOT_PASSWORD.failed, payload: error.response.data.message });
        }
    };
};

export const resetPassword = (token, data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: RESET_PASSWORD.pending });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.post(`/api/password/reset/${token}`, data, config);
            dispatch({ type: RESET_PASSWORD.success, payload: response.data.message });
        } catch (error) {
            dispatch({ type: RESET_PASSWORD.failed, payload: error.response.data.message });
        }
    };
};
