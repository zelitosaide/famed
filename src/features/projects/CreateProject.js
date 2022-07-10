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

const CreateProject = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
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
  external.current = watch('external')

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

  // const handleNext = async () => {
  //   let next = false

  //   switch (activeStep) {
  //     case 0:
  //       next = await trigger(['title', 'regNumBioethic', 'approvalDate', 'startDate', 'endDate']); break
  //     case 1:
  //       next = await methods.trigger(['content', 'image']); break
  //     case 2:
  //       next = await methods.trigger(['financier.name']); break
  //     case 3:
  //       next = true; break
  //     default: break
  //   }

  //   if (next) setActiveStep(previousState => previousState + 1)
  // }

  return (
    <div className={`${styles.createProject} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Input label='Departamento' required>
                      <input type='text' />
                    </Input>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: '33.33%' }}>
                    <Input label='Data de Aprov. Ética' required>
                      <input type='date' />
                    </Input>
                  </Column>
                  <Column style={{ width: '33.33%' }}>
                    <Input label='Início do Projecto' required>
                      <input type='date' />
                    </Input>
                  </Column>
                  <Column style={{ width: '33.33%' }}>
                    <Input label='Fim do Projecto' required>
                      <input type='date' />
                    </Input>
                  </Column>
                </Row>
                <Input label='Resumo do Projecto' required>
                  <textarea />
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
                style={{ minHeight: '26rem', borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              >
                <Input label='Image do projecto' required>
                  <input type='file' />
                </Input>

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
                      {...register('external')}
                    />
                  </Input>

                  <Input label='Link do website do Financiador' error={errors.financier?.websiteUrl?.message}>
                    <input
                      type='url'
                      id='Link do website do Financiador'
                      disabled={!external.current}
                      {...register('financier.websiteUrl', {
                        validate: (value) => {
                          return (!external.current && !!value) || 'This field is required'
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
        </form>

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