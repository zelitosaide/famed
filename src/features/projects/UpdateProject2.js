import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import FileBase from 'react-file-base64'

import { updateProject } from './projectsSlice'
import styles from './Projects.module.css'

const formatDate = (timestamp) => {
  let date = new Date(timestamp)
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`
}

const UpdateProject = () => {
  const { projectId } = useParams()

  const project = useSelector(state =>
    state.projects.projects.find(project => project._id === projectId)
  )

  const [status, setStatus] = useState('idle')

  const [formData, setFormData] = useState({
    ...project,
    approvalDate: project.approvalDate ? formatDate(project.approvalDate) : '',
    startDate: project.approvalDate ? formatDate(project.startDate) : '',
    endDate: project.approvalDate ? formatDate(project.endDate) : ''
  })

  const [isExternal, setIsExternal] = useState(!!project.financier.websiteUrl ? 'yes' : 'no')

  const isRadioCheckek = (x) => {
    return x === isExternal
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  // const canUpdate = currentUser.user.roles.normal || currentUser.user.roles.admin
  const canUpdate = project.userId === currentUser.user._id || currentUser.user.roles.admin

  const onUpdate = async () => {
    try {
      setStatus('pending')
      await dispatch(updateProject(formData)).unwrap()
      navigate('/dashboard/projects')
    } catch (error) {
      console.log('FROM Update Project', error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.updateProject} ${styles.responsive}`}
    >
      <h3>Editar Projecto</h3>
      <label htmlFor='title'>Titulo do Projecto</label>
      <input
        id='title'
        value={formData.title}
        disabled={!canUpdate}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <label htmlFor='regNumBioethic'>Nº de Aprovação Ética</label>
      <input
        id='regNumBioethic'
        value={formData.regNumBioethic}
        disabled={!canUpdate}
        onChange={(e) => setFormData({ ...formData, regNumBioethic: e.target.value })}
      />

      <label htmlFor='approvalDate'>Data de Aprovação Ética</label>
      <input
        type='date'
        id='approvalDate'
        disabled={!canUpdate}
        value={formData.approvalDate}
        onChange={(e) => setFormData({ ...formData, approvalDate: e.target.value })}
      />

      <label htmlFor='startDate'>Data de Início do Projecto</label>
      <input
        type='date'
        id='startDate'
        disabled={!canUpdate}
        value={formData.startDate}
        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
      />

      <label htmlFor='endDate'>Data de Fim do Projecto</label>
      <input
        type='date'
        id='endDate'
        disabled={!canUpdate}
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      />

      <label htmlFor='content'>Resumo do Projecto</label>
      <textarea
        id='content'
        value={formData.content}
        disabled={!canUpdate}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />

      <label>Image do projecto</label>
      <FileBase
        type='file'
        multiple={false}
        onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
      />


      <h3>Financiador do Projecto</h3>
      <label htmlFor='financierName'>Nome do Financiador</label>
      <input
        id='financierName'
        disabled={!canUpdate}
        value={formData.financier.name}
        onChange={(e) => setFormData({ ...formData, financier: { ...formData.financier, name: e.target.value } })}
      />

      <label htmlFor='financierUrl'>É Projecto Externo ?</label>
      <input
        type='radio'
        id='yes'
        name='is_external'
        value='yes'
        disabled={!canUpdate}
        checked={isRadioCheckek('yes')}
        onChange={(e) => setIsExternal(e.target.value)}
      />
      <label htmlFor='yes'>Sim</label>
      <input
        type='radio'
        id='no'
        name='is_external'
        value='no'
        disabled={!canUpdate}
        checked={isRadioCheckek('no')}
        onChange={(e) => setIsExternal(e.target.value)}
      />
      <label htmlFor='no'>Nao</label>

      <label htmlFor='websiteUrl'>Link do website do Financiador</label>
      <input
        type='url'
        id='websiteUrl'
        value={formData.financier.websiteUrl}
        disabled={isExternal === 'no' || !canUpdate}
        onChange={(e) => setFormData({ ...formData, financier: { ...formData.financier, websiteUrl: e.target.value } })}
      />

      {/* <h2>Equipa do Projecto</h2>
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
      </button> */}

      <button disabled={status === 'pending' || !canUpdate} onClick={onUpdate}>
        {status === 'pending' ? 'Save...' : 'Save'}
      </button>
    </div>
  )
}

export default UpdateProject