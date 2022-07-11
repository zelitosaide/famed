import { useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './Projects.module.css'
import { createProject } from './projectsSlice'
import { convert2base64, processArray } from './processData'

import { Fieldset } from '../../components/fieldset/Fieldset'
import { Column } from '../../components/column/Column'
import { Row } from '../../components/row/Row'
import { Input } from '../../components/input/Input'
import { AddFinancierModal } from '../../components/modal/AddFinancierModal'
import { AddTeamMemberModal } from '../../components/modal/AddTeamMemberModal'

const CreateProject = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      regNumBioethic: '',
      approvalDate: '',
      department: '',
      startDate: '',
      endDate: '',
      content: '',
      image: '',
      financier: {
        name: [],
        websiteUrl: ''
      },
      external: false,
      team: [],
      flags: {
        home: false,
        published: true
      }
    }
  })

  const external = useRef({})
  external.current = methods.watch('external')
  const name = methods.watch('financier.name')
  const team = methods.watch('team')

  const [openFinancierModal, setOpenFinancierModal] = useState(false)
  const [openTeamModal, setOpenTeamModal] = useState(false)






  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    console.log(data)

    // if (activeStep === 4) {
    //   try {
    //     setStatus('pending')
    //     const base64team = await processArray(data.team)
    //     const image = await convert2base64(data.image[0])
    //     const team = data.team
    //       .map(value => value.name && value.role && value.image ? value : null)
    //       .filter(value => value)

    //     for (let i = 0; i < base64team.length; i++) {
    //       team[i].image = base64team[i]
    //     }

    //     await dispatch(createProject({
    //       ...data, image, team, userId: currentUser.user._id
    //     })).unwrap()
    //     navigate('/dashboard/projects')
    //   } catch (error) {
    //     console.log('FROM Create Project', error)
    //     setActiveStep(0)
    //   } finally {
    //     setStatus('idle')
    //   }
    // }
  }

  return (
    <div className={`${styles.createProject} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AddFinancierModal
              setVisible={setOpenFinancierModal}
              visible={openFinancierModal}
              handleRemove={() => { }}
            />

            <AddTeamMemberModal
              setVisible={setOpenTeamModal}
              visible={openTeamModal}
              handleRemove={() => { }}
            />

            <Row>
              <Column style={{ width: '50%' }}>
                <Fieldset
                  legend='Criação de Projecto'
                  style={{ minHeight: '26rem', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  <Input label='Titulo do Projecto' required error={methods?.formState?.errors?.title?.message}>
                    <input
                      type='text'
                      id='Titulo do Projecto'
                      {...methods.register('title', {
                        required: 'This field is required',
                      })}
                    />
                  </Input>
                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Input label='Nº de Aprovação Ética'
                        required error={methods?.formState?.errors?.regNumBioethic?.message}>
                        <input
                          type='text'
                          id='Nº de Aprovação Ética'
                          {...methods.register('regNumBioethic', {
                            required: 'This field is required',
                          })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='Departamento'
                        required error={methods?.formState?.errors?.department?.message}>
                        <input
                          type='text'
                          id='Departamento'
                          {...methods.register('department', {
                            required: 'This field is required',
                          })}
                        />
                      </Input>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Data de Aprov. Ética'
                        required error={methods?.formState?.errors?.approvalDate?.message}>
                        <input
                          type='date'
                          id='Data de Aprov. Ética'
                          {...methods.register('approvalDate', {
                            required: 'This field is required',
                          })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Início do Projecto'
                        required error={methods?.formState?.errors?.startDate?.message}>
                        <input
                          type='date'
                          id='Início do Projecto'
                          {...methods.register('startDate', {
                            required: 'This field is required',
                          })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Fim do Projecto'
                        required error={methods?.formState?.errors?.endDate?.message}>
                        <input
                          type='date'
                          id='Fim do Projecto'
                          {...methods.register('endDate', {
                            required: 'This field is required',
                          })}
                        />
                      </Input>
                    </Column>
                  </Row>
                  <Input label='Resumo do Projecto'
                    required error={methods?.formState?.errors?.content?.message}>
                    <textarea
                      id='Resumo do Projecto'
                      {...methods.register('content', {
                        required: 'This field is required',
                      })}
                    />
                  </Input>

                  <Input style={{ display: 'inline-block' }}>
                    <button type='submit'>
                      Próximo
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
                    <button type='button'>
                      Cancelar
                    </button>
                  </Input>
                </Fieldset>
              </Column>

              <Column style={{ width: '50%' }}>
                <Fieldset
                  legend='Criação de Projecto'
                  style={{
                    minHeight: '26rem',
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                    // opacity: 0.5
                    opacity: 0.7
                  }}
                >
                  <Input label='Image do projecto'
                    required error={methods?.formState?.errors?.image?.message}>
                    <input
                      type='file'
                      id='Image do projecto'
                      {...methods.register('image', {
                        required: 'This field is required',
                      })}
                    />
                  </Input>

                  <div style={{ position: 'relative' }}>
                    <Input label='Projecto Externo' reorder
                      style={{
                        display: 'inline-block',
                        position: 'absolute',
                        top: '-2px',
                        right: 0,
                        '--outline-color': '#fff',
                      }}
                    >
                      <input type='checkbox' id='Projecto Externo' {...methods.register('external')} />
                    </Input>

                    <Input label='Link do website do Financiador'
                      error={methods?.formState?.errors?.financier?.websiteUrl?.message}>
                      <input
                        type='url'
                        id='Link do website do Financiador'
                        placeholder='https://example.com'
                        disabled={!external.current}
                        {...methods.register('financier.websiteUrl', {
                          validate: external.current
                            ? (value) => {
                              return !!value || 'This field is required'
                            }
                            : null,
                          pattern: external.current
                            ? {
                              value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                              message: 'Please provide a valid URL, e.g, (https://example.com)'
                            }
                            : null
                        })}
                      />
                    </Input>
                  </div>

                  <div
                    style={{
                      margin: '1rem 0.5rem',
                      borderRadius: 'var(--border-radius-small)',
                      border: '1px solid #D1D5DB',
                      height: '4.5rem',
                      overflow: 'hidden'
                    }}
                  >
                    <div className={styles.financierHeader}
                      style={{
                        position: 'relative',
                        padding: '0.5rem',
                        height: '2.1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--main-font-size)',
                          color: 'var(--main-font-color)',
                          fontWeight: 'var(--bold-font-weight)',
                          fontFamily: 'var(--font-family)',
                        }}
                      >
                        Financiadores
                      </span>
                      <Input style={{ padding: 0 }} >
                        <button
                          type='button'
                          className={styles.addFinancierBtn}
                          style={{ padding: '0.2rem', borderRadius: '1rem' }}
                          onClick={() => setOpenFinancierModal(true)}
                        />
                      </Input>
                    </div>

                    <div style={{ padding: '0.5rem' }}>
                      {!!name && name.map((value, index) => (
                        value &&
                        <span key={index}
                          style={{
                            marginRight: '0.5rem',
                            padding: '0.1rem',
                            fontSize: 'var(--main-font-size)',
                            color: 'var(--main-font-color)',
                            display: 'inline-block',
                            background: 'pink'
                          }}
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      margin: '1.5rem 0.5rem',
                      borderRadius: 'var(--border-radius-small)',
                      border: '1px solid #D1D5DB',
                      height: '4.5rem',
                      overflow: 'hidden'
                    }}
                  >
                    <div className={styles.financierHeader}
                      style={{
                        position: 'relative',
                        padding: '0.5rem',
                        height: '2.1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--main-font-size)',
                          color: 'var(--main-font-color)',
                          fontWeight: 'var(--bold-font-weight)',
                          fontFamily: 'var(--font-family)',
                        }}
                      >
                        Colaboradores
                      </span>
                      <Input style={{ padding: 0 }} >
                        <button
                          type='button'
                          className={styles.addFinancierBtn}
                          style={{ padding: '0.2rem', borderRadius: '1rem' }}
                          onClick={() => setOpenTeamModal(true)}
                        />
                      </Input>
                    </div>

                    <div style={{ padding: '0.5rem' }}>
                      {!!team && team.map((value, index) => (
                        value.name &&
                        <span key={index}
                          style={{
                            marginRight: '0.5rem',
                            padding: '0.1rem',
                            fontSize: 'var(--main-font-size)',
                            color: 'var(--main-font-color)',
                            display: 'inline-block',
                            background: 'pink'
                          }}
                        >
                          {value.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Fieldset>
              </Column>
            </Row>
          </form>
        </FormProvider>

        {/* <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} style={{ height: '22rem', position: 'relative' }}>
              <div style={{ height: '19rem', position: 'absolute', width: '100%' }}>
                {getStepContent(activeStep)}
              </div>

              <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <button
                  type='button'
                  disabled={activeStep === 0 || status === 'pending'}
                  onClick={() => setActiveStep(previousState => previousState - 1)}
                  style={{ position: 'absolute', left: 0 }}
                >Back</button>

                <button
                  onClick={() => {
                    navigate(-1, { replace: true })
                    setActiveStep(10)
                  }}
                  disabled={status === 'pending'}
                  style={{
                    marginLeft: '7rem',
                    background: '#C66518'
                  }}>Cancel</button>

                <button
                  type='submit'
                  onClick={handleNext}
                  style={{ position: 'absolute', right: 0 }}
                  disabled={status === 'pending' || !canCreate}
                >
                  {activeStep < 3 ? 'Next' : (
                    status === 'pending' ? 'Save...' : 'Save'
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </div> */}
      </div>
    </div >
  )
}

export default CreateProject