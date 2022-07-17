import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StepLabel, Step, Stepper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import styles from './Projects.module.css'
import FormOne from './FormOne'
import FormTwo from './FormTwo'
import FormTree from './FormTree'
import FormFour from './FormFour'
import { createProject } from './projectsSlice'
import { convert2base64, processArray } from './processData'

import { Fieldset } from '../../components/fieldset/Fieldset'
import { Column } from '../../components/column/Column'
import { Row } from '../../components/row/Row'
import { Input } from '../../components/input/Input'

 // allowedExtensions = /\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd$/i

const CreateProject = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      regNumBioethic: '',
      approvalDate: '',
      startDate: '',
      endDate: '',
      content: '',
      image: '',
      financier: {
        name: '',
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

  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    if (activeStep === 4) {
      try {
        setStatus('pending')
        const base64team = await processArray(data.team)
        const image = await convert2base64(data.image[0])
        const team = data.team
          .map(value => value.name && value.role && value.image ? value : null)
          .filter(value => value)

        for (let i = 0; i < base64team.length; i++) {
          team[i].image = base64team[i]
        }

        await dispatch(createProject({
          ...data, image, team, userId: currentUser.user._id
        })).unwrap()
        navigate('/dashboard/projects')
      } catch (error) {
        console.log('FROM Create Project', error)
        setActiveStep(0)
      } finally {
        setStatus('idle')
      }
    }
  }

  const handleNext = async () => {
    let next = false

    switch (activeStep) {
      case 0:
        next = await methods.trigger(['title', 'regNumBioethic', 'approvalDate', 'startDate', 'endDate']); break
      case 1:
        next = await methods.trigger(['content', 'image']); break
      case 2:
        next = await methods.trigger(['financier.name']); break
      case 3:
        next = true; break
      default: break
    }

    if (next) setActiveStep(previousState => previousState + 1)
  }

  return (
    <div className={`${styles.createProject} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>

        <Row>
          <Column style={{ width: '50%' }}>
            <Fieldset
              legend='Criação de Projecto'
              style={{ minHeight: '26rem', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              <Input label='Titulo do Projecto' required>
                <input type='text' />
              </Input>
              <Row>
                <Column style={{ width: '50%' }}>
                  <Input label='Nº de Aprovação Ética' required>
                    <input type='text' />
                  </Input>
                </Column>
                <Column style={{ width: '50%' }}>
                  <Input label='Data de Aprov. Ética' required>
                    <input type='date' />
                  </Input>
                </Column>
              </Row>
              <Row>
                <Column style={{ width: '50%' }}>
                  <Input label='Data de Início do Projecto' required>
                    <input type='date' />
                  </Input>
                </Column>
                <Column style={{ width: '50%' }}>
                  <Input label='Data de Fim do Projecto' required>
                    <input type='date' />
                  </Input>
                </Column>
              </Row>
              <Input label='Resumo do Projecto' required>
                <textarea />
              </Input>

              <Input style={{ display: 'inline-block' }}>
                <button type='button'>
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
              style={{ minHeight: '26rem', borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
            >
              <Row>
                <Column style={{ width: '50%', }}>
                  <Input label='Image do projecto' required>
                    <input type='file' />
                  </Input>
                </Column>
                <Column style={{ width: '50%' }}>
                  <Input label='Departamento' required>
                    <input type='text' />
                  </Input>
                </Column>
              </Row>

              <div style={{ position: 'relative' }}>
                <Input
                  style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: '-2px',
                    right: 0,
                    '--outline-color': '#fff',
                  }}
                  label='Projecto Externo'
                  reorder
                >
                  <input
                    type='checkbox'
                    id='Projecto Externo'
                    {...methods.register('external')}
                  />
                </Input>

                <Input label='Link do website do Financiador' error={methods.formState.errors.financier.websiteUrl?.message}>
                  <input
                    type='url'
                    id='Link do website do Financiador'
                    disabled={!external.current}
                    {...methods.register('financier.websiteUrl', {
                      validate: () => {
                        return !external.current || 'The passwords do not match'
                      }
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
                      className={styles.addFinancierBtn}
                      style={{ padding: '0.2rem', borderRadius: '1rem' }}
                    />
                  </Input>
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
                      className={styles.addFinancierBtn}
                      style={{ padding: '0.2rem', borderRadius: '1rem' }}
                    />
                  </Input>
                </div>
              </div>
            </Fieldset>
          </Column>
        </Row>


        {/* <div style={{ position: 'relative', height: '2rem' }}>
          <p
            style={{ position: 'absolute', width: '60%', }}
            className={styles.title}
          >Criar novo Projecto</p>

          <div style={{ position: 'absolute', width: '40%', right: 0, paddingTop: '0.3rem' }}>
            <Stepper activeStep={activeStep}>
              <Step style={{ paddingLeft: 0 }}>
                <StepLabel>First</StepLabel>
              </Step>
              <Step>
                <StepLabel>Second</StepLabel>
              </Step>
              <Step style={{ paddingRight: 0 }}>
                <StepLabel>Third</StepLabel>
              </Step>
              <Step style={{ paddingRight: 0 }}>
                <StepLabel>Fouth</StepLabel>
              </Step>
            </Stepper>
          </div>
        </div> */}

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

const getStepContent = (index) => {
  switch (index) {
    case 0: return <FormOne />
    case 1: return <FormTwo />
    case 2: return <FormTree />
    case 3: return <FormFour />
    default: break
  }
}



 return (
    <div className={`${styles.createProject} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AddFinancierModal
              setVisible={() => setOpenFinancierModal(false)}
              visible={openFinancierModal}
              counter={counterFinancier}
              setCounter={setCounterFinancier}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              previousFinancier={previousFinancier}
            />

            <AddTeamMemberModal
              setVisible={() => setOpenTeamModal(false)}
              visible={openTeamModal}
              counter={counterTeamMember}
              setCounter={setCounterTeamMember}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              previousTeamMember={previousTeamMember}
            />

            <Row>
              <Column style={{ width: '50%' }}>
                <Fieldset legend='Criação de Projecto'
                  style={{
                    minHeight: '26rem',
                    border: '1px solid var(--main-border-color)',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    position: 'relative',
                    zIndex: 10
                  }}
                  className={styles.outline}
                  tabIndex={10}
                >
                  <Input label='Titulo do Projecto' required error={methods?.formState?.errors?.title?.message}>
                    <input type='text' id='Titulo do Projecto'
                      style={{ border: '1px solid var(--main-border-color)' }}
                      {...methods.register('title', { required: 'This field is required' })}
                    />
                  </Input>
                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Input label='Nº de Aprovação Ética'
                        required error={methods?.formState?.errors?.regNumBioethic?.message}>
                        <input type='text' id='Nº de Aprovação Ética'
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('regNumBioethic', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='Departamento' required error={methods?.formState?.errors?.department?.message}>
                        <input type='text' id='Departamento'
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('department', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Data de Aprov. Ética'
                        required error={methods?.formState?.errors?.approvalDate?.message}>
                        <input type='date' id='Data de Aprov. Ética'
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('approvalDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Início do Projecto'
                        required error={methods?.formState?.errors?.startDate?.message}>
                        <input type='date' id='Início do Projecto'
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('startDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Fim do Projecto' required error={methods?.formState?.errors?.endDate?.message}>
                        <input type='date' id='Fim do Projecto'
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('endDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                  </Row>
                  <Input label='Resumo do Projecto' required error={methods?.formState?.errors?.content?.message}>
                    <textarea id='Resumo do Projecto'
                      style={{ border: '1px solid var(--main-border-color)' }}
                      {...methods.register('content', { required: 'This field is required' })}
                    />
                  </Input>

                  <Input style={{ display: 'inline-block' }}>
                    <button type={step === 1 ? 'submit' : 'button'} disabled={status === 'pending'}
                      onClick={async () => {
                        const continuar = await methods.trigger([
                          'content',
                          'endDate',
                          'startDate',
                          'approvalDate',
                          'department',
                          'regNumBioethic',
                          'title'
                        ], { shouldFocus: true })

                        if (continuar) {
                          setStep(2)
                          fieldset.current.focus()
                        }
                      }}
                    >Continuar</button>
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
                    <button type='button' disabled={status === 'pending'}>
                      Cancelar
                    </button>
                  </Input>

                </Fieldset>
              </Column>

              <Column style={{ width: '50%' }}>
                <Fieldset legend='Criação de Projecto'
                  style={{
                    minHeight: '26rem',
                    position: 'relative',
                    border: '1px solid var(--main-border-color)',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    marginRight: 0,
                    marginLeft: '1rem',
                    zIndex: 10,
                  }}
                  className={step === 2 ? styles.outline : undefined}
                  tabIndex={10}
                  ref={fieldset}
                >
                  <Input label='Image do projecto' required error={methods?.formState?.errors?.image?.message}>
                    <input type='file' id='Image do projecto' disabled={step === 1}
                      style={{ border: '1px solid var(--main-border-color)' }}
                      {...methods.register('image', {
                        required: {
                          value: step === 2,
                          message: 'This field is required'
                        },
                        validate: (value) => {
                          if (!!value) {
                            const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                            return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                          }
                        }
                      })}
                    />
                  </Input>

                  <div
                    style={{
                      margin: '1rem 0.5rem',
                      borderRadius: 'var(--border-radius-small)',
                      border: '1px solid var(--main-border-color)',
                      height: '6.5rem',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      className={styles.financierHeader}
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
                      >Financiadores</span>

                      <Input>
                        <button
                          disabled={step === 1}
                          type='button'
                          className={styles.addFinancierBtn}
                          style={{ padding: '0.2rem', borderRadius: '1rem' }}
                          onClick={() => setOpenFinancierModal(true)}
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
                        borderBottom: '1px solid var(--divider-border-color)',
                      }}
                    >
                      <ScrollMenu

                      >

                      </ScrollMenu>
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
                          {financiers.length - 1 <= 0 ? (
                            'Nenhum Financiador criado'
                          ) : financiers.length - 1 === 1 ? (
                            `${financiers.length - 1} Financiador`
                          ) : (
                            `${financiers.length - 1} Financiadores`
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
                            disabled={step === 1}
                          >
                            Ver todos
                          </button>
                        </Input>
                      </Row>
                    </div>






                    {/* <div
                      style={{
                        padding: '0.5rem',
                        height: '2.5rem',
                        
                        background: 'pink',
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        zIndex: 5000
                      }}
                    >
                      <ScrollMenu
                        LeftArrow={LeftArrow}
                        RightArrow={RightArrow}
                        style={{ background: 'red' }}
                      >
                        {!!financiers && financiers.map((value, index) => (
                          value.name &&
                          <Chip
                            key={index}
                            style={{ marginRight: '0.4rem', marginBottom: '0.3rem' }}
                            handleClick={() => {
                              setCounterFinancier(index)
                              methods.setValue(`financiers.${index}`, value)
                              setIsEdit(true)
                              setOpenFinancierModal(true)
                              setPreviousFinancier(value)
                            }}
                            handleDelete={() => {
                              const newFinanciers = financiers.filter((_, i) => i !== index)
                              methods.setValue('financiers', newFinanciers)
                              setCounterFinancier(prevState => prevState - 1)
                            }}
                            text={value.name}
                            disabled={step === 1}
                          />
                        ))}
                      </ScrollMenu>
                    </div> */}

                    {/* <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, background: 'green' }}>
                      
                    </div> */}
                  </div>

                  <div
                    style={{
                      margin: '1.5rem 0.5rem 0.5rem',
                      borderRadius: 'var(--border-radius-small)',
                      border: '1px solid var(--main-border-color)',
                      height: '6.6rem',
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
                          disabled={step === 1}
                          type='button'
                          className={styles.addFinancierBtn}
                          style={{ padding: '0.2rem', borderRadius: '1rem' }}
                          onClick={() => setOpenTeamModal(true)}
                        />
                      </Input>
                    </div>

                    <div
                      style={{
                        padding: '0.5rem',
                        height: '2.5rem',
                        borderBottom: '1px solid var(--divider-border-color)'
                      }}
                    >
                      {!!team && team.map((value, index) => (
                        value.name &&
                        <Chip
                          key={index}
                          style={{ marginRight: '0.4rem', marginBottom: '0.3rem' }}
                          handleClick={() => {
                            setCounterTeamMember(index)
                            methods.setValue(`team.${index}`, value)
                            setIsEdit(true)
                            setOpenTeamModal(true)
                            setPreviousTeamMember(value)
                          }}
                          handleDelete={() => {
                            const newTeam = team.filter((_, i) => i !== index)
                            methods.setValue('team', newTeam)
                            setCounterTeamMember(prevState => prevState - 1)
                          }}
                          text={value.name}
                          disabled={step === 1}
                        />
                      ))}
                    </div>

                    <div>
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
                          {team.length - 1 <= 0 ? (
                            'Nenhum Colaborador criado'
                          ) : team.length - 1 === 1 ? (
                            `${team.length - 1} Colaborador`
                          ) : (
                            `${team.length - 1} Colaboradores`
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
                            disabled={step === 1}
                          >
                            Ver todos
                          </button>
                        </Input>
                      </Row>
                    </div>
                  </div>

                  <Input style={{ display: 'inline-block' }}>
                    <button type='submit' disabled={step === 1 || status === 'pending' || !canCreate}>
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
                    <button type='button' disabled={step === 1 || status === 'pending'}>
                      Cancelar
                    </button>
                  </Input>
                </Fieldset>
              </Column>
            </Row>
          </form>
        </FormProvider>
      </div>
    </div >
  )