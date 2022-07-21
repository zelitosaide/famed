import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import styles from './Publications.module.css'
import { updatePublication } from './publicationsSlice'
import { FormProvider, useForm } from 'react-hook-form'
import { AddAuthorModal } from '../../components/modal/AddAuthorModal'
import { Notification } from '../../components/notification/Notification'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Input } from '../../components/input/Input'
import { LeftArrow, RightArrow } from './arrows'
import { Chip } from '../../components/chip/Chip'

const UpdatePublication = () => {
  const [openAuthorModal, setOpenAuthorModal] = useState(false)
  const [previousAuthor, setPreviousAuthor] = useState(null)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { publicationId } = useParams()

  const publication = useSelector(state =>
    state.publications.publications.find(publication => publication._id === publicationId)
  )
  const [counterAuthor, setCounterAuthor] = useState(publication.authors.length)

  const methods = useForm({
    defaultValues: {
      ...publication, pubDate: formatDate(publication.pubDate),
      department: publication.department ? publication.department : ''
    }
  })

  if (!publication) {
    return <h2>No Publication with that ID</h2>
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate = publication.userId === currentUser.user._id || currentUser.user.roles.admin

  const admin = currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const newAutors = data.authors.filter(author => author)
      await dispatch(updatePublication({ ...data, authors: newAutors })).unwrap()

      navigate('/dashboard/publications')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  const authors = methods.watch('authors')

  return (
    <div className={`${styles.createPublication} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AddAuthorModal
              setVisible={() => setOpenAuthorModal(false)}
              visible={openAuthorModal}
              counter={counterAuthor}
              setCounter={setCounterAuthor}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              previousAuthor={previousAuthor}
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
                <Fieldset legend='Editar publicação'>
                  <Input label='Título da publicação' required error={methods.formState.errors.title?.message}>
                    <input type='text' id='Título da publicação' disabled={!canUpdate}
                      {...methods.register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Row>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='PMID' required error={methods.formState.errors.pmid?.message}>
                        <input type='text' id='PMID' disabled={!canUpdate}
                          {...methods.register('pmid', { required: 'This field is riquired' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Revista' required error={methods.formState.errors.review?.message}>
                        <input type='text' id='Revista' disabled={!canUpdate}
                          {...methods.register('review', { required: 'This field is riquired' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Data da Publicação' required
                        error={methods.formState.errors.pubDate?.message}
                      >
                        <input type='date' id='Data da Publicação' disabled={!canUpdate}
                          {...methods.register('pubDate', { required: 'This field is riquired' })}
                        />
                      </Input>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Input label='Departamento' required
                        error={methods.formState.errors.department?.message}
                      >
                        <input type='text' id='Departamento' disabled={!canUpdate}
                          {...methods.register('department', { required: 'This field is riquired' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='Link da publicação' required error={methods.formState.errors.url?.message}>
                        <input type='url' id='Link da publicação' disabled={!canUpdate}
                          placeholder='https://example.com'
                          {...methods.register('url', {
                            required: 'This field is riquired',
                            pattern: {
                              value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                              message: 'Please provide a valid URL (Example: https://example.com)'
                            }
                          })}
                        />
                      </Input>
                    </Column>
                  </Row>

                  <div
                    style={{
                      margin: '1rem 0.5rem 0.5rem',
                      borderRadius: 'var(--border-radius-small)',
                      border: '1px solid var(--main-border-color)',
                      height: '6.5rem',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      className={styles.authors}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2.1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: '0.5rem'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--main-font-size)',
                          color: 'var(--main-font-color)',
                          fontWeight: 'var(--bold-font-weight)',
                          fontFamily: 'var(--font-family)',
                        }}
                      >Autores</span>

                      <Input>
                        <button
                          disabled={!canUpdate || status === 'pending'}
                          type='button'
                          className={styles.addAuthorBtn}
                          style={{ padding: '0.2rem', borderRadius: '1rem' }}
                          onClick={() => setOpenAuthorModal(true)}
                        />
                      </Input>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        top: '2.1rem',
                        left: 0,
                        right: 0,
                        height: '2.5rem',
                        padding: '0.5rem',
                        borderBottom: '1px solid var(--divider-border-color)',
                      }}
                    >
                      {(authors.length > 1 || counterAuthor === authors.length) && (
                        <ScrollMenu
                          LeftArrow={LeftArrow}
                          RightArrow={RightArrow}
                          onWheel={onWheel}
                        // apiRef={apiRef}
                        >
                          {authors.map((value, index) => (
                            !!value &&
                            <Chip
                              key={index}
                              handleClick={() => {
                                setCounterAuthor(index)
                                methods.setValue(`authors.${index}`, value)
                                setIsEdit(true)
                                setOpenAuthorModal(true)
                                setPreviousAuthor(value)
                              }}
                              handleDelete={() => {
                                const newAuthors = authors.filter((_, i) => i !== index)
                                methods.setValue('authors', newAuthors)
                                setCounterAuthor(prevState => prevState - 1)
                              }}
                              text={value}
                            />
                          ))}
                        </ScrollMenu>
                      )}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(2.1rem + 2.5rem)',
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Row>
                        <span
                          style={{
                            fontSize: 'var(--main-font-size)',
                            color: 'var(--main-font-color)',
                            fontWeight: 'var(--main-font-weight)',
                            fontFamily: 'var(--font-family)',
                            padding: '0.5rem',
                            display: 'inline-block'
                          }}
                        >
                          {counterAuthor === authors.length ? (
                            authors.length <= 0 ? (
                              'Nenhum Autor criado'
                            ) : authors.length === 1 ? (
                              `${authors.length} Autor`
                            ) : (
                              `${authors.length} Autores`
                            )
                          ) : (
                            authors.length - 1 <= 0 ? (
                              'Nenhum Autor criado'
                            ) : authors.length - 1 === 1 ? (
                              `${authors.length - 1} Autor`
                            ) : (
                              `${authors.length - 1} Autores`
                            )
                          )}
                        </span>
                        <Input
                          style={{
                            float: 'right',
                            padding: 0,
                            '--bg-color': 'none',
                            '--bg-hover': 'none',
                            '--bg-active': 'none',
                            '--outline-color': 'none',
                          }}
                        >
                          <button style={{ color: 'rgb(27, 154, 25)', fontWeight: 'var(--bold-font-weight)' }}
                            type='button' disabled={!canUpdate || status === 'pending'}
                          >Ver todos</button>
                        </Input>
                      </Row>
                    </div>
                  </div>

                  {/* Mudancas sobre permissoes */}
                  <Input label='Publicar a Publicação no Site' style={{ display: admin ? 'block' : 'none' }}>
                    <input type='checkbox' id='Publicar a Publicação no Site'
                      {...methods.register('flags.published')}
                    />
                  </Input>

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
                      onClick={() => { navigate(-1, { replace: true }) }}
                    >Cancelar</button>
                  </Input>
                </Fieldset>
              </Column>
            </Row>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default UpdatePublication

const formatDate = (timestamp) => {
  return timestamp.split('T')[0]
}


const onWheel = (apiObj, ev) => {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext()
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev()
  }
}