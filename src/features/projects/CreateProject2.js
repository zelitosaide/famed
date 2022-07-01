import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import FileBase from 'react-file-base64'

import { FormProvider, useForm } from 'react-hook-form'

import { createProject } from './projectsSlice'

import styles from './Projects.module.css'
import { FormFour, FormOne, FormTree, FormTwo } from './Forms'
import { StepLabel, Step, Stepper } from '@mui/material'


const initialState = {
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
  flags: {
    home: false,
    published: true
  }
}

const CreateProject = () => {
  const [activeStep, setActiveStep] = useState(0)
  const methods = useForm()

  const [formData, setFormData] = useState(initialState)
  const [member, setMember] = useState({ name: '', role: '', image: '' })
  const [isExternal, setIsExternal] = useState('no')

  const isRadioCheckek = (x) => {
    return x === isExternal
  }

  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.normal || currentUser.user.roles.admin

  const addMember = () => {
    setFormData({ ...formData, team: [...formData.team, { id: nanoid(), ...member }] })
    setMember({ name: '', role: '', image: '' })
  }

  const onCreate = async () => {
    try {
      setStatus('pending')
      await dispatch(createProject({ ...formData, userId: currentUser.user._id })).unwrap()
      navigate('/dashboard/projects')
    } catch (error) {
      console.log('FROM Create Project', error)
    } finally {
      setStatus('idle')
    }
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0: return <FormOne />
      case 1: return <FormTwo />
      case 2: return <FormTree />
      case 3: return <FormFour />
      default: break
    }
  }

  const onSubmit = (data) => {
    console.log('data', data)
  }

  const handleBack = () => {
    setActiveStep(previousState => previousState - 1)
  }

  const handleNext = async () => {
    let canProceed = false

    switch (activeStep) {
      case 0:
        canProceed = await methods.trigger([
          'title',
          'regNumBioethic',
          'approvalDate',
          'startDate',
          'endDate',
        ]);
        break;
      case 1: canProceed = await methods.trigger([
        'content',
        'projectImage'
      ]); break;
      case 2: canProceed = await methods.trigger(['financier.name']); break;
      case 3: canProceed = await methods.trigger('confirmPassword'); break;
      default: break;
    }

    if (canProceed) {
      setActiveStep(previousState => previousState + 1)
    }
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
          >
            Criar novo Projecto
          </p>
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


        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {getStepContent()}
            {activeStep === 4 ? (
              <>
                <p>Completed</p>
                <button onClick={() => setActiveStep(0)}>Reset</button>
              </>
            ) : (
              <>
                <button type='button' disabled={activeStep === 0} onClick={handleBack}>Back</button>
                <button type='button' onClick={handleNext}>{activeStep === 3 ? 'Finish' : 'Next'}</button>
              </>
            )}
          </form>
        </FormProvider>











        


        {/* <label>Image do projecto</label>
        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
        />

        <label htmlFor='financierUrl'>É Projecto Externo ?</label>
        <input
          type='radio'
          id='yes'
          name='is_external'
          value='yes'
          disabled={!canCreate}
          checked={isRadioCheckek('yes')}
          onChange={(e) => setIsExternal(e.target.value)}
        />
        <label htmlFor='yes'>Sim</label>
        <input
          type='radio'
          id='no'
          name='is_external'
          value='no'
          disabled={!canCreate}
          checked={isRadioCheckek('no')}
          onChange={(e) => setIsExternal(e.target.value)}
        />
        <label htmlFor='no'>Nao</label>

        <label htmlFor='websiteUrl'>Link do website do Financiador</label>
        <input
          type='url'
          id='websiteUrl'
          value={formData.financier.websiteUrl}
          disabled={isExternal === 'no' || !canCreate}
          onChange={(e) => setFormData({ ...formData, financier: { ...formData.financier, websiteUrl: e.target.value } })}
        />

















        

        <h3>Equipa do Projecto</h3>
        <label htmlFor='memberName'>Nome do colaborador</label>
        <input
          id='memberName'
          value={member.name}
          disabled={!canCreate}
          onChange={(e) => setMember({ ...member, name: e.target.value })}
        />

        <label htmlFor='memberRole'>Função do colaborador</label>
        <input
          id='memberRole'
          value={member.role}
          disabled={!canCreate}
          onChange={(e) => setMember({ ...member, role: e.target.value })}
        />

        <label>Foto do colaborador</label>
        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }) => setMember({ ...member, image: base64 })}
        />

        <button disabled={!canCreate} onClick={addMember}>
          Adicionar Colaborador
        </button>

        <button disabled={status === 'pending' || !canCreate} onClick={onCreate}>
          {status === 'pending' ? 'Save...' : 'Save'}
        </button> */}
      </div>
    </div>
  )
}

export default CreateProject






