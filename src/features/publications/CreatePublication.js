import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import styles from './Publications.module.css'
import { createPublication } from './publicationsSlice'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { AddAuthorModal } from '../../components/modal/AddAuthorModal'
import { Chip } from '../../components/chip/Chip'
import { LeftArrow, RightArrow } from './arrows'
import { Notification } from '../../components/notification/Notification'

const CreatePublication = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      pmid: '',
      review: '',
      url: '',
      pubDate: '',
      authors: [],
      department: '',
      flags: {
        home: false,
        published: true
      }
    },
    mode: 'onChange'
  })

  const [openAuthorModal, setOpenAuthorModal] = useState(false)
  const [counterAuthor, setCounterAuthor] = useState(0)
  const [previousAuthor, setPreviousAuthor] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const authors = methods.watch('authors')

  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const departments = useSelector(state => state.departments.departments).map(d => d.name)

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const newAutors = data.authors.filter(author => author)

      await dispatch(createPublication({
        ...data,
        authors: newAutors,
        userId: currentUser.user._id
      })).unwrap()

      setCounterAuthor(0)
      methods.reset()
      openAndAutoClose()
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

  console.log('authors', methods.getValues())

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
              visible={openNotification}
              setVisible={setOpenNotification}
              text='Publicação criada com sucesso!'
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
                <Fieldset legend='Criar nova Publicação'>
                  <Input label='Título da publicação' required error={methods.formState.errors.title?.message}>
                    <input type='text' id='Título da publicação' disabled={!canCreate}
                      {...methods.register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Row>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='PMID' required error={methods.formState.errors.pmid?.message}>
                        <input type='text' id='PMID' disabled={!canCreate}
                          {...methods.register('pmid', { required: 'This field is riquired' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Revista' required error={methods.formState.errors.review?.message}>
                        <input type='text' id='Revista' disabled={!canCreate}
                          {...methods.register('review', { required: 'This field is riquired' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Data da Publicação' required
                        error={methods.formState.errors.pubDate?.message}
                      >
                        <input type='date' id='Data da Publicação' disabled={!canCreate}
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
                        <select id='Departamento' disabled={!canCreate}
                          {...methods.register('department', { required: 'This field is riquired' })}
                        >
                          {departments.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                          {/* <option value='Dep. Ciências Fisiológicas'>Dep. Ciências Fisiológicas</option>
                          <option value='Dep. Ciências Morfológicas'>Dep. Ciências Morfológicas</option>
                          <option value='Dep. Microbiologia'>Dep. Microbiologia</option>
                          <option value='Dep. Patologia'>Dep. Patologia</option>
                          <option value='Dep. Saúde da Comunidade'>Dep. Saúde da Comunidade</option>
                          <option value='Dep. Pediatria'>Dep. Pediatria</option>
                          <option value='Dep. Medicina'>Dep. Medicina</option>
                          <option value='Dep. Cirurgia'>Dep. Cirurgia</option>
                          <option value='Dep. Ginecologia e Obstetrícia'>Dep. Ginecologia e Obstetrícia</option> */}
                        </select>
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='Link da publicação' required error={methods.formState.errors.url?.message}>
                        <input type='url' id='Link da publicação' disabled={!canCreate}
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
                          disabled={!canCreate}
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
                      {authors.length > 1 && (
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
                          {authors.length - 1 <= 0 ? (
                            'Nenhum Autor criado'
                          ) : authors.length - 1 === 1 ? (
                            `${authors.length - 1} Autor`
                          ) : (
                            `${authors.length - 1} Autores`
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
                          <button
                            style={{
                              color: 'rgb(27, 154, 25)',
                              fontWeight: 'var(--bold-font-weight)'
                            }}
                            type='button'
                            disabled={!canCreate}
                          >
                            Ver todos
                          </button>
                        </Input>
                      </Row>
                    </div>
                  </div>

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
                      onClick={() => { navigate(-1, { replace: true }) }}
                    >
                      Cancelar
                    </button>
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

export default CreatePublication




