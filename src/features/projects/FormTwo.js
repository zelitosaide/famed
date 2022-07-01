import { ConnectForm } from './ConnectForm'

import styles from './Projects.module.css'

const FormTwo = () => {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div>
              <label htmlFor='content'>
                Resumo do Projecto&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <textarea
                id='content'
                {...register('content', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.content && 'none',
                  outline: !!errors.content && '1px solid #FC5832',
                  boxShadow: !!errors.content && '0 0 3px 0 #FC5832',
                }}
              ></textarea>
              <p className={styles.error}>{errors.content?.message}</p>
            </div>

            <div>
              <label htmlFor='projectImage' style={{ paddingTop: '0.9rem' }}>
                Image do projecto&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type='file'
                id='projectImage'
                {...register('image', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.image && 'none',
                  outline: !!errors.image && '1px solid #FC5832',
                  boxShadow: !!errors.image && '0 0 3px 0 #FC5832'
                }}
              />
              <p className={styles.error}>{errors.image?.message}</p>
            </div>
          </>
        )
      }}
    </ConnectForm>
  )
}

export default FormTwo