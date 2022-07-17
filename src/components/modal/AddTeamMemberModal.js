import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Column } from '../column/Column'
import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
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
          setValue(`team.${counter}`, { name: '', role: '', image: '' })
        } else {
          if (previousTeamMember.name !== team[counter].name
            || previousTeamMember.role !== team[counter].role
            || previousTeamMember.image[0].name !== team[counter].image[0].name
          ) {
            setValue(`team.${counter}`, previousTeamMember)
          }
          setCounter(team.length - 1)
          setValue(`team.${team.length - 1}`, { name: '', role: '', image: '' })
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

        <Input label='Foto do colaborador' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors.team && errors?.team[counter]?.image?.message}
        >
          <input
            type='file'
            id='Foto do colaborador'
            {...register(`team.${counter}.image`, {
              required: {
                value: visible,
                message: 'This field is required'
              },
              validate: (value) => {
                if (!!value) {
                  const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                  return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                }
              }
            })}
          />
        </Input>


        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
            <button type='button'
              onClick={async () => {
                const canSave = await trigger([
                  `team.${counter}.name`,
                  `team.${counter}.role`,
                  `team.${counter}.image`
                ], {
                  shouldFocus: true
                })

                if (canSave) {
                  if (isEdit) {
                    setCounter(team.length - 1)
                    setValue(`team.${team.length - 1}`, { name: '', role: '', image: '' })
                    setIsEdit(false)
                  } else {
                    setCounter(team.length)
                    setValue(`team.${team.length}`, { name: '', role: '', image: '' })
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
                  setValue(`team.${counter}`, { name: '', role: '', image: '' })
                } else {
                  if (previousTeamMember.name !== team[counter].name
                    || previousTeamMember.role !== team[counter].role
                    || previousTeamMember.image[0].name !== team[counter].image[0].name
                  ) {
                    setValue(`team.${counter}`, previousTeamMember)
                  }
                  setCounter(team.length - 1)
                  setValue(`team.${team.length - 1}`, { name: '', role: '', image: '' })
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
