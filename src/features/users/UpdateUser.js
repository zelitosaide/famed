import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Row } from '../../components/row/Row'

import styles from './Users.module.css'
import { updateUser } from './usersSlice'
import { Notification } from '../../components/notification/Notification'

const UpdateUser = () => {
  const [status, setStatus] = useState('idle')
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { userId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state =>
    state.users.users.find(user => user._id === userId)
  )

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { ...user, password: '' }
  })

  const password = useRef({})
  password.current = watch('password')

  if (!user) {
    return <Navigate to='/dashboard/users' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const isAdmin = currentUser.user.roles.admin
  const canCreate = isAdmin || currentUser.user._id === user._id

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const response = await dispatch(updateUser(data)).unwrap()
      const updatedUser = { ...currentUser, user: response }

      if (currentUser.user._id === user._id) {
        localStorage.setItem('famedv1_user', JSON.stringify(updatedUser))
      }

      navigate('/dashboard/users')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className={`${styles.updateUser} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de atualização'
            type='Error'
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend='Atualização de Usuário' style={{ minHeight: '26rem' }}>
                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input label='Primeiro Nome' error={errors.firstName?.message} required>
                      <input
                        type='text'
                        id='Primeiro Nome'
                        disabled={!canCreate}
                        {...register('firstName', {
                          required: 'This field is required'
                        })}
                      />
                    </Input>
                  </Column>
                  <Column style={{ width: '50%' }}>
                    <Input label='Apelido' error={errors.lastName?.message} required>
                      <input
                        type='text'
                        id='Apelido'
                        disabled={!canCreate}
                        {...register('lastName', {
                          required: 'This field is required'
                        })}
                      />
                    </Input>
                  </Column>
                </Row>

                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input label='Senha' error={errors.password?.message} required>
                      <input
                        type='password'
                        id='Senha'
                        disabled={!canCreate}
                        {...register('password')}
                      />
                    </Input>
                  </Column>
                  <Column style={{ width: '50%' }}>
                    <Input label='Confirmar Senha' error={errors.confirmPassword?.message} required>
                      <input
                        type='password'
                        id='Confirmar Senha'
                        disabled={!canCreate}
                        {...register('confirmPassword', {
                          validate: (value) => {
                            return value === password.current || 'The passwords do not match'
                          }
                        })}
                      />
                    </Input>
                  </Column>
                </Row>

                <Input label='Email' error={errors.email?.message} required>
                  <input
                    type='email'
                    id='Email'
                    disabled
                    {...register('email', {
                      required: 'This field is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </Input>

                <Fieldset
                  legend='Funções do usuário'
                  style={{ border: 'none', padding: 0, margin: 0 }}
                  legendStyle={{
                    background: '#fff',
                    fontWeight: 'var(--bold-font-weight)',
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    paddingBottom: 'calc(0.26rem * 0.9)',
                  }}
                >
                  <Input label='Normal'>
                    <input
                      type='checkbox'
                      id='Normal'
                      disabled={!isAdmin}
                      {...register('roles.normal')}
                    />
                  </Input>

                  <Input label='Admin' style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <input
                      type='checkbox'
                      id='Admin'
                      disabled={!isAdmin}
                      {...register('roles.admin')}
                    />
                  </Input>

                  <Input label='Teacher'>
                    <input
                      type='checkbox'
                      id='Teacher'
                      disabled={!isAdmin}
                      {...register('roles.teacher')}
                    />
                  </Input>
                </Fieldset>

                <Input style={{ display: 'inline-block' }}>
                  <button disabled={status === 'pending' || !canCreate} type='submit'>
                    {status === 'pending' ? 'Atualizando...' : 'Atualizar'}
                  </button>
                </Input>

                <Input
                  style={{
                    display: 'inline-block',
                    '--bg-color': 'rgb(252, 88, 50)',
                    '--bg-hover': 'rgb(252, 70, 29)',
                    '--bg-active': 'rgb(252, 88, 50)',
                    '--outline-color': 'rgb(253, 152, 129)',
                  }}
                >
                  <button disabled={status === 'pending'} type='button'
                    onClick={() => navigate(-1, { replace: true })}
                  >
                    Cancelar
                  </button>
                </Input>
              </Fieldset>
            </Column>
          </Row>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser