import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { createNews } from './newsSlice'
import styles from './News.module.css'
import { convert2base64 } from '../projects/processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'

const CreateNews = () => {
  const [openNotification, setOpenNotification] = useState(false)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      image: '',
      pdf: '',
      department: '',
      flags: {
        home: false,
        published: true,
      },
    },
  })
  const [contentHTML, setContentHTML] = useState('')

  const departments = useSelector((state) => state.departments.departments).map(
    (d) => d.name
  )

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate =
    currentUser.user.roles.normal || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const base64Image = await convert2base64(data.image[0])
      const imageName = data.image[0].name
      const image = { imageName, base64Image }

      if (!!data.pdf) {
        const base64PDF = await convert2base64(data.pdf[0])
        const pdfName = data.pdf[0].name
        const pdf = { pdfName, base64PDF }
        await dispatch(
          createNews({
            ...data,
            contentHTML,
            image,
            pdf,
            userId: currentUser.user._id,
          })
        ).unwrap()
      } else {
        await dispatch(
          createNews({
            ...data,
            contentHTML,
            image,
            pdf: {
              pdfName: '',
              base64PDF: '',
            },
            userId: currentUser.user._id,
          })
        ).unwrap()
      }
      openAndAutoClose()
      setContentHTML('')
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
    <div className={`${styles.createNews} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Notification
            visible={openNotification}
            setVisible={setOpenNotification}
            text="Notícia criada com sucesso!"
            title="Salvo com sucesso!"
          />

          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title="Erro de cadastro"
            type="Error"
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset
                legend="Criar nova Notícia"
                style={{ minHeight: '26rem' }}
              >
                <Input
                  label="Título da Notícia"
                  required
                  error={errors.title?.message}
                >
                  <input
                    type="text"
                    id="Título da Notícia"
                    disabled={!canCreate}
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
                    disabled={!canCreate}
                    {...register('content', {
                      required: 'This field is riquired',
                    })}
                  />
                </Input>

                <ReactQuill
                  theme="snow"
                  value={contentHTML}
                  onChange={setContentHTML}
                />

                <Row>
                  <Column style={{ width: '50%' }}>
                    <Input
                      label="Departamento"
                      required
                      error={errors.department?.message}
                    >
                      <select
                        id="Departamento"
                        disabled={!canCreate}
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
                    <Input
                      label="Image da Notícia"
                      required
                      error={errors.image?.message}
                    >
                      <input
                        type="file"
                        id="Image da Notícia"
                        disabled={!canCreate}
                        {...register('image', {
                          required: 'This field is riquired',
                          validate: (value) => {
                            if (!!value) {
                              const allowedExtensions =
                                /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                              return (
                                !!allowedExtensions.exec(value[0]?.name) ||
                                'Invalid file type'
                              )
                            }
                          },
                        })}
                      />
                    </Input>
                  </Column>
                </Row>

                <Input label="PDF" error={errors.pdf?.message}>
                  <input
                    type="file"
                    id="PDF"
                    disabled={!canCreate}
                    {...register('pdf', {
                      validate: (value) => {
                        if (!!value) {
                          const allowedExtensions =
                            /\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd$/i
                          return (
                            !!allowedExtensions.exec(value[0].name) ||
                            'Invalid file type'
                          )
                        }
                      },
                    })}
                  />
                </Input>

                <Input style={{ display: 'inline-block' }}>
                  <button
                    type="submit"
                    disabled={status === 'pending' || !canCreate}
                  >
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
              <Fieldset
                legend="Criar nova Notícia"
                style={{ minHeight: '26rem' }}
              >
                {/* <Input
                  label="Resumo da Notícia"
                  required
                  error={errors.content?.message}
                >
                  <textarea
                    id="Resumo da Notícia"
                    disabled={!canCreate}
                    {...register('content', {
                      required: 'This field is riquired',
                    })}
                  />
                </Input> */}

                <ReactQuill
                  theme="snow"
                  value={contentHTML}
                  onChange={setContentHTML}
                />

                <Input style={{ display: 'inline-block' }}>
                  <button
                    type="submit"
                    disabled={status === 'pending' || !canCreate}
                  >
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

export default CreateNews
