import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { updateNews } from './newsSlice'
import styles from './News.module.css'
import { convert2base64 } from '../projects/processData'

const UpdateNews = () => {
  const { newsId } = useParams()

  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const news = useSelector(state =>
    state.news.news.find(news => news._id === newsId)
  )

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...news,
      image: '',
      pdf: '',
      home: news.flags.home,
      published: news.flags.published
    }
  })


  if (!news) {
    return <Navigate to='/dashboard/news' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate = news.userId === currentUser.user._id || currentUser.user.roles.admin

  const admin = currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')

      let image, pdf

      if (!!data.image) {
        image = await convert2base64(data.image[0])
      } else {
        image = news.image
      }

      if (!!data.pdf) {
        pdf = await convert2base64(data.pdf[0])
      } else {
        pdf = news.pdf
      }


      await dispatch(updateNews({
        ...data,
        image,
        pdf,
        flags: { home: data.home, published: data.published }
      })).unwrap()


      navigate('/dashboard/news')
    } catch (error) {
      console.log('FROM Update News', error)
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
        <p className={styles.title}>Editar Notícia</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor='title'>
              Título da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <input id='title' type='text' disabled={!canUpdate}
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
              disabled={!canUpdate}
              {...register('content', { required: 'This field is riquired' })}
              style={{
                border: !!errors.content && 'none',
                outline: !!errors.content && '1px solid #FC5832',
                boxShadow: !!errors.content && '0 0 3px 0 #FC5832',
              }}
            ></textarea>
            <p className={styles.error}>{errors.content?.message}</p>
          </div>

          {/* <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor='image'>
              Image da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <input type='file' id='image' disabled={!canUpdate}
              {...register('image')}
            />
          </div> */}




          <div style={{ marginBottom: '1.2rem' }} className={styles.formGroup}>
            <div style={{ float: 'left', width: '49%' }}>
              <label htmlFor='image'>
                Image da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input type='file' id='image' disabled={!canUpdate}
                {...register('image')}
              />
            </div>

            <div style={{ float: 'right', width: '49%' }}>
              <label htmlFor='pdf'>PDF</label>
              <input type='file' id='pdf' disabled={!canUpdate}
                {...register('pdf')}
              />
            </div>
          </div>




          {/* Mudancas sobre permissoes */}
          {admin && (
            <div style={{ marginBottom: '0.5rem' }}>
              <label htmlFor='estado'>
                Estado da Notícia&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>

              <div>
                <input type='checkbox' id='published' {...register('published')} />
                <label htmlFor='published' style={{ display: 'inline-block', paddingLeft: '0.5rem' }}>
                  Publicar Notícia no Site
                </label>
              </div>

              <div>
                <input type='checkbox' id='home' {...register('home')} />
                <label htmlFor='home' style={{ display: 'inline-block', paddingLeft: '0.5rem' }}>
                  Mover para Página Inicial
                </label>
              </div>
            </div>
          )}

          <button type='submit' disabled={status === 'pending' || !canUpdate}>
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

export default UpdateNews