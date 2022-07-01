import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Chip from '@mui/material/Chip'

import { createPublication } from './publicationsSlice'
import styles from './Publications.module.css'

const CreatePublication = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      pmid: '',
      review: '',
      url: '',
      pubDate: '',
      authors: [],
      flags: {
        home: false,
        published: true
      }
    }
  })
  const [counter, setCounter] = useState(0)

  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.teacher || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      const newAutors = data.authors.filter(author => author)

      await dispatch(createPublication({
        ...data,
        authors: newAutors,
        userId: currentUser.user._id
      })).unwrap()

      navigate('/dashboard/publications')
    } catch (error) {
      console.log('FROM Create Publication', error)
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
        <p className={styles.title}>Criar nova Publicação</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='title'>
              Título da publicação&nbsp;<span style={{ color: 'red' }}>*</span>
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

          <div className={styles.formGroup}>
            <div style={{ float: 'left', width: '32%', marginRight: '2%' }}>
              <label htmlFor='pmid'>
                PMID&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input id='pmid' type='text' disabled={!canCreate}
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
              <input id='review' type='text' disabled={!canCreate}
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
              <input type='date' id='pubDate' disabled={!canCreate}
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
            <input id='url' type='url' disabled={!canCreate}
              {...register('url', { required: 'This field is riquired' })}
              style={{
                border: !!errors.url && 'none',
                outline: !!errors.url && '1px solid #FC5832',
                boxShadow: !!errors.url && '0 0 3px 0 #FC5832',
              }}
            />
            <p className={styles.error}>{errors.url?.message}</p>
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <label htmlFor='url'>
              Autores&nbsp;<span style={{ color: 'red' }}>*</span>
            </label>

            <div>
              {authors.map((value, index) => (
                value &&
                <Chip label={value} key={index} size='small'
                  style={{ marginRight: '0.5rem', marginBottom: '0.8rem' }}
                  disabled={!!authors[counter]}
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
                <input id='author' type='text' disabled={!canCreate}
                  placeholder='Digite o nome do Autor'
                  {...register(`authors.${counter}`)}
                />
              </div>

              <div style={{ float: 'left', width: '32%' }}>
                <button type='button' disabled={!canCreate}
                  onClick={() => {
                    setCounter(authors.length)
                    setValue(`authors.${authors.length}`, '')
                  }}
                >Adicionar Autor
                </button>
              </div>
            </div>
          </div>

          <button type='submit' disabled={status === 'pending' || !canCreate}>
            {status === 'pending' ? 'Save...' : 'Save'}
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

export default CreatePublication




