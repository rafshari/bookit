import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors, getUserDetails, updateUserProfile } from 'redux/actions/authAction'
import { UPDATE_USER_PROFILE } from 'redux/constants/authConstant'
import ButtonLoader from 'components/layout/ButtonLoader'
import { useRouter } from 'next/router'

const Profile = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { user, updateUser, loader, error } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  })
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')

  useEffect(() => {
    if (user) {
      setUserData((preState) => ({
        ...preState,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }))
      setAvatarPreview(user.avatar?.url)
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (updateUser) {
      router.push('/')
      dispatch({ type: UPDATE_USER_PROFILE.reset })
    }
  }, [loader, error,updateUser, dispatch])

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result)
          setAvatarPreview(reader.result)
        }
      }
      reader.readAsDataURL(event.target.files[0])
    } else {
      setUserData((preState) => ({
        ...preState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const Data = {
      ...userData,
      avatar,
    }
    dispatch(updateUserProfile(Data))
    console.log('0:',Data)
  }

  return (
    <>
      <div className='container container-fluid'>
        <div className='row wrapper'>
          <div className='col-10 col-lg-5'>
            <form className='shadow-lg'>
              <h1>Update Profile</h1>
              <div className='form-group'>
                <label htmlFor='name_field'>Full Name</label>
                <input
                  type='text'
                  name='name'
                  id='name_field'
                  className='form-control'
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email_field'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email_field'
                  className='form-control'
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phoneNumber_field'>Phone Number</label>
                <input
                  type='text'
                  name='phoneNumber'
                  id='phoneNumber_field'
                  className='form-control'
                  value={userData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password_field'>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password_field'
                  className='form-control'
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='d-flex align-items-center'>
                  <div>
                    <figure className='avatar mr-3 item-rtl'>
                      <img
                        src={avatarPreview}
                        className='rounded-circle'
                        alt='image'
                      />
                    </figure>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='avatar'
                      id='customFile'
                      accept='image/*'
                      onChange={handleChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <button
                id='login_button'
                onClick={handleSubmit}
                className='btn btn-block py-3'
                disabled={loading}
              >
                {loading ? <ButtonLoader /> : 'UPDATE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile
