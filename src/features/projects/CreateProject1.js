import { StepLabel, Step, Stepper } from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormFour, FormOne, FormTree, FormTwo } from './Forms'

import styles from './Projects.module.css'

const CreateProject = () => {
  const [activeStep, setActiveStep] = useState(0)
  const methods = useForm({
    defaultValues: {
      title: '',
      regNumBioethic: '',
      approvalDate: '',
      startDate: '',
      endDate: '',
      content: '',
      image: '',
      team: [],
      financier: {
        name: '',
        websiteUrl: ''
      },
      external: 'No',
      flags: {
        home: false,
        published: true
      }
    }
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleBack = () => {
    setActiveStep(previousState => previousState - 1)
  }

  const handleNext = async () => {
    let canProceed = false

    switch (activeStep) {
      case 0: canProceed = await methods.trigger(
        [
          'deepNestedInput',
          'regNumBioethic',
          'approvalDate',
          'startDate',
          'endDate',
        ]
      ); break;

      case 1: canProceed = await methods.trigger(
        [
          'content',
          'projectImage'
        ]
      ); break;

      case 2: canProceed = await methods.trigger(
        [
          'financier.name',
        ]
      ); break;

      case 3: canProceed = await methods.trigger(
        [
          'financier.name',
        ]
      ); break;

      default: break
    }

    if (canProceed) setActiveStep(previousState => previousState + 1)
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
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div style={{ height: '19rem' }}>
                {getStepContent(activeStep)}
              </div>

              <div style={{ position: 'relative', marginTop: '0.8rem' }}>
                <button
                  type='button'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ position: 'absolute', left: 0 }}
                >Back</button>

                {activeStep < 4 &&
                  <button
                    type='submit'
                    onClick={handleNext}
                    style={{ position: 'absolute', right: 0 }}
                  >Next</button>
                }
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