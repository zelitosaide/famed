import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from 'react-activity/dist/Spinner'
import 'react-activity/dist/Spinner.css'

import { signin } from './authSlice'
import styles from './auth.module.css'

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const onSignin = async () => {
    try {
      setStatus('pending')
      await dispatch(signin(formData)).unwrap()
      navigate(from, { replace: true })
    } catch (error) {
      console.log('FROM Signin', error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className='row'>
      <div className={`${styles.signin} ${styles.responsive}`}>
        <div className={styles.container}>
          <div className={`${styles.column} col col-768-6`}>
            <p className={styles.title}>Seja bem-vindo ao nosso novo site!</p>
            <p className={styles.content}>
              {/* If you do not have an account, contact the administrator to have one. */}
              Caso não tenha uma conta, entre em contato com o administrador para ter uma.
            </p>

            <p style={{ textDecoration: 'underline', color: 'red', fontSize: '0.9rem' }}>ccfaculdademedicina@gmail.com</p>
          </div>

          <div className={`${styles.column} col col-768-6`}>
            <p className={styles.title}>Login Account</p>
            <div className={styles.form}>
              <label htmlFor='email'>
                Email&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type='text'
                id='email'
                value={formData.email}
                autoComplete='off'
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label htmlFor='password'>
                Password&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type='password'
                id='password'
                autoComplete='off'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button onClick={onSignin} disabled={status === 'pending'}>
                <div style={{ position: 'relative', height: '40px', width: '100%' }}>
                  {status === 'pending'
                    ? (
                      <>
                        <span
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-90%, -50%)'
                          }}
                        >Iniciar Sessão
                        </span>
                        <Spinner
                          style={{
                            display: 'inline-block',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(70%, -50%)'
                          }}
                          size={12} color='white'
                        />
                      </>
                    )
                    : (
                      <span
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >Iniciar Sessão</span>
                    )
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin