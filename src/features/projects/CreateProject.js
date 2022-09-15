import { useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import styles from './Projects.module.css'
import './hideScrollbar.css'
import './firstItemMargin.css'

import { createProject } from './projectsSlice'
import { convert2base64, processArray } from './processData'

import { Fieldset } from '../../components/fieldset/Fieldset'
import { Column } from '../../components/column/Column'
import { Row } from '../../components/row/Row'
import { Input } from '../../components/input/Input'
import { AddFinancierModal } from '../../components/modal/AddFinancierModal'
import { AddTeamMemberModal } from '../../components/modal/AddTeamMemberModal'
import { Chip } from '../../components/chip/Chip'
import { LeftArrow, RightArrow } from './arrows'
import { Notification } from '../../components/notification/Notification'

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
      financiers: [],
      team: [],
      flags: {
        home: false,
        published: true
      }
    },
    mode: 'onChange',
    shouldUnregister: false
  })

  const financiers = methods.watch('financiers')
  const team = methods.watch('team')

  const [openNotification, setOpenNotification] = useState(false)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openFinancierModal, setOpenFinancierModal] = useState(false)
  const [openTeamModal, setOpenTeamModal] = useState(false)
  const [step, setStep] = useState(1)
  const fieldset = useRef()
  const [counterFinancier, setCounterFinancier] = useState(0)
  const [counterTeamMember, setCounterTeamMember] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [previousFinancier, setPreviousFinancier] = useState(null)
  const [previousTeamMember, setPreviousTeamMember] = useState(null)

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher || currentUser.user.roles.admin

  const navigate = useNavigate()
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const base64team = await processArray(data.team)
      const base64Image = await convert2base64(data.image[0])
      const imageName = data.image[0].name
      const image = { imageName, base64Image }

      const team = data.team
        .map(value => value.name && value.role && value.image ? value : null)
        .filter(value => value)
      const financiers = data.financiers
        .map(value => value.name && value.websiteUrl ? value : null)
        .filter(value => value)

      for (let i = 0; i < base64team.length; i++) {
        team[i].image = { ...team[i].image, base64Image: base64team[i] }
      }

      await dispatch(createProject({
        ...data, image, team, financiers, userId: currentUser.user._id
      })).unwrap()

      openAndAutoClose()
      setCounterFinancier(0)
      setCounterTeamMember(0)
      methods.reset()
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
    <div className={`${styles.createProject} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Notification
              visible={openNotification}
              setVisible={setOpenNotification}
              text='Cadastro efectuado com sucesso!'
              title='Salvo com sucesso!'
            />

            <Notification
              visible={openErrorNotification}
              setVisible={setOpenErrorNotification}
              text={errorMessage}
              title='Erro de cadastro'
              type='Error'
            />

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
                    minHeight: '27rem',
                    border: '1px solid var(--main-border-color)',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    position: 'relative',
                    zIndex: 10
                  }}
                  className={styles.outline}
                  tabIndex={10}
                >
                  <Input label='Titulo do Projecto' required error={methods?.formState?.errors?.title?.message}>
                    <input type='text' id='Titulo do Projecto' disabled={!canCreate}
                      {...methods.register('title', { required: 'This field is required' })}
                    />
                  </Input>
                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Input label='Nº de Aprovação Ética'
                        required error={methods?.formState?.errors?.regNumBioethic?.message}>
                        <input type='text' id='Nº de Aprovação Ética' disabled={!canCreate}
                          {...methods.register('regNumBioethic', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='Departamento' required error={methods?.formState?.errors?.department?.message}>
                        <select id='Departamento' disabled={!canCreate}
                          {...methods.register('department', { required: 'This field is required' })}
                        >
                          {/* <option value='Dep. Ciências Patológicas'>Dep. Ciências Patológicas</option> */}
                          <option value='Dep. Ciências Fisiológicas'>Dep. Ciências Fisiológicas</option>
                          <option value='Dep. Ciências Morfológicas'>Dep. Ciências Morfológicas</option>
                          <option value='Dep. Microbiologia'>Dep. Microbiologia</option>
                          <option value='Dep. Patologia'>Dep. Patologia</option>
                          <option value='Dep. Saúde da Comunidade'>Dep. Saúde da Comunidade</option>
                          <option value='Dep. Pediatria'>Dep. Pediatria</option>
                          <option value='Dep. Medicina'>Dep. Medicina</option>
                          <option value='Dep. Cirurgia'>Dep. Cirurgia</option>
                          <option value='Dep. Ginecologia e Obstetrícia'>Dep. Ginecologia e Obstetrícia</option>
                        </select>
                      </Input>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Data de Aprov. Ética'
                        required error={methods?.formState?.errors?.approvalDate?.message}>
                        <input type='date' id='Data de Aprov. Ética' disabled={!canCreate}
                          {...methods.register('approvalDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Início do Projecto'
                        required error={methods?.formState?.errors?.startDate?.message}>
                        <input type='date' id='Início do Projecto' disabled={!canCreate}
                          {...methods.register('startDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Fim do Projecto' required error={methods?.formState?.errors?.endDate?.message}>
                        <input type='date' id='Fim do Projecto' disabled={!canCreate}
                          {...methods.register('endDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                  </Row>
                  <Input label='Resumo do Projecto' required error={methods?.formState?.errors?.content?.message}>
                    <textarea id='Resumo do Projecto' disabled={!canCreate}
                      {...methods.register('content', { required: 'This field is required' })}
                    />
                  </Input>

                  <Input style={{ display: 'inline-block' }}>
                    <button type={step === 1 ? 'submit' : 'button'} disabled={status === 'pending' || !canCreate}
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
                    <button type='button' disabled={status === 'pending'}
                      onClick={() => navigate(-1, { replace: true })}
                    >
                      Cancelar
                    </button>
                  </Input>

                </Fieldset>
              </Column>

              <Column style={{ width: '50%' }}>
                <Fieldset legend='Criação de Projecto'
                  style={{
                    minHeight: '27rem',
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
                    <input type='file' id='Image do projecto'
                      disabled={step === 1 || !canCreate || status === 'pending'}
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
                          disabled={step === 1 || !canCreate || status === 'pending'}
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
                        padding: '0.5rem',
                        borderBottom: '1px solid var(--divider-border-color)',
                      }}
                    >
                      {financiers.length > 1 && (
                        <ScrollMenu
                          LeftArrow={LeftArrow}
                          RightArrow={RightArrow}
                          onWheel={onWheel}
                        // apiRef={apiRef}
                        >
                          {financiers.map((value, index) => (
                            value.name &&
                            <Chip
                              key={index}
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
                              disabled={step === 1 || status === 'pending'}
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
                            disabled={step === 1 || !canCreate || status === 'pending'}
                          >
                            Ver todos
                          </button>
                        </Input>
                      </Row>
                    </div>
                  </div>

                  <div
                    style={{
                      margin: '1.5rem 0.5rem 0.5rem',
                      borderRadius: 'var(--border-radius-small)',
                      border: '1px solid var(--main-border-color)',
                      height: '6.6rem',
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
                      >
                        Colaboradores
                      </span>
                      <Input>
                        <button
                          disabled={step === 1 || !canCreate || status === 'pending'}
                          type='button'
                          className={styles.addFinancierBtn}
                          style={{ padding: '0.2rem', borderRadius: '1rem' }}
                          onClick={() => setOpenTeamModal(true)}
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
                      {team.length > 1 && (
                        <ScrollMenu
                          LeftArrow={LeftArrow}
                          RightArrow={RightArrow}
                          onWheel={onWheel}
                        // apiRef={apiRef}
                        >
                          {team.map((value, index) => (
                            value.name &&
                            <Chip
                              key={index}
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
                              disabled={step === 1 || status === 'pending'}
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
                            disabled={step === 1 || !canCreate || status === 'pending'}
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
                    <button type='button' disabled={status === 'pending'}
                      onClick={() => navigate(-1, { replace: true })}
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
    </div >
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

export default CreateProject