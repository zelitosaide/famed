import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './Projects.module.css'

export const FormOne = () => {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <>
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


          <div className={styles.formGroup}>
            <div style={{ float: 'left', width: '49%' }}>
              <label htmlFor='regNumBioethic'>
                Nº de Aprovação Ética&nbsp;<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id='regNumBioethic'
                type='text'
                {...register('regNumBioethic', {
                  required: 'This field is riquired',
                })}
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
                {...register('approvalDate', {
                  required: 'This field is riquired',
                })}
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
      )}
    </ConnectForm>
  )
}

export const FormTwo = () => {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <>
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
          />
          <p className={styles.error}>{errors.content?.message}</p>


          <label htmlFor='projectImage' style={{ paddingTop: '0.9rem' }}>
            Image do projecto&nbsp;<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='file'
            id='projectImage'
            {...register('image', {
              required: 'This field is riquired',
            })}
            style={{
              border: !!errors.image && 'none',
              outline: !!errors.image && '1px solid #FC5832',
              boxShadow: !!errors.image && '0 0 3px 0 #FC5832'
            }}
          />
          <p className={styles.error}>{errors.image?.message}</p>
        </>
      )}
    </ConnectForm>
  )
}

export const FormTree = () => {
  return (
    <ConnectForm>
      {({ register, formState: { errors }, watch }) => (
        <>
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




          <label style={{ display: 'inline-block', paddingRight: '1rem' }}>
            É Projecto Externo ?&nbsp;<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='radio'
            id='Yes'
            value='Yes'
            {...register('external', {
              required: 'This field is riquired'
            })}
          />
          <label htmlFor='Yes' style={{ display: 'inline-block', marginRight: '1rem' }}>Sim</label>

          <input
            type='radio'
            id='No'
            value='No'
            {...register('external', {
              required: 'This field is riquired'
            })}
          />
          <label htmlFor='No' style={{ display: 'inline-block' }}>Não</label>


          <label htmlFor='websiteUrl'>
            Link do website do Financiador&nbsp;<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id='websiteUrl'
            type='url'
            {...register('financier.websiteUrl')}
            disabled={watch('external') === 'No'}
            style={{
              border: !!errors.financier?.websiteUrl && 'none',
              outline: !!errors.financier?.websiteUrl && '1px solid #FC5832',
              boxShadow: !!errors.financier?.websiteUrl && '0 0 3px 0 #FC5832'
            }}
          />
          <p className={styles.error}>{errors.financier?.websiteUrl?.message}</p>
        </>
      )}
    </ConnectForm>
  )
}

export const FormFour = () => {
  const [counter, setCounter] = useState(0)

  return (
    <ConnectForm>
      {({ register, watch, setValue, formState: { errors } }) => {

        const team = watch('team')

        return (
          <div>
            <div className={styles.formGroup}>
              <div style={{ float: 'left', width: '49%' }}>
                <label htmlFor='memberName'>Nome do colaborador</label>
                <input
                  type='text'
                  id='memberName'
                  {...register(`team.${counter}.name`)}
                />

                <label htmlFor='memberRole'>Função do colaborador</label>
                <input
                  type='text'
                  id='memberRole'
                  {...register(`team.${counter}.role`)}
                />

                <label htmlFor='memberImage'>Foto do colaborador</label>
                <input
                  type='file'
                  id='memberImage'
                  {...register(`team.${counter}.image`)}
                />

                <button type='button' onClick={() => {
                  setCounter(team.length)
                  setValue(`team.${team.length}`, { name: '', role: '', image: '' })
                  console.log(team)
                }}>Addicionar Colaborador</button>

                <button type='button' onClick={() => {
                  setCounter(team.length - 1)
                  setValue(`team.${team.length - 1}`, { name: '', role: '', image: '' })
                }}>Edit</button>
              </div>

              <div style={{ float: 'right', width: '49%' }}>
                {team.map((value, index) =>
                  // !!value.name &&
                  <div key={index}>
                    <button type='button' onClick={() => {
                      setCounter(index)
                      setValue(`team.${index}`, {
                        name: team[index].name,
                        role: team[index].role,
                        image: team[index].image
                      })
                    }}>{value.name} {value.role}</button>

                    <button type='button' onClick={() => {
                      const newTeam = team.filter((value, position) => position !== index)

                      setValue('team', newTeam)
                      setCounter(prev => prev - 1)

                      setValue(`team.${index}`, { name: '', role: '', image: '' })
                    }}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }}
    </ConnectForm>
  )
}

const ConnectForm = ({ children }) => {
  const methods = useFormContext()

  return children({ ...methods })
}
