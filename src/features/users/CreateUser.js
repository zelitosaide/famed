import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createUser } from './usersSlice'

import styles from './Users.module.css'

const CreateUser = () => {
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    roles: { normal: false, admin: false, teacher: false }
  })

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.admin

  const onCreate = async () => {
    try {
      setStatus('pending')
      await dispatch(createUser(formData)).unwrap()
      navigate('/dashboard/users')
    } catch (error) {
      console.log('FROM Create User', error)
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
        <p>Criar Usuário</p>

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

        <div className={styles.formGroup}>
          <div style={{ float: 'left', width: '49%' }}>
            <label htmlFor='password'>Password&nbsp;<span style={{ color: 'red' }}>*</span></label>
            <input
              type='password'
              id='password'
              disabled={!canCreate}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div style={{ float: 'right', width: '49%' }}>
            <label htmlFor='confirmPassword'>Confirm Password&nbsp;<span style={{ color: 'red' }}>*</span></label>
            <input
              type='password'
              id='confirmPassword'
              disabled={!canCreate}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
        </div>


        <label htmlFor='email'>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input
          type='email'
          id='email'
          disabled={!canCreate}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />


        <label>Funções do usuário&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <div>
          <input
            type='checkbox'
            name='roles'
            id='normal'
            disabled={!canCreate}
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
            disabled={!canCreate}
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
            disabled={!canCreate}
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

        <button onClick={onCreate} disabled={status === 'pending' || !canCreate}>
          {status === 'pending' ? 'Saving...' : 'Save'}
        </button>

        <button style={{
          marginLeft: '1rem',
          background: '#C66518'
        }} onClick={onCancel} disabled={status === 'pending'}>
          Cancelar
        </button>
      </div>
    </div>

    // <div>
    //   <label htmlFor='name'>Name</label>
    //   <input
    //     type='text'
    //     id='name'
    //     disabled={!canCreate}
    //     value={formData.name}
    //     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //   />
    //   <label htmlFor='email'>Email</label>
    //   <input
    //     type='text'
    //     id='email'
    //     disabled={!canCreate}
    //     value={formData.email}
    //     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //   />
    //   <label htmlFor='password'>Password</label>
    //   <input
    //     type='password'
    //     id='password'
    //     disabled={!canCreate}
    //     value={formData.password}
    //     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    //   />
    //   <label htmlFor='confirmPassword'>Confirm Password</label>
    //   <input
    //     type='password'
    //     id='confirmPassword'
    //     disabled={!canCreate}
    //     value={formData.confirmPassword}
    //     onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
    //   />

    //   <label htmlFor='normal'>Normal</label>
    //   <input
    //     type='checkbox'
    //     name='roles'
    //     id='normal'
    //     disabled={!canCreate}
    //     checked={formData.roles.normal}
    //     onChange={() => setFormData({
    //       ...formData,
    //       roles: {
    //         ...formData.roles,
    //         normal: !formData.roles.normal
    //       }
    //     })}
    //   />

    //   <label htmlFor='admin'>Admin</label>
    //   <input
    //     type='checkbox'
    //     name='roles'
    //     id='admin'
    //     disabled={!canCreate}
    //     checked={formData.roles.admin}
    //     onChange={() => setFormData({
    //       ...formData,
    //       roles: {
    //         ...formData.roles,
    //         admin: !formData.roles.admin
    //       }
    //     })}
    //   />

    //   <label htmlFor='admin'>Teacher</label>
    //   <input
    //     type='checkbox'
    //     name='roles'
    //     id='teacher'
    //     disabled={!canCreate}
    //     checked={formData.roles.teacher}
    //     onChange={() => setFormData({
    //       ...formData,
    //       roles: {
    //         ...formData.roles,
    //         teacher: !formData.roles.teacher
    //       }
    //     })}
    //   />

    //   <button onClick={onCreate} disabled={status === 'pending' || !canCreate}>
    //     {status === 'pending' ? 'Saving...' : 'Save'}
    //   </button>
    // </div>
  )
}

export default CreateUser