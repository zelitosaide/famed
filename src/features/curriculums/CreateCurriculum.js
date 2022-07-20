import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from './Curriculums.module.css'
import { createCurriculum } from './curriculumsSlice'
import { convert2base64 } from '../projects/processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'

const CreateCurriculum = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', content: '', pdf: '', image: '' },
    mode: 'onChange'
  })
  const [openNotification, setOpenNotification] = useState(false)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))

  const existingCurriculum = useSelector(state =>
    state.curriculums.curriculums.find(curriculum => curriculum.userId === currentUser.user._id)
  )

  const canCreate = currentUser.user.roles.teacher && !existingCurriculum

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const pdf = await convert2base64(data.pdf[0])
      const image = await convert2base64(data.image[0])

      await dispatch(createCurriculum({
        ...data,
        pdf,
        image,
        userId: currentUser.user._id
      })).unwrap()

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
    <div className={`${styles.createCurriculum} ${styles.responsive}`}>
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
              <Fieldset legend='Criar novo Curriculum vitae (CV)'>
                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input label='PDF' required error={errors.pdf?.message}>
                      <input type='file' id='PDF' disabled={!canCreate}
                        {...register('pdf', {
                          required: 'This field is riquired',
                          validate: (value) => {
                            if (!!value) {
                              const allowedExtensions = /\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd$/i
                              return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                            }
                          }
                        })}
                      />
                    </Input>
                  </Column>

                  <Column style={{ width: '50%' }}>
                    <Input label='Image do Professor' required error={errors.image?.message}>
                      <input type='file' id='Image do Professor' disabled={!canCreate}
                        {...register('image', {
                          required: 'This field is riquired',
                          validate: (value) => {
                            if (!!value) {
                              const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                              return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                            }
                          }
                        })}
                      />
                    </Input>
                  </Column>
                </Row>

                <Input label='Resumo do Curriculum' required error={errors.content?.message}>
                  <textarea id='Resumo do Curriculum' disabled={!canCreate}
                    {...register('content', { required: 'This field is riquired' })}
                  />
                </Input>

                <Fieldset
                  error={errors.title?.message}
                  legend='Categoria Académica'
                  style={{ border: 'none', padding: 0, margin: 0, boxShadow: 'none' }}
                  legendStyle={{
                    background: '#fff',
                    fontWeight: 'var(--bold-font-weight)',
                    fontSize: 'var(--main-font-size)',
                    color: 'var(--main-font-color)',
                    paddingBottom: 'calc(0.26rem * 0.9)',
                  }}
                >
                  <Input label='Professor Catedrático' style={{ paddingBottom: 0 }}>
                    <input type='radio' id='Professor Catedrático' value='Professor Catedratico'
                      disabled={!canCreate}
                      {...register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Input label='Professor Associado' style={{ paddingBottom: 0 }}>
                    <input type='radio' id='Professor Associado' value='Professor Associado' disabled={!canCreate}
                      {...register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Input label='Professor Auxiliar' style={{ paddingBottom: 0 }}>
                    <input type='radio' id='Professor Auxiliar' value='Professor Auxiliar' disabled={!canCreate}
                      {...register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Input label='Assistente' style={{ paddingBottom: 0 }}>
                    <input type='radio' id='Assistente' value='Assistente' disabled={!canCreate}
                      {...register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Input label='Assistente Estagiário'>
                    <input type='radio' id='Assistente Estagiário' value='Assistente Estagiario'
                      disabled={!canCreate}
                      {...register('title', { required: 'This field is riquired' })}
                    />
                  </Input>
                </Fieldset>

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
          </Row>
        </form>
      </div>
    </div>
  )
}

export default CreateCurriculum