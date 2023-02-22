import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import styles from './News.module.css'
import { updateNews } from './newsSlice'
import { convert2base64 } from '../projects/processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'
import { FileInput2 } from '../../components/input/FileInput2'

const UpdateNews = () => {
  const { newsId } = useParams()
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const news = useSelector((state) =>
    state.news.news.find((news) => news._id === newsId)
  )

  const departments = useSelector((state) => state.departments.departments).map(
    (d) => d.name
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...news,
      department: news.department ? news.department : '',
    },
  })

  const image = watch('image')
  const pdf = watch('pdf')
  const [contentHTML, setContentHTML] = useState(
    news.contentHTML ? news.contentHTML : news.content
  )

  if (!news) {
    return <Navigate to="/dashboard/news" replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate =
    news.userId === currentUser.user._id || currentUser.user.roles.admin

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

      await dispatch(
        updateNews({
          ...data,
          contentHTML,
          image: { imageName, base64Image },
          pdf: {
            pdfName,
            base64PDF,
          },
        })
      ).unwrap()

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
            title="Erro de atualização"
            type="Error"
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend="Editar Notícia">
                <Input
                  label="Título da Notícia"
                  required
                  error={errors.title?.message}
                >
                  <input
                    type="text"
                    id="Título da Notícia"
                    disabled={!canUpdate}
                    {...register('title', {
                      required: 'This field is riquired',
                    })}
                  />
                </Input>

                <Input
                  label="Resumo da Notícia"
                  required
                  error={errors.content?.message}
                >
                  <textarea
                    id="Resumo da Notícia"
                    disabled={!canUpdate}
                    style={{ minHeight: 30 }}
                    {...register('content', {
                      required: 'This field is riquired',
                    })}
                  />
                </Input>

                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input
                      label="Departamento"
                      required
                      error={errors.department?.message}
                    >
                      <select
                        id="Departamento"
                        disabled={!canUpdate}
                        {...register('department', {
                          required: 'This field is riquired',
                        })}
                      >
                        {departments.map((value, index) => (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </Input>
                  </Column>
                  <Column style={{ width: '50%' }}>
                    <FileInput2
                      label="Image da Notícia"
                      required
                      error={errors.image?.base64Image.message}
                      fileName={
                        typeof image?.base64Image === 'string'
                          ? image.imageName
                          : image?.base64Image[0].name
                      }
                      disabled={!canUpdate}
                    >
                      <input
                        id="Image da Notícia"
                        type="file"
                        style={{ display: 'none' }}
                        {...register('image.base64Image', {
                          validate: (value) => {
                            if (!!value) {
                              if (typeof value !== 'string') {
                                const allowedExtensions =
                                  /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                                return (
                                  !!allowedExtensions.exec(value[0].name) ||
                                  'Invalid file type'
                                )
                              }
                            }
                          },
                        })}
                      />
                    </FileInput2>
                  </Column>
                </Row>

                <FileInput2
                  label="PDF"
                  disabled={!canUpdate}
                  error={errors.pdf?.base64PDF.message}
                  fileName={
                    typeof pdf?.base64PDF === 'string'
                      ? !!pdf.pdfName
                        ? pdf.pdfName
                        : 'Nenhum ficheiro'
                      : pdf?.base64PDF[0].name
                  }
                >
                  <input
                    id="PDF"
                    type="file"
                    style={{ display: 'none' }}
                    {...register('pdf.base64PDF', {
                      validate: (value) => {
                        if (!!value && typeof value !== 'string') {
                          if (!!value.length) {
                            const allowedExtensions =
                              /\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd$/i
                            return (
                              !!allowedExtensions.exec(value[0].name) ||
                              'Invalid file type'
                            )
                          }
                        }
                      },
                    })}
                  />
                </FileInput2>

                {/* Mudancas sobre permissoes */}
                {admin && (
                  <Fieldset
                    legend="Estado da Notícia"
                    style={{
                      border: 'none',
                      padding: 0,
                      margin: '0.5rem 0 0',
                      boxShadow: 'none',
                    }}
                    legendStyle={{
                      background: '#fff',
                      fontWeight: 'var(--bold-font-weight)',
                      fontSize: 'var(--main-font-size)',
                      color: 'var(--main-font-color)',
                    }}
                  >
                    <Input
                      label="Publicar Notícia no Site"
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <input
                        type="checkbox"
                        id="Publicar Notícia no Site"
                        {...register('flags.published')}
                      />
                    </Input>

                    <Input label="Mover para Página Inicial">
                      <input
                        type="checkbox"
                        id="Mover para Página Inicial"
                        {...register('flags.home')}
                      />
                    </Input>
                  </Fieldset>
                )}

                <Input style={{ display: 'inline-block' }}>
                  <button
                    type="submit"
                    disabled={status === 'pending' || !canUpdate}
                  >
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
                  <button
                    type="button"
                    disabled={status === 'pending'}
                    onClick={() => navigate(-1, { replace: true })}
                  >
                    Cancelar
                  </button>
                </Input>
              </Fieldset>
            </Column>

            <Column style={{ width: '50%' }}>
              <Fieldset legend="Editar Notícia">
                <ReactQuill
                  theme="snow"
                  value={contentHTML}
                  onChange={setContentHTML}
                />

                <Input style={{ display: 'inline-block' }}>
                  <button
                    type="submit"
                    disabled={status === 'pending' || !canUpdate}
                  >
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
                  <button
                    type="button"
                    disabled={status === 'pending'}
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

export default UpdateNews
