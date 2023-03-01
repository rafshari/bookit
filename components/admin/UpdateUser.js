import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ButtonLoader from 'components/layout/ButtonLoader'
import Loader from '@/components/layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
  updateUserAdmin,
  adminGetUserDetails,
  clearErrors,
} from 'redux/actions/authAction'
import { GET_USER_ADMIN, UPDATE_USER_ADMIN } from 'redux/constants/authConstant'

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()

  const { loading, error, isUpdated } = useSelector( (state) => state.user.userUpdate  )
  const { loader: userDetailsLoading, userDetails, error: userDetailsError  } = useSelector((state) => state.user)

  const userId = router.query.id

  useEffect(() => {
    if (userDetails && userDetails._id !== userId) {
      dispatch(adminGetUserDetails(userId))
    } else {
      setName(userDetails.name)
      setEmail(userDetails.email)
      setRole(userDetails.role)
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (isUpdated) {
        dispatch(adminGetUserDetails(userId))
      router.push('/admin/users')
      dispatch({ type: UPDATE_USER_ADMIN.reset })
    }
  }, [dispatch, isUpdated, userId,userDetailsError, userDetails, error])


  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      name,
      email,
      role,
    }
    
    dispatch(updateUserAdmin(userDetails._id, userData))
  }

  return (
    <>
      {userDetailsLoading.includes(GET_USER_ADMIN.pending)  ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mt-2 mb-5'>Update User</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='name'
                    id='name_field'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='role_field'>Role</label>

                  <select
                    id='role_field'
                    className='form-control'
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='user'>user</option>
                    <option value='admin'>admin</option>
                  </select>
                </div>
                <button
                  type='submit'
                  className='btn update-btn btn-block mt-4 mb-3'
                  disabled={loading ? true : false}
                >
                  {loading ? <ButtonLoader /> : 'UPDATE'}{' '}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateUser
