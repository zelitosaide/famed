import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from './Users.module.css'
import { createUser } from './usersSlice'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Input } from '../../components/input/Input'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Notification } from '../../components/notification/Notification'

const CreateUser = () => {
  const [openNotification, setOpenNotification] = useState(false)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      roles: { normal: false, admin: false, teacher: false }
    }
  })
  const password = useRef({})
  password.current = watch('password')

  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      await dispatch(createUser(data)).unwrap()
      openAndAutoClose()
      reset()
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  const openAndAutoClose = () => {
    setOpenNotification(true)
    setTimeout(() => {
      setOpenNotification(false)
    }, 14000)
  }

  return (
    <div className={`${styles.updateUser} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Notification
            visible={openNotification}
            setVisible={setOpenNotification}
            text='Cadastro efectuado com sucesso!'
            title='Salvo com sucesso!'
          />

          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de cadastro'
            type='Error'
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend='Cadastro de Usuário' style={{ minHeight: '26rem' }}>
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
                        {...register('password', {
                          required: 'This field is required'
                        })}
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
                          required: 'This field is required',
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
                    disabled={!canCreate}
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
                  style={{ border: 'none', padding: 0, margin: 0, boxShadow: 'none' }}
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
                      disabled={!canCreate}
                      {...register('roles.normal')}
                    />
                  </Input>

                  <Input label='Admin' style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <input
                      type='checkbox'
                      id='Admin'
                      disabled={!canCreate}
                      {...register('roles.admin')}
                    />
                  </Input>

                  <Input label='Teacher'>
                    <input
                      type='checkbox'
                      id='Teacher'
                      disabled={!canCreate}
                      {...register('roles.teacher')}
                    />
                  </Input>
                </Fieldset>

                <Input style={{ display: 'inline-block' }}>
                  <button disabled={status === 'pending' || !canCreate} type='submit'>
                    {status === 'pending' ? 'Salvando...' : 'Salvar'}
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
                  >Cancelar</button>
                </Input>
              </Fieldset>
            </Column>
          </Row>
        </form>
      </div>
    </div>
  )
}

export default CreateUser