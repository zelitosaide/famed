import { useFormContext } from 'react-hook-form'

import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const AddFinancierModal = (props) => {
  const { visible, setVisible, counter, setCounter, isEdit, setIsEdit, previousFinancier } = props
  const { register, watch, setValue, trigger, formState: { errors } } = useFormContext()
  const financiers = watch('financiers')

  return (
    <DialogOverlay
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        if (!isEdit) {
          setValue(`financiers.${counter}`, { name: '', websiteUrl: '' })
        } else {
          if (previousFinancier.name !== financiers[counter].name ||
            previousFinancier.websiteUrl !== financiers[counter].websiteUrl
          ) {
            setValue(`financiers.${counter}`, previousFinancier)
          }
          setCounter(financiers.length - 1)
          setValue(`financiers.${financiers.length - 1}`, { name: '', websiteUrl: '' })
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
          >Adição de Financiador</h3>
        </Section>
      </div>

      <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
        <Input label='Nome do Financiador' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors.financiers && errors.financiers[counter]?.name?.message}
        >
          <input
            type='text'
            id='Nome do Financiador'
            {...register(`financiers.${counter}.name`, {
              required: {
                value: visible,
                message: 'This field is required'
              }
            })}
          />
        </Input>

        <Input label='Website do Financiador' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors.financiers && errors.financiers[counter]?.websiteUrl?.message}
        >
          <input
            type='url'
            id='Website do Financiador'
            placeholder='https://example.com'
            {...register(`financiers.${counter}.websiteUrl`, {
              required: {
                value: visible,
                message: 'This field is required'
              },
              pattern: visible && {
                value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                message: 'Please provide a valid URL, (Example: https://example.com)'
              }
            })}
          />
        </Input>

        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
            <button
              type='button'
              onClick={async () => {
                const canSave = await trigger([
                  `financiers.${counter}.name`,
                  `financiers.${counter}.websiteUrl`
                ], {
                  shouldFocus: true
                })

                if (canSave) {
                  if (isEdit) {
                    setCounter(financiers.length - 1)
                    setValue(`financiers.${financiers.length - 1}`, { name: '', websiteUrl: '' })
                    setIsEdit(false)
                  } else {
                    setCounter(financiers.length)
                    setValue(`financiers.${financiers.length}`, { name: '', websiteUrl: '' })
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
                  setValue(`financiers.${counter}`, { name: '', websiteUrl: '' })
                } else {
                  if (previousFinancier.name !== financiers[counter].name ||
                    previousFinancier.websiteUrl !== financiers[counter].websiteUrl
                  ) {
                    setValue(`financiers.${counter}`, previousFinancier)
                  }
                  setCounter(financiers.length - 1)
                  setValue(`financiers.${financiers.length - 1}`, { name: '', websiteUrl: '' })
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
