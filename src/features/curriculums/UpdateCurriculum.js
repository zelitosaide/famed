import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from './Curriculums.module.css'
import { updateCurriculum } from './curriculumsSlice'
import { convert2base64 } from '../projects/processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'
import { FileInput2 } from '../../components/input/FileInput2'

const UpdateCurriculum = () => {
  const [status, setStatus] = useState('idle')
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { curriculumId } = useParams()

  const curriculum = useSelector(state =>
    state.curriculums.curriculums.find(curriculum => curriculum._id === curriculumId)
  )

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ...curriculum,
      pdf: typeof curriculum.pdf === 'string' ? {
        base64PDF: curriculum.pdf,
        pdfName: ''
      } : curriculum.pdf,
      image: typeof curriculum.image === 'string' ? {
        base64Image: curriculum.image,
        imageName: ''
      } : curriculum.image
    },
    mode: 'onChange'
  })

  if (!curriculum) {
    return <Navigate to='/dashboard/curriculums' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher && currentUser.user._id === curriculum.userId


  const onSubmit = async (data) => {
    try {
      setStatus('pending')

      setOpenErrorNotification(false)

      let base64Image, imageName, base64PDF, pdfName

      if (typeof data.image.base64Image !== 'string') {
        base64Image = await convert2base64(data.image.base64Image[0])
        imageName = data.image.base64Image[0].name
      } else {
        base64Image = curriculum.image.base64Image
        imageName = curriculum.image.imageName
      }

      if (typeof data.pdf.base64PDF !== 'string') {
        base64PDF = await convert2base64(data.pdf.base64PDF[0])
        pdfName = data.pdf.base64PDF[0].name
      } else {
        base64PDF = curriculum.pdf.base64PDF
        pdfName = curriculum.pdf.pdfName
      }

      await dispatch(updateCurriculum({
        ...data,
        image: {
          imageName, base64Image
        },
        pdf: {
          pdfName, base64PDF
        }
      })).unwrap()

      navigate('/dashboard/curriculums')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  const pdf = watch('pdf')
  const image = watch('image')

  return (
    <div className={`${styles.createCurriculum} ${styles.responsive}`}>
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
              <Fieldset legend='Editar Curriculum Vitae (CV)'>
                <Row>
                  <Column style={{ width: '50%' }}>
                    <FileInput2 label='PDF' required disabled={!canCreate}
                      error={errors.pdf?.base64PDF.message}
                      fileName={
                        typeof pdf?.base64PDF === 'string' ? !!pdf.pdfName ? pdf.pdfName : 'Nenhum ficheiro' : pdf?.base64PDF[0].name
                      }
                    >
                      <input id='PDF' type='file' style={{ display: 'none' }}
                        {...register('pdf.base64PDF', {
                          validate: (value) => {
                            if (!!value && typeof value !== 'string') {
                              if (!!value.length) {
                                const allowedExtensions = /\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd$/i
                                return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                              }
                            }
                          }
                        })}
                      />
                    </FileInput2>
                  </Column>
                  <Column style={{ width: '50%' }}>
                    <FileInput2 label='Image do Professor' required disabled={!canCreate}
                      error={errors.image?.base64Image.message}
                      fileName={
                        typeof image?.base64Image === 'string' ? !!image.imageName ? image.imageName : 'Nenhum ficheiro' : image?.base64Image[0].name
                      }
                    >
                      <input id='Image do Professor' type='file' style={{ display: 'none' }}
                        {...register('image.base64Image', {
                          validate: (value) => {
                            if (!!value && typeof value !== 'string') {
                              if (!!value.length) {
                                const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                                return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                              }
                            }
                          }
                        })}
                      />
                    </FileInput2>
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
          </Row>
        </form>
      </div>
    </div>
  )
}

export default UpdateCurriculum


