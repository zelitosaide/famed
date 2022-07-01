import { ConnectForm } from './ConnectForm'

import styles from './Projects.module.css'

const FormOne = () => {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div>
              <label htmlFor='title'>
                Titulo do Projecto&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id='title'
                type='text'
                {...register('title', { required: 'This field is riquired' })}
                style={{
                  border: !!errors.title && 'none',
                  outline: !!errors.title && '1px solid #FC5832',
                  boxShadow: !!errors.title && '0 0 3px 0 #FC5832'
                }}
              />
              <p className={styles.error}>{errors.title?.message}</p>
            </div>

            <div className={styles.formGroup}>
              <div style={{ float: 'left', width: '49%' }}>
                <label htmlFor='regNumBioethic'>
                  Nº de Aprovação Ética&nbsp;<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id='regNumBioethic'
                  type='text'
                  {...register('regNumBioethic', { required: 'This field is riquired' })}
                  style={{
                    border: !!errors.regNumBioethic && 'none',
                    outline: !!errors.regNumBioethic && '1px solid #FC5832',
                    boxShadow: !!errors.regNumBioethic && '0 0 3px 0 #FC5832'
                  }}
                />
                <p className={styles.error}>{errors.regNumBioethic?.message}</p>
              </div>

              <div style={{ float: 'right', width: '49%' }}>
                <label htmlFor='approvalDate'>
                  Data de Aprovação Ética&nbsp;<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='date'
                  id='approvalDate'
                  {...register('approvalDate', { required: 'This field is riquired' })}
                  style={{
                    border: !!errors.approvalDate && 'none',
                    outline: !!errors.approvalDate && '1px solid #FC5832',
                    boxShadow: !!errors.approvalDate && '0 0 3px 0 #FC5832'
                  }}
                />
                <p className={styles.error}>{errors.approvalDate?.message}</p>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div style={{ float: 'left', width: '49%' }}>
                <label htmlFor='startDate'>
                  Data de Início do Projecto&nbsp;<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='date'
                  id='startDate'
                  {...register('startDate', { required: 'This field is riquired' })}
                  style={{
                    border: !!errors.startDate && 'none',
                    outline: !!errors.startDate && '1px solid #FC5832',
                    boxShadow: !!errors.startDate && '0 0 3px 0 #FC5832'
                  }}
                />
                <p className={styles.error}>{errors.startDate?.message}</p>
              </div>

              <div style={{ float: 'right', width: '49%' }}>
                <label htmlFor='endDate'>
                  Data de Fim do Projecto&nbsp;<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='date'
                  id='endDate'
                  {...register('endDate', { required: 'This field is riquired' })}
                  style={{
                    border: !!errors.endDate && 'none',
                    outline: !!errors.endDate && '1px solid #FC5832',
                    boxShadow: !!errors.endDate && '0 0 3px 0 #FC5832'
                  }}
                />
                <p className={styles.error}>{errors.endDate?.message}</p>
              </div>
            </div>
          </>
        )
      }}
    </ConnectForm>
  )
}

export default FormOne