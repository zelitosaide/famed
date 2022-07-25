import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import styles from './Projects.module.css'
import { updateProject } from './projectsSlice'
import { convert2base64, processArray } from './processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { FileInput } from '../../components/input/FileInput'
import { LeftArrow, RightArrow } from './arrows'
import { Chip } from '../../components/chip/Chip'
import { AddFinancierModal } from '../../components/modal/AddFinancierModal'
import { AddTeamMemberModal } from '../../components/modal/AddTeamMemberModal'
import { Notification } from '../../components/notification/Notification'


const UpdateProject = () => {
  const fieldset = useRef()
  const { projectId } = useParams()

  const project = useSelector(state =>
    state.projects.projects.find(project => project._id === projectId)
  )

  const [counterFinancier, setCounterFinancier] = useState(project.financiers.length)
  const [isEdit, setIsEdit] = useState(false)
  const [openFinancierModal, setOpenFinancierModal] = useState(false)
  const [previousFinancier, setPreviousFinancier] = useState(null)
  const [openTeamModal, setOpenTeamModal] = useState(false)
  const [counterTeamMember, setCounterTeamMember] = useState(project.team.length)
  const [previousTeamMember, setPreviousTeamMember] = useState(null)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
      image: typeof project.image === 'string' ? {
        imageName: '',
        base64Image: project.image
      } : project.image,
      financiers: project.financier ? [project.financier] : project.financiers
    },
    mode: 'onChange'
  })

  if (!project) {
    return <Navigate to='/dashboard/projects' replace />
  }

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const base64team = await processArray(data.team)

      const team = data.team
        .map(value => value.name && value.role && value.image ? value : null)
        .filter(value => value)
      const financiers = data.financiers
        .map(value => value.name ? value : null)
        .filter(value => value)

      let base64Image, imageName

      if (typeof data.image.base64Image !== 'string') {
        base64Image = await convert2base64(data.image.base64Image[0])
        imageName = data.image.base64Image[0].name
      } else {
        base64Image = project.image.base64Image
        imageName = project.image.imageName
      }

      for (let i = 0; i < base64team.length; i++) {
        team[i].image = { ...team[i].image, base64Image: base64team[i] }
      }

      await dispatch(updateProject({ ...data, image: { imageName, base64Image }, financiers, team })).unwrap()

      navigate('/dashboard/projects')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  const image = methods.watch('image')
  const financiers = methods.watch('financiers')
  const team = methods.watch('team')

  return (
    <div className={`${styles.createProject} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} style={{ height: '26.5rem', position: 'relative' }}>
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

            <Notification
              visible={openErrorNotification}
              setVisible={setOpenErrorNotification}
              text={errorMessage}
              title='Erro de atualização'
              type='Error'
            />

            <Row>
              <Column style={{ width: '50%' }}>
                <Fieldset legend='Editar Projecto'
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
                    <input type='text' id='Titulo do Projecto' disabled={!canUpdate}
                      style={{ border: '1px solid var(--main-border-color)' }}
                      {...methods.register('title', { required: 'This field is required' })}
                    />
                  </Input>

                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Input label='Nº de Aprovação Ética'
                        required error={methods?.formState?.errors?.regNumBioethic?.message}>
                        <input type='text' id='Nº de Aprovação Ética' disabled={!canUpdate}
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('regNumBioethic', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='Departamento' required error={methods?.formState?.errors?.department?.message}>
                        <select id='Departamento' disabled={!canUpdate}
                          {...methods.register('department', { required: 'This field is required' })}
                        >
                          <option value='Dep. Ciências Patológicas'>Dep. Ciências Patológicas</option>
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
                        <input type='date' id='Data de Aprov. Ética' disabled={!canUpdate}
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('approvalDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Início do Projecto'
                        required error={methods?.formState?.errors?.startDate?.message}>
                        <input type='date' id='Início do Projecto' disabled={!canUpdate}
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('startDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '33.33%' }}>
                      <Input label='Fim do Projecto' required error={methods?.formState?.errors?.endDate?.message}>
                        <input type='date' id='Fim do Projecto' disabled={!canUpdate}
                          style={{ border: '1px solid var(--main-border-color)' }}
                          {...methods.register('endDate', { required: 'This field is required' })}
                        />
                      </Input>
                    </Column>
                  </Row>

                  <Input label='Resumo do Projecto' required error={methods?.formState?.errors?.content?.message}>
                    <textarea id='Resumo do Projecto' disabled={!canUpdate}
                      style={{ border: '1px solid var(--main-border-color)' }}
                      {...methods.register('content', { required: 'This field is required' })}
                    />
                  </Input>

                  <Input style={{ display: 'inline-block' }}>
                    <button type='button' disabled={status === 'pending' || !canUpdate}
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
                    >Cancelar</button>
                  </Input>
                </Fieldset>
              </Column>

              <Column style={{ width: '50%' }}>
                <Fieldset legend='Editar Projecto'
                  style={{
                    minHeight: '27rem',
                    position: 'relative',
                    border: '1px solid var(--main-border-color)',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    marginRight: 0,
                    marginLeft: '1rem',
                    zIndex: 10,
                  }}
                  className={styles.outline}
                  tabIndex={10}
                  ref={fieldset}
                >
                  <FileInput label='Image do projecto' required disabled={!canUpdate || status === 'pending'}
                    error={methods.formState.errors?.image?.base64Image.message}
                    fileName={
                      typeof image?.base64Image === 'string' ? image.imageName : image?.base64Image[0].name
                    }
                  >
                    <input type='file' id='Image do projecto'
                      style={{ display: 'none' }}
                      {...methods.register('image.base64Image', {
                        validate: (value) => {
                          if (!!value) {
                            if (typeof value !== 'string') {
                              const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                              return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                            }
                          }
                        }
                      })}
                    />
                  </FileInput>

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
                          disabled={!canUpdate || status === 'pending'}
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
                      {(financiers.length > 1 || counterFinancier === financiers.length) && (
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
                              disabled={status === 'pending'}
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
                          {counterFinancier === financiers.length ? (
                            financiers.length <= 0 ? (
                              'Nenhum Financiador criado'
                            ) : financiers.length === 1 ? (
                              `${financiers.length} Financiador`
                            ) : (
                              `${financiers.length} Financiadores`
                            )
                          ) : (
                            financiers.length - 1 <= 0 ? (
                              'Nenhum Financiador criado'
                            ) : financiers.length - 1 === 1 ? (
                              `${financiers.length - 1} Financiador`
                            ) : (
                              `${financiers.length - 1} Financiadores`
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
                          <button
                            style={{
                              color: 'rgb(27, 154, 25)',
                              fontWeight: 'var(--bold-font-weight)'
                            }}
                            type='button'
                            disabled={!canUpdate || status === 'pending'}
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
                          disabled={!canUpdate || status === 'pending'}
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
                      {(team.length > 1 || counterTeamMember === team.length) && (
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
                              disabled={status === 'pending'}
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
                          {counterTeamMember === team.length ? (
                            team.length <= 0 ? (
                              'Nenhum Colaborador criado'
                            ) : team.length === 1 ? (
                              `${team.length} Colaborador`
                            ) : (
                              `${team.length} Colaboradores`
                            )
                          ) : (
                            team.length - 1 <= 0 ? (
                              'Nenhum Colaborador criado'
                            ) : team.length - 1 === 1 ? (
                              `${team.length - 1} Colaborador`
                            ) : (
                              `${team.length - 1} Colaboradores`
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
                          <button
                            style={{
                              color: 'rgb(27, 154, 25)',
                              fontWeight: 'var(--bold-font-weight)'
                            }}
                            type='button'
                            disabled={!canUpdate || status === 'pending'}
                          >
                            Ver todos
                          </button>
                        </Input>
                      </Row>
                    </div>
                  </div>






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
                      onClick={() => navigate(-1, { replace: true })}
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

export default UpdateProject

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