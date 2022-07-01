import { ConnectForm } from './ConnectForm'

import styles from './Projects.module.css'

const FormTree = () => {
  return (
    <ConnectForm>
      {({ register, watch, formState: { errors } }) => {
        return (
          <>
            <div>
              <label htmlFor='financierName'>
                Nome do Financiador&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type='text'
                id='financierName'
                {...register('financier.name', { required: 'This field is riquired', })}
                style={{
                  border: !!errors.financier?.name && 'none',
                  outline: !!errors.financier?.name && '1px solid #FC5832',
                  boxShadow: !!errors.financier?.name && '0 0 3px 0 #FC5832'
                }}
              />
              <p className={styles.error}>{errors.financier?.name.message}</p>
            </div>

            <div>
              <label style={{ display: 'inline-block' }}>
                É Projecto Externo ?&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>

              <span style={{ margin: '0 1rem' }}>
                <input type='radio' id='Yes' value='Yes' {...register('external')} />
                <label htmlFor='Yes' style={{ display: 'inline-block' }}>Sim</label>
              </span>

              <span>
                <input type='radio' id='No' value='No' {...register('external')} />
                <label htmlFor='No' style={{ display: 'inline-block' }}>Não</label>
              </span>
            </div>

            <div>
              <label htmlFor='websiteUrl'>
                Link do website do Financiador&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input id='websiteUrl' type='url' {...register('financier.websiteUrl')}
                disabled={watch('external') === 'No'}
              />
            </div>
          </>
        )
      }}
    </ConnectForm>
  )
}

export default FormTree