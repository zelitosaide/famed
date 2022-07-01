import { useState } from 'react'

import { ConnectForm } from './ConnectForm'
import styles from './Projects.module.css'

const FormFourUpdate = () => {
  const [counter, setCounter] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [initial, setInitial] = useState(true)

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const admin = currentUser.user.roles.admin

  return (
    <ConnectForm>
      {({ register, watch, setValue, formState: { errors } }) => {

        const team = watch('team')

        const initiating = team.every(value => value.name && value.role && value.image)

        if (initiating && initial) {
          setCounter(team.length)
          setValue(`team.${team.length}`, { name: '', role: '', image: '' })
          setInitial(false)
        }

        if (!isEdit && team.length > 1 && counter === 0) {
          for (let i = 0; i < team.length; i++) {
            if (!team[i].name && !team[i].role) {
              setCounter(i)
              setValue(`team.${i}`, { name: '', role: '', image: '' })
              break
            }
          }
        }

        return (
          <>
            <div className={styles.formGroup}>
              <div style={{ float: 'left', width: '50%', paddingRight: '2rem' }}>
                <div>
                  <label htmlFor='memberName'>
                    Nome do colaborador&nbsp;<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type='text' id='memberName' {...register(`team.${counter}.name`)} />
                </div>

                <div>
                  <label htmlFor='memberRole'>
                    Função do colaborador&nbsp;<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type='text' id='memberRole' {...register(`team.${counter}.role`)} />
                </div>

                <div>
                  <label htmlFor='memberImage'>
                    Foto do colaborador&nbsp;<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type='file' id='memberImage' {...register(`team.${counter}.image`)} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button type='button' onClick={() => {
                    if (isEdit) {
                      setValue(`team.${counter}.image`, team[counter].image[0])
                      setCounter(team.length - 1)
                      setValue(`team.${team.length - 1}`, { name: '', role: '', image: '' })
                      setIsEdit(false)
                    } else {
                      setValue(`team.${counter}.image`, team[counter].image[0])
                      setCounter(team.length)
                      setValue(`team.${team.length}`, { name: '', role: '', image: '' })
                    }
                  }}>{isEdit ? 'Editar' : 'Adicionar'} Colaborador</button>
                </div>
              </div>

              <div style={{ float: 'left', width: '50%' }}>
                <div style={{ height: '14.5rem', marginTop: '2.35rem', overflowY: 'auto', scrollbarWidth: 'thin' }}>
                  <table className={styles.table}>
                    <tbody>
                      {team.map((member, index) => (
                        member.name &&
                        <tr key={index}>
                          <td style={{ padding: '0.5rem', fontSize: '0.8rem' }}>{member.name}</td>
                          <td style={{ padding: '0.5rem', fontSize: '0.8rem' }}>{member.role}</td>
                          <td>
                            <button type='button'
                              disabled={team[counter].name || team[counter].role || team[counter].image}
                              onClick={() => {
                                setIsEdit(true)
                                setCounter(index)
                                setValue(`team.${index}`, {
                                  name: team[index].name,
                                  role: team[index].role,
                                  image: team[index].image
                                })
                              }}
                              style={{ marginRight: '0.4rem' }}
                            >Edit</button>
                            <button type='button'
                              disabled={team[counter].name || team[counter].role || team[counter].image}
                              onClick={() => {
                                const newTeam = team.filter((value, position) => position !== index)
                                setValue('team', newTeam)
                                setCounter(previousState => previousState - 1)
                              }}
                            >Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mudancas sobre permissoes */}
            {admin && (
              <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor='estado'>
                  Estado do Projecto&nbsp;<span style={{ color: 'red' }}>*</span>
                </label>

                <div>
                  <input type='checkbox' id='published' {...register('published')} />
                  <label htmlFor='published' style={{ display: 'inline-block', paddingLeft: '0.5rem' }}>
                    Publicar Projecto no Site
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
          </>
        )
      }}
    </ConnectForm>
  )
}

export default FormFourUpdate