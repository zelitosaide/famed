import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faArrowUpRightFromSquare,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faGripVertical,
  faPencil
} from '@fortawesome/free-solid-svg-icons'

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
              <Fieldset legend='Editar curso de curta duração' style={{ minHeight: '27rem' }}>
                <Input label='Título do Curso' required error={methods.formState.errors.title?.message}>
                  <input type='text' id='Título do Curso' disabled={!canUpdate}
                    {...methods.register('title', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Descrição do Curso' required error={methods.formState.errors.description?.message}>
                  <textarea id='Descrição do Curso' disabled={!canUpdate}
                    {...methods.register('description', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Duração do Curso' required error={methods.formState.errors.duration?.message}>
                  <input type='text' id='Duração do Curso' disabled={!canUpdate}
                    {...methods.register('duration', { required: 'This field is riquired' })}
                  />
                </Input>

                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input label='PlayList ID'>
                      <input type='text' id='PlayList ID' disabled={!canUpdate}
                        {...methods.register('playlistId')}
                      />
                    </Input>
                  </Column>
                  <Column style={{ width: '50%' }}>
                    <Input label='YouTube API KEY'>
                      <input type='text' id='YouTube API KEY' disabled={!canUpdate}
                        {...methods.register('youtubeApiKey')}
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
              <Fieldset legend='Criar curso de curta duração' style={{ minHeight: '27rem' }}>
                <p
                  style={{
                    fontSize: 'var(--main-font-size)',
                    margin: 'calc(0.5rem * 0.9 * 1.5) calc(0.5rem * 0.9)',
                    background: '#F6F9F6',
                    border: '1px dashed var(--main-stroke-svg-color)',
                    borderRadius: 'var(--border-radius-small)',
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 6,
                    paddingRight: 6,
                    color: 'var(--main-font-color)',
                    fontWeight: 'var(--bold-font-weight)',
                  }}
                >
                  Inferência estatística - 1
                </p>

                <div
                  style={{
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    margin: 'calc(0.5rem * 0.9) calc(2 * 0.5rem * 0.9)'
                  }}
                >
                  <FontAwesomeIcon color='var(--bold-stroke-svg-color)' icon={faFilePdf}></FontAwesomeIcon>&nbsp;Livro: Introduction to R
                </div>

                <div
                  style={{
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    margin: 'calc(0.5rem * 0.9) calc(2 * 0.5rem * 0.9)'
                  }}
                >
                  <FontAwesomeIcon color='var(--bold-stroke-svg-color)' icon={faArrowUpRightFromSquare}></FontAwesomeIcon>&nbsp;Grupos para atividade final
                </div>

                <div
                  style={{
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    margin: 'calc(0.5rem * 0.9) calc(2 * 0.5rem * 0.9)'
                  }}
                >
                  <FontAwesomeIcon color='var(--bold-stroke-svg-color)' icon={faFileWord}></FontAwesomeIcon>&nbsp;Codigos de R usados no curso
                </div>

                <div
                  style={{
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    margin: 'calc(0.5rem * 0.9) calc(2 * 0.5rem * 0.9)'
                  }}
                >
                  <FontAwesomeIcon color='var(--bold-stroke-svg-color)' icon={faFileExcel}></FontAwesomeIcon>&nbsp;Monografia
                </div>

                <Input>
                  <button style={{ fontWeight: 'normal', padding: 4, marginLeft: 'calc(0.5rem * 0.9)' }} type='button'  className={styles.add}>
                    Adicionar Recurso
                  </button>
                </Input>

                <p
                  style={{
                    fontSize: 'var(--main-font-size)',
                    margin: 'calc(0.5rem * 0.9 * 1.5) calc(0.5rem * 0.9)',
                    background: '#F6F9F6',
                    border: '1px dashed var(--main-stroke-svg-color)',
                    borderRadius: 'var(--border-radius-small)',
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 6,
                    paddingRight: 6,
                    color: 'var(--main-font-color)',
                    fontWeight: 'var(--bold-font-weight)',
                  }}
                >
                  Inferência estatística - 2
                </p>

                <div
                  style={{
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    margin: 'calc(0.5rem * 0.9) calc(2 * 0.5rem * 0.9)'
                  }}
                >
                  <FontAwesomeIcon color='var(--bold-stroke-svg-color)' icon={faFilePowerpoint}></FontAwesomeIcon>&nbsp;Introdução à bioestatística
                </div>


                <Input>
                  <button style={{ fontWeight: 'normal', padding: 4, marginLeft: 'calc(0.5rem * 0.9)' }} type='button' className={styles.add}>
                    Adicionar Recurso
                  </button>
                </Input>

                <Input>
                  <button style={{ fontWeight: 'normal', padding: 4 }} type='button'  className={styles.add}>
                    Adicionar Titulo
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
