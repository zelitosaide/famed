import { useFormContext } from 'react-hook-form'

import { Column } from '../column/Column'
import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { FileInput } from '../input/FileInput'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const AddTeamMemberModal = (props) => {
  const { visible, setVisible, counter, setCounter, isEdit, setIsEdit, previousTeamMember } = props
  const { register, watch, setValue, trigger, formState: { errors } } = useFormContext()
  const team = watch('team')

  return (
    <DialogOverlay
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        if (!isEdit) {
          setValue(`team.${counter}`, {
            name: '', role: '', image: {
              base64Image: '', imageName: ''
            }
          })
        } else {
          if (previousTeamMember.name !== team[counter].name
            || previousTeamMember.role !== team[counter].role
            || previousTeamMember.image.imageName !== team[counter].image.imageName
          ) {
            setValue(`team.${counter}`, previousTeamMember)
          }
          setCounter(team.length - 1)
          setValue(`team.${team.length - 1}`, {
            name: '', role: '', image: {
              base64Image: '', imageName: ''
            }
          })
          setIsEdit(false)
        }
      }}
    >
      <div style={{ borderBottom: '1px solid #D1D5DB' }}>
        <Section style={{ background: '#fff' }}>
          <h3
            style={{
              margin: 0,
              fontWeight: 'var(--bold-font-weight)',
              fontSize: '.9rem',
              color: 'var(--main-font-color)',
            }}
          >Adição de Colaboradores</h3>
        </Section>
      </div>

      <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
        <Row>
          <Column style={{ width: '50%' }}>
            <Input label='Nome do colaborador' style={{ paddingLeft: 0 }}
              error={errors.team && errors.team[counter]?.name?.message}
            >
              <input
                type='text'
                id='Nome do colaborador'
                {...register(`team.${counter}.name`, {
                  required: {
                    value: visible,
                    message: 'This field is required'
                  }
                })}
              />
            </Input>
          </Column>
          <Column style={{ width: '50%' }}>
            <Input label='Função do colaborador' style={{ paddingRight: 0 }}
              error={errors.team && errors?.team[counter]?.role?.message}
            >
              <input
                type='text'
                id='Função do colaborador'
                {...register(`team.${counter}.role`, {
                  required: {
                    value: visible,
                    message: 'This field is required'
                  }
                })}
              />
            </Input>
          </Column>
        </Row>


        <FileInput label='Foto do colaborador' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors.team && errors?.team[counter]?.image?.base64Image?.message}
          fileName={
            !!team[counter]?.image?.imageName ? team[counter]?.image?.imageName : 'Nenhum ficheiro selecionado.'
          }
        >
          <input
            type='file'
            id='Foto do colaborador' style={{ display: 'none' }}
            {...register(`team.${counter}.image.base64Image`, {
              required: {
                value: visible && !isEdit,
                message: 'This field is required'
              },
              validate: (value) => {
                if (!!value) {
                  if (typeof value !== 'string') {
                    const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                    setValue(`team.${counter}.image.imageName`, value[0].name)
                    return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                  }
                }
              }
            })}
          />
        </FileInput>

        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
            <button type='button'
              onClick={async () => {
                const canSave = await trigger([
                  `team.${counter}.name`,
                  `team.${counter}.role`,
                  `team.${counter}.image.base64Image`
                ], {
                  shouldFocus: true
                })

                if (canSave) {
                  if (isEdit) {
                    setCounter(team.length - 1)
                    setValue(`team.${team.length - 1}`, {
                      name: '', role: '', image: {
                        base64Image: '', imageName: ''
                      }
                    })
                    setIsEdit(false)
                  } else {
                    setCounter(team.length)
                    setValue(`team.${team.length}`, {
                      name: '', role: '', image: {
                        base64Image: '', imageName: ''
                      }
                    })
                  }
                  setVisible()
                }
              }}
            >
              Salvar
            </button>
          </Input>
          <Input
            style={{
              display: 'inline-block',
              float: 'right',
              '--bg-color': 'rgb(252, 88, 50)',
              '--bg-hover': 'rgb(252, 70, 29)',
              '--bg-active': 'rgb(252, 88, 50)',
              '--outline-color': 'rgb(253, 152, 129)',
            }}
          >
            <button type='button'
              onClick={() => {
                setVisible()
                if (!isEdit) {
                  setValue(`team.${counter}`, {
                    name: '', role: '', image: {
                      base64Image: '', imageName: ''
                    }
                  })
                } else {
                  if (previousTeamMember.name !== team[counter].name
                    || previousTeamMember.role !== team[counter].role
                    || previousTeamMember.image.imageName !== team[counter].image.imageName
                  ) {
                    setValue(`team.${counter}`, previousTeamMember)
                  }
                  setCounter(team.length - 1)
                  setValue(`team.${team.length - 1}`, {
                    name: '', role: '', image: {
                      base64Image: '', imageName: ''
                    }
                  })
                  setIsEdit(false)
                }
              }}
            >
              Cancelar
            </button>
          </Input>
        </Row>
      </Section>
    </DialogOverlay>
  )
}
