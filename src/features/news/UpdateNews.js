import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from './News.module.css'
import { updateNews } from './newsSlice'
import { convert2base64 } from '../projects/processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { FileInput } from '../../components/input/FileInput'
import { Notification } from '../../components/notification/Notification'

const UpdateNews = () => {
  const { newsId } = useParams()
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const news = useSelector(state =>
    state.news.news.find(news => news._id === newsId)
  )

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { ...news, department: news.department ? news.department : '' }
  })

  const image = watch('image')
  const pdf = watch('pdf')

  if (!news) {
    return <Navigate to='/dashboard/news' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate = news.userId === currentUser.user._id || currentUser.user.roles.admin

  const admin = currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)

      let base64Image, imageName, base64PDF, pdfName

      if (typeof data.image.base64Image !== 'string') {
        base64Image = await convert2base64(data.image.base64Image[0])
        imageName = data.image.base64Image[0].name
      } else {
        base64Image = news.image.base64Image
        imageName = news.image.imageName
      }

      if (typeof data.pdf.base64PDF !== 'string') {
        base64PDF = await convert2base64(data.pdf.base64PDF[0])
        pdfName = data.pdf.base64PDF[0].name
      } else {
        base64PDF = news.pdf.base64PDF
        pdfName = news.pdf.pdfName
      }

      await dispatch(updateNews({
        ...data, image: { imageName, base64Image }, pdf: {
          pdfName, base64PDF
        }
      })).unwrap()

      navigate('/dashboard/news')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className={`${styles.createNews} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de atualiza????o'
            type='Error'
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend='Editar Not??cia'>
                <Input label='T??tulo da Not??cia' required error={errors.title?.message}>
                  <input type='text' id='T??tulo da Not??cia' disabled={!canUpdate}
                    {...register('title', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Resumo da Not??cia' required error={errors.content?.message}>
                  <textarea id='Resumo da Not??cia' disabled={!canUpdate} style={{ minHeight: 30 }}
                    {...register('content', { required: 'This field is riquired' })}
                  />
                </Input>

                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input label='Departamento' required error={errors.department?.message}>
                      <select id='Departamento' disabled={!canUpdate}
                        {...register('department', { required: 'This field is riquired' })}
                      >
                        <option value='Dep. Ci??ncias Patol??gicas'>Dep. Ci??ncias Patol??gicas</option>
                        <option value='Dep. Ci??ncias Morfol??gicas'>Dep. Ci??ncias Morfol??gicas</option>
                        <option value='Dep. Microbiologia'>Dep. Microbiologia</option>
                        <option value='Dep. Patologia'>Dep. Patologia</option>
                        <option value='Dep. Sa??de da Comunidade'>Dep. Sa??de da Comunidade</option>
                        <option value='Dep. Pediatria'>Dep. Pediatria</option>
                        <option value='Dep. Medicina'>Dep. Medicina</option>
                        <option value='Dep. Cirurgia'>Dep. Cirurgia</option>
                        <option value='Dep. Ginecologia e Obstetr??cia'>Dep. Ginecologia e Obstetr??cia</option>
                      </select>
                    </Input>
                  </Column>
                  <Column style={{ width: '50%' }}>
                    <FileInput label='Image da Not??cia' required error={errors.image?.base64Image.message}
                      fileName={
                        typeof image?.base64Image === 'string' ? image.imageName : image?.base64Image[0].name
                      }
                      disabled={!canUpdate}
                    >
                      <input id='Image da Not??cia' type='file' style={{ display: 'none' }}
                        {...register('image.base64Image', {
                          validate: (value) => {
                            if (!!value) {
                              if (typeof value !== 'string') {
                                const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                                return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                              }
                            }
                          }
                        })}
                      />
                    </FileInput>
                  </Column>
                </Row>

                <FileInput label='PDF' disabled={!canUpdate} error={errors.pdf?.base64PDF.message}
                  fileName={typeof pdf?.base64PDF === 'string' ? !!pdf.pdfName ? pdf.pdfName : 'Nenhum ficheiro' : pdf?.base64PDF[0].name}
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
                </FileInput>

                {/* Mudancas sobre permissoes */}
                {admin && (
                  <Fieldset legend='Estado da Not??cia'
                    style={{ border: 'none', padding: 0, margin: '0.5rem 0 0', boxShadow: 'none' }}
                    legendStyle={{
                      background: '#fff',
                      fontWeight: 'var(--bold-font-weight)',
                      fontSize: 'var(--main-font-size)',
                      color: 'var(--main-font-color)',
                    }}
                  >
                    <Input label='Publicar Not??cia no Site' style={{ paddingBottom: 0, paddingTop: 0 }}>
                      <input type='checkbox' id='Publicar Not??cia no Site'
                        {...register('flags.published')}
                      />
                    </Input>

                    <Input label='Mover para P??gina Inicial'>
                      <input type='checkbox' id='Mover para P??gina Inicial' {...register('flags.home')} />
                    </Input>
                  </Fieldset>
                )}

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
          </Row>
        </form>
      </div>
    </div >
  )
}

export default UpdateNews