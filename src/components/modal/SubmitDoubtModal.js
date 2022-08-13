import { useForm } from 'react-hook-form'

import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const SubmitDoubtModal = ({ visible, setVisible }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      message: ''
    }
  })

  const onSubmit = (data) => {
    console.log('data', data)
    reset()
    setVisible()
  }

  return (
    <DialogOverlay
      center
      style={{ marginTop: 100, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        reset()
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
          >Enviar Dúvida</h3>
        </Section>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Section style={{ paddingTop: '0.5rem', background: '#fff' }}>
          <Input label='Endereço de Email' required error={errors.email?.message}>
            <input type='email' id='Endereço de Email'
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
          </Input>

          <Input label='Dúvida' required error={errors.message?.message}>
            <textarea id='Dúvida'
              {...register('message', {
                required: 'This field is required'
              })}
            />
          </Input>

          <Row>
            <Input style={{ display: 'inline-block', float: 'right', paddingRight: 0 }}>
              <button type='submit'>
                Enviar
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
                  reset()
                }}
              >
                Cancelar
              </button>
            </Input>
          </Row>
        </Section>
      </form>
    </DialogOverlay>
  )
}
