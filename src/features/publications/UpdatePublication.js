import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { updatePublication } from './publicationsSlice'
import styles from './Publications.module.css'
import { useForm } from 'react-hook-form'
import { Chip } from '@mui/material'

const UpdatePublication = () => {
  const [status, setStatus] = useState('idle')
  const [counter, setCounter] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { publicationId } = useParams()

  const publication = useSelector(state =>
    state.publications.publications.find(publication => publication._id === publicationId)
  )

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ...publication,
      pubDate: formatDate(publication.pubDate),
      published: publication.flags.published
    }
  })

  useEffect(() => {
    setCounter(authors.length)
    setValue(`authors.${authors.length}`, '')
  }, [])

  if (!publication) {
    return <h2>No Publication with that ID</h2>
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate = publication.userId === currentUser.user._id || currentUser.user.roles.admin
  
  const admin = currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      const newAutors = data.authors.filter(author => author)

      await dispatch(updatePublication({
        ...data,
        authors: newAutors,
        flags: { ...data.flags, published: data.published }
      })).unwrap()

      navigate('/dashboard/publications')
    } catch (error) {
      console.log('FROM Update Publication', error)
    } finally {
      setStatus('idle')
    }
  }

  const authors = watch('authors')

  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.createPublication} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <p className={styles.title}>Editar publicação</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='title'>
              Título da Publicação&nbsp;<span style={{ color: 'red' }}>*</span>
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

          <div className={styles.formGroup}>
            <div style={{ float: 'left', width: '32%', marginRight: '2%' }}>
              <label htmlFor='pmid'>
                PMID&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input id='pmid' type='text' disabled={!canUpdate}
                {...register('pmid', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.pmid && 'none',
                  outline: !!errors.pmid && '1px solid #FC5832',
                  boxShadow: !!errors.pmid && '0 0 3px 0 #FC5832',
                }}
              />
              <p className={styles.error}>{errors.pmid?.message}</p>
            </div>

            <div style={{ float: 'left', width: '32%', marginRight: '2%' }}>
              <label htmlFor='review'>
                Revista&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input id='review' type='text' disabled={!canUpdate}
                {...register('review', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.review && 'none',
                  outline: !!errors.review && '1px solid #FC5832',
                  boxShadow: !!errors.review && '0 0 3px 0 #FC5832',
                }}
              />
              <p className={styles.error}>{errors.review?.message}</p>
            </div>

            <div style={{ float: 'left', width: '32%' }}>
              <label htmlFor='pubDate'>
                Data da Publicação&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input type='date' id='pubDate' disabled={!canUpdate}
                {...register('pubDate', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.pubDate && 'none',
                  outline: !!errors.pubDate && '1px solid #FC5832',
                  boxShadow: !!errors.pubDate && '0 0 3px 0 #FC5832',
                }}
              />
              <p className={styles.error}>{errors.pubDate?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor='url'>
              Link da publicação&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>
            <input id='url' type='url' disabled={!canUpdate}
              {...register('url', { required: 'This field is riquired' })}
              style={{
                border: !!errors.url && 'none',
                outline: !!errors.url && '1px solid #FC5832',
                boxShadow: !!errors.url && '0 0 3px 0 #FC5832',
              }}
            />
            <p className={styles.error}>{errors.url?.message}</p>
          </div>


          <div style={{ marginBottom: admin ? '0.5rem' : '1.5rem' }}>
            <label htmlFor='url'>
              Autores&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>

            <div>
              {authors.map((value, index) => (
                value &&
                <Chip label={value} key={index} size='small'
                  style={{ marginRight: '0.5rem', marginBottom: '0.8rem' }}
                  disabled={!!authors[counter] || !canUpdate}
                  onDelete={() => {
                    const newAutors = authors.filter((value, position) => position !== index)
                    setValue('authors', newAutors)
                    setCounter(previousState => previousState - 1)
                  }}
                />
              ))}
            </div>

            <div className={styles.formGroup}>
              <div style={{ float: 'left', width: '32%', marginRight: '2%' }}>
                <input id='author' type='text' disabled={!canUpdate}
                  placeholder='Digite o nome do Autor'
                  {...register(`authors.${counter}`)}
                />
              </div>

              <div style={{ float: 'left', width: '32%' }}>
                <button type='button' disabled={!canUpdate}
                  onClick={() => {
                    setCounter(authors.length)
                    setValue(`authors.${authors.length}`, '')
                  }}
                >Adicionar Autor
                </button>
              </div>
            </div>
          </div>

          {/* Mudancas sobre permissoes */}
          {admin && (
            <div style={{ marginBottom: '0.5rem' }}>
              <input type='checkbox' id='published' {...register('published')} />
              <label htmlFor='published' style={{ display: 'inline-block', paddingLeft: '0.5rem' }}>
                Publicar a Publicação no Site
              </label>
            </div>
          )}

          <button type='submit' disabled={status === 'pending' || !canUpdate}>
            {status === 'pending' ? 'Updating...' : 'Update'}
          </button>

          <button type='button'
            onClick={() => { navigate(-1, { replace: true }) }}
            disabled={status === 'pending'}
            style={{ marginLeft: '1rem', background: '#C66518' }}
          >Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePublication

const formatDate = (timestamp) => {
  return timestamp.split('T')[0]
}