import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from 'redux/actions/authAction'
import { signOut, useSession } from 'next-auth/react'
import { GET_USER } from 'redux/constants/authConstant'

export default function Header() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const { user, loader } = useSelector((state) => state.user)
  useEffect(() => {
    if (!Object.keys(user).length) {
      dispatch(getUserDetails())
    }
  }, [dispatch, user])
  const renderLoginOrAvatar = () => {
    if (!loader.includes(GET_USER.pending) && Object.keys(user).length) {
      return (
        <>
          <div className='ml-4 dropdown d-line'>
            <div
              className='btn dropdown-toggle mr-4'
              id='dropDownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <figure className='avatar avatar-nav'>
                <img
                  src={user?.avatar?.url}
                  alt={user?.name}
                  className='rounded-circle'
                />
              </figure>
              <span>{user?.name}</span>
            </div>
            <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
              {user.role === 'admin' && (
                <>
                  <Link href='/admin/rooms' className='dropdown-item'>
                    Rooms List
                  </Link>
                  <Link href='/admin/bookings' className='dropdown-item'>
                    Bookings List
                  </Link>
                  <Link href='/admin/users' className='dropdown-item'>
                    Users List
                  </Link>
                  <Link href='/admin/reviews' className='dropdown-item'>
                    reviews List
                  </Link>
                  <hr />
                </>
              )}
              <Link href='/bookings/me' className='dropdown-item'>
                My bookings
              </Link>
              <Link href='/me/update' className='dropdown-item'>
                Profile
              </Link>
              <div
                onClick={async () => {
                  await signOut()
                }}
                className='dropdown-item text-danger'
              >
                Logout
              </div>
            </div>
          </div>
        </>
      )
    } else if (status === 'unauthenticated') {
      return (
        <Link
          href='/login'
          className='btn btn-danger px-4 text-white login-header-btn float-right'
        >
          Login
        </Link>
      )
    }
  }
  return (
    <>
      <nav className='navbar row justify-content-center sticky-top'>
        <div className='container'>
          <div className='col-3 p-0'>
            <div className='navbar-brand'>
              <Link href={`/`}>
                <img
                  style={{ cursor: 'pointer' }}
                  src='/images/bookit_logo.png'
                  alt='BookIT'
                />
              </Link>
            </div>
          </div>
          <div className='col-3 mt-md-0 text-center'>
            {renderLoginOrAvatar()}
          </div>
        </div>
      </nav>
    </>
  )
}
