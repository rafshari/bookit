import axios from 'axios'
import {
  ALL_USERS,
  DELETE_USER,
  FORGOT_PASSWORD,
  GET_USER,
  GET_USER_ADMIN,
  REGISTER_USER,
  RESET_PASSWORD,
  UPDATE_USER_ADMIN,
  UPDATE_USER_PROFILE,
  CLEAR_ERRORS,

} from 'redux/constants/authConstant'


// REGISTER
export const  registerAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REGISTER_USER.pending })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post('/api/auth/register', data, config)
      console.log(response)
      dispatch({
         type: REGISTER_USER.success,
          payload: response.data.success 
        })
    } catch (error) {
      dispatch({
        type: REGISTER_USER.failed,
        payload: error.response.data.message,
      })
    }
  }
}
// GET USER  by ADMIN  => /api/admin/users/:id
export const adminGetUserDetails = (id) => async (dispatch) => {
  try {

      dispatch({ type: GET_USER_ADMIN.pending });

      const { data } = await axios.get(`/api/admin/users/${id}`)

      dispatch({
          type: GET_USER_ADMIN.success,
          payload: data.user
      })

  } catch (error) {

      dispatch({
          type: GET_USER_ADMIN.failed,
          payload: error.response.data.message
      })
  }
}


// GET USER DETAIL
export const getUserDetails = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USER.pending })
      const response = await axios.get('/api/me')
      dispatch({
        type: GET_USER.success,
        payload: response.data?.user,
      })
    } catch (error) {
      dispatch({
        type: GET_USER.failed,
        payload: error.response?.data.message,
      })
    }
  }
}
// UPDATE USER Profile by user
export const updateUserProfile = (Data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_PROFILE.pending,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const { data } = await axios.put('/api/me/update', Data, config)
      console.log('2:', data)
      dispatch({
        type: UPDATE_USER_PROFILE.success,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILE.failed,
        payload: error.response?.data.message,
      })
    }
  }
}


// UPDATE USER by ADMIN   =>  /api/admin/users/:id
export const updateUserAdmin = (id, userData) => async (dispatch) => {
  try {
      dispatch({ type: UPDATE_USER_ADMIN.pending });

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/api/admin/users/${id}`, userData, config)

      dispatch({
          type: UPDATE_USER_ADMIN.success,
          payload: data.success
      })
  } catch (error) {

      dispatch({
          type: UPDATE_USER_ADMIN.failed,
          payload: error.response?.data.message
      })
  }
}

// Forgot Password action
export const forgotPasswordAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FORGOT_PASSWORD.pending })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post('/api/password/forgot', data, config)
      console.log(response)
      dispatch({
        type: FORGOT_PASSWORD.success,
        payload: response.data.message,
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: FORGOT_PASSWORD.failed,
        payload: error.response.data.message,
      })
    }
  }
}

// Reset Password action
export const resetPassword = (token, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: RESET_PASSWORD.pending })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `/api/password/reset/${token}`,
        data,
        config
      )
      dispatch({ type: RESET_PASSWORD.success, payload: response.data.message })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD.failed,
        payload: error.response.data.message,
      })
    }
  }
}

// GET ALL USERS ADMIN
export const getAdminUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS.pending })

    const { data } = await axios.get(`/api/admin/users`)

    dispatch({
      type: ALL_USERS.success,
      payload: data.users,
    })
  } catch (error) {
    dispatch({
      type: ALL_USERS.failed,
      payload: error.response.data.message,
    })
  }
}
// DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER.pending })

    const { data } = await axios.delete(`/api/admin/users/${id}`)

    dispatch({
      type: DELETE_USER.success,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_USER.failed,
      payload: error.response.data.message,
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: CLEAR_ERRORS
  })
}
