import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import styles from './Users.module.css'

import { updateUser } from './usersSlice'

const UpdateUser = () => {
  const { userId } = useParams()
  const [status, setStatus] = useState('idle')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state =>
    state.users.users.find(user => user._id === userId)
  )

  const [formData, setFormData] = useState({ ...user, password: ''})

  if (!user) {
    return <Navigate to='/dashboard/users' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const isAdmin = currentUser.user.roles.admin
  const canCreate = isAdmin || currentUser.user._id === user._id

  const onUpdate = async () => {
    try {
      setStatus('pending')
      const response = await dispatch(updateUser(formData)).unwrap()

      const updatedUser = { ...currentUser, user: response}

      if (currentUser.user._id === user._id) {
        localStorage.setItem('famedv1_user', JSON.stringify(updatedUser))
      }

      navigate('/dashboard/users')
    } catch (error) {
      console.log('FROM Update User', error)
    } finally {
      setStatus('idle')
    }
  }

  const onCancel = () => {
    navigate(-1, { replace: true })
  }
  
  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.updateUser} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <p>{user.firstName}&nbsp;{user.lastName}</p>

        <div className={styles.formGroup}>
          <div style={{ float: 'left', width: '49%' }}>
            <label htmlFor='firstName'>
              First Name&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              id='firstName'
              disabled={!canCreate}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div style={{ float: 'right', width: '49%' }}>
            <label htmlFor='lastName'>Last Name&nbsp;<span style={{ color: 'red' }}>*</span></label>
            <input
              type='text'
              id='lastName'
              disabled={!canCreate}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>


        <label htmlFor='email'>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input
          type='email'
          id='email'
          disabled
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor='password'>Password&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input
          type='password'
          id='password'
          disabled={!canCreate}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <label>Funções do usuário&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <div>
          <input
            type='checkbox'
            name='roles'
            id='normal'
            disabled={!isAdmin}
            checked={formData.roles.normal}
            onChange={() => setFormData({
              ...formData,
              roles: {
                ...formData.roles,
                normal: !formData.roles.normal
              }
            })}
          />
          <label htmlFor='normal' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>Normal</label>
        </div>

        <div>
          <input
            type='checkbox'
            name='roles'
            id='admin'
            disabled={!isAdmin}
            checked={formData.roles.admin}
            onChange={() => setFormData({
              ...formData,
              roles: {
                ...formData.roles,
                admin: !formData.roles.admin
              }
            })}
          />
          <label htmlFor='admin' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>Admin</label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type='checkbox'
            name='roles'
            id='teacher'
            disabled={!isAdmin}
            checked={formData.roles.teacher}
            onChange={() => setFormData({
              ...formData,
              roles: {
                ...formData.roles,
                teacher: !formData.roles.teacher
              }
            })}
          />
          <label htmlFor='admin' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>Teacher</label>
        </div>

        <button onClick={onUpdate} disabled={status === 'pending' || !canCreate}>
          {status === 'pending' ? 'Updating...' : 'Update'}
        </button>
        <button style={{
          marginLeft: '1rem',
          background: '#C66518'
        }} onClick={onCancel} disabled={status === 'pending'}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default UpdateUser