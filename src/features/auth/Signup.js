import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { signup } from './authSlice'

const Signup = () => {
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    roles: { normal: false, admin: false, teacher: false }
  })

  const onSignup = async () => {
    try {
      setStatus('pending')
      await dispatch(signup(formData)).unwrap()
      navigate('/dashboard')
    } catch (error) {
      console.log('FROM Signup', error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div style={{ paddingTop: '120px' }}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        id='email'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        type='password'
        id='confirmPassword'
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />

      <label htmlFor='normal'>Normal</label>
      <input
        type='checkbox'
        name='roles'
        id='normal'
        checked={formData.roles.normal}
        onChange={() => setFormData({
          ...formData,
          roles: {
            ...formData.roles,
            normal: !formData.roles.normal
          }
        })}
      />

      <label htmlFor='admin'>Admin</label>
      <input
        type='checkbox'
        name='roles'
        id='admin'
        checked={formData.roles.admin}
        onChange={() => setFormData({
          ...formData,
          roles: {
            ...formData.roles,
            admin: !formData.roles.admin
          }
        })}
      />

      <label htmlFor='admin'>Teacher</label>
      <input
        type='checkbox'
        name='roles'
        id='teacher'
        checked={formData.roles.teacher}
        onChange={() => setFormData({
          ...formData,
          roles: {
            ...formData.roles,
            teacher: !formData.roles.teacher
          }
        })}
      />

      <button onClick={onSignup} disabled={status === 'pending'}>
        {status === 'pending' ? 'Signing up...' : 'Sign up'}
      </button>
    </div>
  )
}

export default Signup