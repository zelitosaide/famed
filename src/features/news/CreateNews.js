import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { createNews } from './newsSlice'
import styles from './News.module.css'
import { convert2base64 } from '../projects/processData'

const CreateNews = () => {
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      content: '',
      image: '',
      pdf: '',
      flags: {
        home: false,
        published: true
      }
    }
  })

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.normal || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      const image = await convert2base64(data.image[0])

      if (!!data.pdf) {
        const pdf = await convert2base64(data.pdf[0])
        await dispatch(createNews({ ...data, image, pdf, userId: currentUser.user._id })).unwrap()
      } else {
        await dispatch(createNews({ ...data, image, userId: currentUser.user._id })).unwrap()
      }

      // console.log({...data, image, pdf, userId: currentUser.user._id })

      // await dispatch(createNews({ ...data, image, pdf, userId: currentUser.user._id })).unwrap()
      navigate('/dashboard/news')
    } catch (error) {
      console.log('FROM Create News', error)
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
      className={`${styles.createNews} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <p className={styles.title}>Criar nova Notícia</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor='title'>
              Título da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <input id='title' type='text' disabled={!canCreate}
              {...register('title', { required: 'This field is riquired' })}
              style={{
                border: !!errors.title && 'none',
                outline: !!errors.title && '1px solid #FC5832',
                boxShadow: !!errors.title && '0 0 3px 0 #FC5832',
              }}
            />
            <p className={styles.error}>{errors.title?.message}</p>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor='content'>
              Resumo da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              id='content'
              disabled={!canCreate}
              {...register('content', { required: 'This field is riquired' })}
              style={{
                border: !!errors.content && 'none',
                outline: !!errors.content && '1px solid #FC5832',
                boxShadow: !!errors.content && '0 0 3px 0 #FC5832',
              }}
            ></textarea>
            <p className={styles.error}>{errors.content?.message}</p>
          </div>

          <div style={{ marginBottom: '1.2rem' }} className={styles.formGroup}>
            <div style={{ float: 'left', width: '49%' }}>
              <label htmlFor='image'>
                Image da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input type='file' id='image' disabled={!canCreate}
                {...register('image', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.image && 'none',
                  outline: !!errors.image && '1px solid #FC5832',
                  boxShadow: !!errors.image && '0 0 3px 0 #FC5832'
                }}
              />
              <p className={styles.error}>{errors.image?.message}</p>
            </div>

            <div style={{ float: 'right', width: '49%' }}>
              <label htmlFor='pdf'>PDF</label>
              <input type='file' id='pdf' disabled={!canCreate}
                {...register('pdf')}
              />
            </div>
          </div>



          <button type='submit' disabled={status === 'pending' || !canCreate}>
            {status === 'pending' ? 'Save...' : 'Save'}
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

export default CreateNews