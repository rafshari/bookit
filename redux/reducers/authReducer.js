import {
    ALL_USERS,
    DELETE_USER,
    GET_USER,
    UPDATE_USER_PROFILE,
    UPDATE_USER_ADMIN,
    GET_USER_ADMIN,
    REGISTER_USER,
    RESET_PASSWORD,
    FORGOT_PASSWORD,
    CLEAR_ERRORS,
} from 'redux/constants/authConstant'

const intialState = {
  success: false,
  loader: [],
  error: '',
  user: {},
  userDetails: {},
  isAuthenticated: false,
  forgotPasswordMessage: '',
  resetPasswordMessage: '',
  updateUser: false,
  userUpdate:{isUpdated: false, loading:false, error:''},
  userDelete: { isDeleted: false, error: '' },
  users: [],
}

const authReducer = (state = intialState, action) => {
  const newState = { ...state }
  switch (action.type) {

    // Register User
    case REGISTER_USER.pending: {
      newState.loader = [...newState.loader, REGISTER_USER.pending]
      newState.error = ''
      return newState
    }
    case REGISTER_USER.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== REGISTER_USER.pending
      )
      newState.success = action.payload
      return newState
    }
    case REGISTER_USER.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== REGISTER_USER.pending
      )
      newState.error = action.payload
      return newState
    }

      //  UPDATE User Profile
      case UPDATE_USER_PROFILE.pending: {
        newState.loader =  [...newState.loader, UPDATE_USER_PROFILE.pending]
        newState.error = ''
        return newState
      }
  
      case UPDATE_USER_PROFILE.success: {
        newState.loader = newState.loader.filter(
        (el) => el !== UPDATE_USER_PROFILE.pending
      )
      newState.updateUser =  action.payload
      return newState
      }
  
      case UPDATE_USER_PROFILE.failed: {
        newState.loader = newState.loader.filter(
          (el) => el !== UPDATE_USER_PROFILE.pending
        )
        newState.error = action.payload
        return newState
      }
      case UPDATE_USER_PROFILE.reset: {
        newState.updateUser = false
        return newState
      }
      //  UPDATE USER  by ADMIN
      case UPDATE_USER_ADMIN.pending: {
        newState.userUpdate.loading = true
        newState.userUpdate.error = ''
        return newState
      }
  
      case UPDATE_USER_ADMIN.success: {
        newState.userUpdate.loading = false
        newState.userUpdate.isUpdated = action.payload
        return newState
      }
  
      case UPDATE_USER_ADMIN.failed: {
        newState.userUpdate.loading = false
        newState.userUpdate.error = action.payload
        return newState
      }
      case UPDATE_USER_ADMIN.reset: {
        newState.userUpdate.isUpdated = false
        return newState
      }
    // GET USER
    case GET_USER.pending: {
      newState.loader = [...newState.loader, GET_USER.pending]
      newState.error = ''
      return newState
    }

    case GET_USER.success: {
      newState.loader = newState.loader.filter((el) => el !== GET_USER.pending)
      newState.user = action.payload
      newState.isAuthenticated = true
      return newState
    }

    case GET_USER.failed: {
      newState.loader = newState.loader.filter((el) => el !== GET_USER.pending)
      return newState
    }
    // GET USER by ADMIN
    case GET_USER_ADMIN.pending: {
      newState.loader = [...newState.loader, GET_USER_ADMIN.pending]
      newState.error = ''
      return newState
    }

    case GET_USER_ADMIN.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== GET_USER_ADMIN.pending
      )
      newState.userDetails = action.payload
      return newState
    }

    case GET_USER_ADMIN.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== GET_USER_ADMIN.pending
      )
      newState.error = action.payload
      return newState
    }

  
    // DELETE USER ADMIN
    case DELETE_USER.pending: {
      newState.userDelete.loader = true
      newState.userDelete.error = ''
      return newState
    }

    case DELETE_USER.success: {
      newState.userDelete.loader = false
      newState.userDelete.isDeleted = action.payload
      return newState
    }
    case DELETE_USER.failed: {
      newState.userDelete.loader = false
      newState.userDelete.error = action.payload
      return newState
    }
    case DELETE_USER.reset: {
      newState.userDelete.isDeleted = false
      return newState
    }
    //  FORGOT  PASSWORD
    case FORGOT_PASSWORD.pending: {
      newState.loader = [...newState.loader, FORGOT_PASSWORD.pending]
      newState.error = ''
      newState.forgotPasswordMessage = ''
      return newState
    }

    case FORGOT_PASSWORD.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== FORGOT_PASSWORD.pending
      )
      newState.forgotPasswordMessage = action.payload
      return newState
    }

    case FORGOT_PASSWORD.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== FORGOT_PASSWORD.pending
      )
      newState.error = action.payload
      return newState
    }
    // RESET PASSWORD
    case RESET_PASSWORD.pending: {
      newState.loader = [...newState.loader, RESET_PASSWORD.pending]
      newState.error = ''
      newState.resetPasswordMessage = ''
      return newState
    }

    case RESET_PASSWORD.success: {
      newState.loader = newState.loader.filter(
        (el) => el !== RESET_PASSWORD.pending
      )
      newState.resetPasswordMessage = action.payload
      newState.error = ''
      return newState
    }

    case RESET_PASSWORD.failed: {
      newState.loader = newState.loader.filter(
        (el) => el !== RESET_PASSWORD.pending
      )
      newState.error = action.payload
      return newState
    }
    // ALL USERS   ADMIN
    case ALL_USERS.pending: {
      newState.loader = [...newState.loader, ALL_USERS.pending]
      newState.error = ''
      return newState
    }

    case ALL_USERS.success: {
      newState.loader = newState.loader.filter((el) => el !== ALL_USERS.pending)
      newState.users = action.payload
      return newState
    }
    case ALL_USERS.failed: {
      newState.loader = newState.loader.filter((el) => el !== ALL_USERS.pending)
      newState.error = action.payload
      return newState
    }
  }
  return newState
}

export default authReducer
