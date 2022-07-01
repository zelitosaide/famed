import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { StepLabel, Step, Stepper } from '@mui/material'

import styles from './Projects.module.css'
import FormOne from './FormOne'
import FormTwoUpdate from './FormTwoUpdate'
import FormTree from './FormTree'
import { updateProject } from './projectsSlice'
import FormFourUpdate from './FormFourUpdate'
import { convert2base64, processArray2 } from './processData'


const UpdateProject = () => {
  const { projectId } = useParams()

  const project = useSelector(state =>
    state.projects.projects.find(project => project._id === projectId)
  )

  const [activeStep, setActiveStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate = project.userId === currentUser.user._id || currentUser.user.roles.admin

  const methods = useForm({
    defaultValues: {
      ...project,
      approvalDate: formatDate(project.approvalDate),
      startDate: formatDate(project.startDate),
      endDate: formatDate(project.endDate),
      image: '',
      external: project.financier.websiteUrl ? 'Yes' : 'No',
      home: project.flags.home,  
      published: project.flags.published
    }
  })

  if (!project) {
    return <Navigate to='/dashboard/projects' replace />
  }

  const onSubmit = async (data) => {
    try {
      setStatus('pending')

      const base64team = await processArray2(data.team)
      const team = data.team
        .map(value => value.name && value.role && value.image ? value : null)
        .filter(value => value)

      for (let i = 0; i < base64team.length; i++) {
        team[i].image = base64team[i]
      }

      let image

      if (!!data.image) {
        image = await convert2base64(data.image[0])
      } else {
        image = project.image
      }

      await dispatch(updateProject({ 
        ...data, 
        image, 
        team,
        flags: { home: data.home, published: data.published} 
      })).unwrap()
      
      navigate('/dashboard/projects')
    } catch (error) {
      console.log('FROM Update Project', error)
    } finally {
      setStatus('idle')
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
          >Editar Projecto</p>

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
            <form onSubmit={methods.handleSubmit(onSubmit)} style={{ height: '26.5rem', position: 'relative' }}>
              <div style={{ height: '19rem', position: 'absolute', width: '100%' }}>
                {getStepContent(activeStep)}
              </div>

              <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <button
                  type='button'
                  disabled={activeStep === 0 || activeStep === 3 || status === 'pending'}
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
                  type={activeStep === 4 ? 'submit' : 'button'}
                  onClick={handleNext}
                  style={{ position: 'absolute', right: 0 }}
                  disabled={status === 'pending' || !canUpdate}
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

export default UpdateProject


const getStepContent = (index) => {
  switch (index) {
    case 0: return <FormOne />
    case 1: return <FormTwoUpdate />
    case 2: return <FormTree />
    case 3: return <FormFourUpdate />
    default: break
  }
}

const formatDate = (timestamp) => {
  return timestamp.split('T')[0]
}