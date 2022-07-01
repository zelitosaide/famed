import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StepLabel, Step, Stepper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import styles from './Projects.module.css'

import FormOne from './FormOne'
import FormTwo from './FormTwo'
import FormTree from './FormTree'
import FormFour from './FormFour'
import { useDispatch } from 'react-redux'
import { createProject } from './projectsSlice'
import { convert2base64, processArray } from './processData'

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
      external: 'No',
      team: [],
      flags: {
        home: false,
        published: true
      }
    }
  })

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
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.createProject} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ position: 'relative', height: '2rem' }}>
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
        </div>

        <div>
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
        </div>
      </div>
    </div>
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