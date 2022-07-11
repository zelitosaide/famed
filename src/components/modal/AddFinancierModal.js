import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const AddFinancierModal = ({ visible, setVisible }) => {
  const { register, watch, setValue, trigger, formState: { errors } } = useFormContext()
  const [counter, setCounter] = useState(0)
  const name = watch('financier.name')

  return (
    <DialogOverlay
      callback={() => {
        setValue(`financier.name.${counter}`, '')
      }}
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible} setVisible={setVisible}
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
          >Adição de Financiador</h3>
        </Section>
      </div>

      <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
        <Input label='Nome do Financiador' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors.financier?.name[counter]?.message}
        >
          <input
            type='text'
            id='Nome do Financiador'
            {...register(`financier.name.${counter}`, {
              validate: visible
                ? (value) => {
                  return !!value || 'This field is required'
                }
                : null
            })}
          />
        </Input>

        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
            <button
              type='button'
              onClick={async () => {
                const canSave = await trigger(`financier.name.${counter}`, { shouldFocus: true })

                if (canSave) {
                  setVisible(false)
                  setCounter(name.length)
                  setValue(`financier.name.${name.length}`, '')
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
                setVisible(false)
                setValue(`financier.name.${counter}`, '')
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
