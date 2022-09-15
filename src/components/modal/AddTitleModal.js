import { useFormContext } from 'react-hook-form'

import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const AddTitleModal = ({ visible, setVisible, counter, setCounter, isEdit, setIsEdit, previousTitle }) => {
  const { register, trigger, watch, setValue, formState: { errors } } = useFormContext()

  const rows = watch('content.rows')

  return (
    <DialogOverlay
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        if (!isEdit) {
          setValue(`content.rows[row-${counter}].title`, '')
        } else {
          if (previousTitle !== rows[`row-${counter}`]?.title) {
            setValue(`content.rows[row-${counter}].title`, previousTitle)
          }

          const array = Object.entries(rows)

          if (array.length) {
            const [lastItem] = array[array.length - 1]
            const [, lastItemIndex] = lastItem.split('-')

            setCounter(Number(lastItemIndex))
            setValue(`content.rows[row-${lastItemIndex}].title`, '')
          }

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
          >Adição de Título</h3>
        </Section>
      </div>

      <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
        <Input label='Título' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors?.content?.rows && errors?.content?.rows[`row-${counter}`]?.title?.message}
        >
          <input type='text' id='Título'
            {...register(`content.rows[row-${counter}].title`, {
              required: {
                value: visible,
                message: 'This field is required'
              }
            })}
          />
        </Input>

        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
            <button
              type='button'
              onClick={async () => {
                const canSave = await trigger(`content.rows[row-${counter}].title`, {
                  shouldFocus: true
                })

                if (canSave) {
                  if (isEdit) {
                    const array = Object.entries(rows)

                    if (array.length) {
                      const [lastItem] = array[array.length - 1]
                      const [, lastItemIndex] = lastItem.split('-')

                      setCounter(Number(lastItemIndex))
                      setValue(`content.rows[row-${lastItemIndex}].title`, '')
                    }
                    setIsEdit(false)
                  } else {
                    console.log('counter', counter)
                    setCounter(prev => prev + 1)
                    console.log('counter', counter)
                  }
                  setVisible()
                }
              }}
            >Salvar</button>
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
                  setValue(`content.rows[row-${counter}].title`, '')
                } else {
                  if (previousTitle !== rows[`row-${counter}`]?.title) {
                    setValue(`content.rows[row-${counter}].title`, previousTitle)
                  }

                  const array = Object.entries(rows)

                  if (array.length) {
                    const [lastItem] = array[array.length - 1]
                    const [, lastItemIndex] = lastItem.split('-')

                    setCounter(Number(lastItemIndex))
                    setValue(`content.rows[row-${lastItemIndex}].title`, '')
                  }

                  setIsEdit(false)
                }
              }}
            >Cancelar</button>
          </Input>
        </Row>
      </Section>
    </DialogOverlay >
  )
}
