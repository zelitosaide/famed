import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'
import { Row } from '../../components/row/Row'
import { convert2base64 } from '../projects/processData'

import styles from './Departments.module.css'
import { createDepartment } from './departmentsSlice'

export const CreateDepartment = () => {
  const [openNotification, setOpenNotification] = useState(false)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      content: '',
      image: '',
      flags: {
        home: false,
        published: true
      }
    }
  })

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = currentUser.user.roles.normal || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)
      const base64Image = await convert2base64(data.image[0])
      const imageName = data.image[0].name
      const image = { imageName, base64Image }

      await dispatch(createDepartment({ ...data, image, userId: currentUser.user._id })).unwrap()

      openAndAutoClose()
      reset()
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  const openAndAutoClose = () => {
    setOpenNotification(true)
    setTimeout(() => {
      setOpenNotification(false)
    }, 14000)
  }

  return (
    <div className={`${styles.createDepartment} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Notification
            visible={openNotification}
            setVisible={setOpenNotification}
            text='Departamento criado com sucesso!'
            title='Salvo com sucesso!'
          />

          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de cadastro'
            type='Error'
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend='Criar novo Departamento' style={{ minHeight: '26rem' }}>
                <Input label='Nome do Departamento' required error={errors.name?.message}>
                  <input type='text' id='Nome do Departamento' disabled={!canCreate}
                    {...register('name', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Descrição do Departamento' required error={errors.content?.message}>
                  <textarea id='Descrição do Departamento' disabled={!canCreate} style={{ minHeight: 160 }}
                    {...register('content', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Imagem do Departamento' required error={errors.image?.message}>
                  <input type='file' id='Imagem do Departamento' disabled={!canCreate}
                    {...register('image', {
                      required: 'This field is riquired',
                      validate: (value) => {
                        if (!!value) {
                          const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                          return !!allowedExtensions.exec(value[0]?.name) || 'Invalid file type'
                        }
                      }
                    })}
                  />
                </Input>

                <Input style={{ display: 'inline-block' }}>
                  <button type='submit' disabled={status === 'pending' || !canCreate}>
                    {status === 'pending' ? 'Salvando...' : 'Salvar'}
                  </button>
                </Input>

                <Input
                  style={{
                    display: 'inline-block',
                    '--bg-color': 'rgb(252, 88, 50)',
                    '--bg-hover': 'rgb(252, 70, 29)',
                    '--bg-active': 'rgb(252, 88, 50)',
                    '--outline-color': 'rgb(253, 152, 129)',
                  }}
                >
                  <button type='button' disabled={status === 'pending'}
                    onClick={() => navigate(-1, { replace: true })}
                  >
                    Cancelar
                  </button>
                </Input>
              </Fieldset>
            </Column>
          </Row>
        </form>
      </div>
    </div>
  )
}
