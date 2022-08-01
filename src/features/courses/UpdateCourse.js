import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import styles from './Courses.module.css'

import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'
import { Row } from '../../components/row/Row'
import { updateCourse } from './coursesSlice'

export const UpdateCourse = () => {
  const { courseId } = useParams()
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const course = useSelector(state =>
    state.courses.courses.find(course => course._id === courseId)
  )

  const methods = useForm({ defaultValues: course })

  const canUpdate = true

  if (!course) {
    return <Navigate to='/dashboard/courses' replace />
  }

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)

      await dispatch(updateCourse(data)).unwrap()

      navigate('/dashboard/courses')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className={`${styles.createCourse} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de atualização'
            type='Error'
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend='Editar curso de curta duração' style={{ minHeight: '26rem' }}>
                <Input label='Título do Curso' required error={methods.formState.errors.title?.message}>
                  <input type='text' id='Título do Curso' disabled={!canUpdate}
                    {...methods.register('title', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Descrição do Curso' required error={methods.formState.errors.description?.message}>
                  <input type='text' id='Descrição do Curso' disabled={!canUpdate}
                    {...methods.register('description', { required: 'This field is riquired' })}
                  />
                </Input>

                <Row>
                  <Column style={{ width: '33.33%' }}>
                    <Input label='Duração do Curso' required error={methods.formState.errors.duration?.message}>
                      <input type='text' id='Duração do Curso' disabled={!canUpdate}
                        {...methods.register('duration', { required: 'This field is riquired' })}
                      />
                    </Input>
                  </Column>
                </Row>

                <Input style={{ display: 'inline-block' }}>
                  <button type='submit' disabled={status === 'pending' || !canUpdate}>
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
