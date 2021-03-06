import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './Courses.module.css'

import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { createCourse } from './coursesSlice'
import { Notification } from '../../components/notification/Notification'

export const CreateCourse = () => {
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      duration: '',
    }
  })

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = true

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      await dispatch(createCourse({ ...data, userId: currentUser.user._id })).unwrap()
      openAndAutoClose()
      methods.reset()
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
    <div className={`${styles.createCourse} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Notification
            visible={openNotification}
            setVisible={setOpenNotification}
            text='Curso criado com sucesso!'
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
              <Fieldset legend='Criar curso de curta dura????o' style={{ minHeight: '26rem' }}>
                <Input label='T??tulo do Curso' required error={methods.formState.errors.title?.message}>
                  <input type='text' id='T??tulo do Curso' disabled={!canCreate}
                    {...methods.register('title', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Descri????o do Curso' required error={methods.formState.errors.description?.message}>
                  <input type='text' id='Descri????o do Curso' disabled={!canCreate}
                    {...methods.register('description', { required: 'This field is riquired' })}
                  />
                </Input>

                <Row>
                  <Column style={{ width: '33.33%' }}>
                    <Input label='Dura????o do Curso' required error={methods.formState.errors.duration?.message}>
                      <input type='text' id='Dura????o do Curso' disabled={!canCreate}
                        {...methods.register('duration', { required: 'This field is riquired' })}
                      />
                    </Input>
                  </Column>
                </Row>

                <Input style={{ display: 'inline-block' }}>
                  <button type='submit' disabled={status === 'pending' || !canCreate}>
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
                  <button type='button' disabled={status === 'pending'}
                    onClick={() => navigate(-1, { replace: true })}
                  >Cancelar</button>
                </Input>
              </Fieldset>
            </Column>
            <Column style={{ width: '50%' }}>

            </Column>
          </Row>
        </form>
      </div>
    </div>
  )
}
