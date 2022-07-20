import { useFormContext } from 'react-hook-form'
import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const AddAuthorModal = (props) => {
  const { setVisible, visible, counter, setCounter, isEdit, setIsEdit, previousAuthor } = props
  const { register, watch, setValue, trigger, formState: { errors } } = useFormContext()
  const authors = watch('authors')

  return (
    <DialogOverlay
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        if (!isEdit) {
          setValue(`authors.${counter}`, '')
        } else {
          if (previousAuthor !== authors[counter]) {
            setValue(`authors.${counter}`, previousAuthor)
          }
          setCounter(authors.length - 1)
          setValue(`authors.${authors.length - 1}`, '')
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
          >Adição de Autores</h3>
        </Section>
      </div>

      <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
        <Input label='Nome do Autor' style={{ paddingLeft: 0, paddingRight: 0 }}
          error={errors.authors && errors.authors[counter]?.message}
        >
          <input type='text' id='Nome do Autor'
            {...register(`authors.${counter}`, {
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
                const canSave = await trigger(`authors.${counter}`, {
                  shouldFocus: true
                })

                if (canSave) {
                  if (isEdit) {
                    setCounter(authors.length - 1)
                    setValue(`authors.${authors.length - 1}`, '')
                    setIsEdit(false)
                  } else {
                    setCounter(authors.length)
                    setValue(`authors.${authors.length}`, '')
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
                  setValue(`authors.${counter}`, '')
                } else {
                  if (previousAuthor !== authors[counter]) {
                    setValue(`authors.${counter}`, previousAuthor)
                  }
                  setCounter(authors.length - 1)
                  setValue(`authors.${authors.length - 1}`, '')
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
