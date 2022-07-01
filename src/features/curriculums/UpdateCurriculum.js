import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from './Curriculums.module.css'
import { updateCurriculum } from './curriculumsSlice'
import { convert2base64 } from '../projects/processData'

const UpdateCurriculum = () => {
  const [status, setStatus] = useState('idle')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { curriculumId } = useParams()

  const curriculum = useSelector(state =>
    state.curriculums.curriculums.find(curriculum => curriculum._id === curriculumId)
  )

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...curriculum,
      pdf: '', image: ''
    }
  })

  if (!curriculum) {
    return <Navigate to='/dashboard/curriculums' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher && currentUser.user._id === curriculum.userId


  const onSubmit = async (data) => {
    try {
      setStatus('pending')

      let pdf, image

      if (!!data.image) {
        image = await convert2base64(data.image[0])
      } else {
        image = curriculum.image
      }

      if (!!data.pdf) {
        pdf = await convert2base64(data.pdf[0])
      } else {
        pdf = curriculum.pdf
      }

      await dispatch(updateCurriculum({ ...data, pdf, image })).unwrap()
      navigate('/dashboard/curriculums')
    } catch (error) {
      console.log('FROM Update Curriculum', error)
    } finally {
      setStatus('idle')
    }
  }

  const onCancel = () => {
    navigate(-1, { replace: true })
  }

  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.createCurriculum} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <p className={styles.title}>Editar Curriculum Vitae (CV)</p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div style={{ marginBottom: '0.8rem' }} className={styles.formGroup}>
            <div style={{ float: 'left', width: '49%' }}>
              <label htmlFor='pdf'>
                PDF&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input type='file' id='pdf' disabled={!canCreate} {...register('pdf')} />
            </div>

            <div style={{ float: 'right', width: '49%' }}>
              <label htmlFor='image'>
                Image do Professor&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input type='file' id='image' disabled={!canCreate} {...register('image')} />
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor='content'>
              Resumo do Curriculum&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <textarea id='content' disabled={!canCreate}
              {...register('content', { required: 'This field is riquired' })}
              style={{
                border: !!errors.content && 'none',
                outline: !!errors.content && '1px solid #FC5832',
                boxShadow: !!errors.content && '0 0 3px 0 #FC5832',
              }}
            ></textarea>
            <p className={styles.error}>{errors.content?.message}</p>
          </div>


          <div style={{ marginBottom: '0.8rem' }}>
            <label htmlFor='title'>
              Categoria Académica&nbsp;<span style={{ color: 'red' }}>*</span>
              &nbsp;&nbsp;<span style={{ fontSize: '0.8rem', color: '#FC5832' }}>{errors.title?.message}</span>
            </label>

            <div>
              <input type='radio' id='professor_doutor' value='Professor Catedratico' disabled={!canCreate}
                {...register('title', { required: 'This field is riquired' })}
              />
              <label htmlFor='professor_doutor' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>
                Professor Catedrático
              </label>
            </div>


            <div>
              <input type='radio' id='prof_doutor' value='Professor Associado' disabled={!canCreate}
                {...register('title', { required: 'This field is riquired' })}
              />
              <label htmlFor='prof_doutor' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>
                Professor Associado
              </label>
            </div>


            <div>
              <input type='radio' id='prof_doutor_aux' value='Professor Auxiliar' disabled={!canCreate}
                {...register('title', { required: 'This field is riquired' })}
              />
              <label htmlFor='prof_doutor_aux' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>
                Professor Auxiliar
              </label>
            </div>


            <div>
              <input type='radio' id='assistente' value='Assistente' disabled={!canCreate}
                {...register('title', { required: 'This field is riquired' })}
              />
              <label htmlFor='assistente' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>
                Assistente
              </label>
            </div>


            <div>
              <input type='radio' id='assistente_estag' value='Assistente Estagiario' disabled={!canCreate}
                {...register('title', { required: 'This field is riquired' })}
              />
              <label htmlFor='assistente_estag' style={{ display: 'inline-block', paddingLeft: '0.6rem' }}>
                Assistente Estagiário
              </label>
            </div>
          </div>

          <button type='submit' disabled={status === 'pending' || !canCreate}>
            {status === 'pending' ? 'Updating...' : 'Update'}
          </button>

          <button type='button' style={{
            marginLeft: '1rem',
            background: '#C66518'
          }} onClick={onCancel} disabled={status === 'pending'}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCurriculum


