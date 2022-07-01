import { useEffect } from 'react'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { MenuButton, Menu, MenuList, MenuLink, MenuItem } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import styles from './Header.module.css'
import { signout } from '../../../features/auth/authSlice'

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSignout = () => {
    dispatch(signout())
    navigate('/signin')
  }

  useEffect(() => {
    const token = currentUser?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) onSignout()
    }
  })

  return (
    <div className={styles.header}>
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#696968',
          position: 'absolute',
          right: '5rem',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      <Menu>
        <MenuButton
          className={styles.avatar}
          style={{
            position: 'absolute',
            right: '1.8rem',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >{currentUser.user.firstName.charAt(0)}{currentUser.user.lastName.charAt(0)}</MenuButton>
        <MenuList className={styles.__slideDown}>
          <MenuLink
            className={styles.menuItem}
            as={Link}
            to={`/dashboard/users/edit/${currentUser.user._id}`}
          >
            Your Profile
          </MenuLink>
          <MenuItem onSelect={onSignout} className={styles.menuItem} >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>

    </div>
  )
}

export default Header