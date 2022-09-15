import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'


import styles from './Departments.module.css'
import { updateDepartment } from './departmentsSlice'
import { Notification } from '../../components/notification/Notification'
import { convert2base64 } from '../projects/processData'
import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { FileInput2 } from '../../components/input/FileInput2'


export const UpdateDepartment = () => {
  const { departmentId } = useParams()
  const [status, setStatus] = useState('idle')
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const department = useSelector(state =>
    state.departments.departments.find(department => department._id === departmentId)
  )

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: department
  })

  const image = watch('image')

  if (!department) {
    return <Navigate to='/dashboard/departments' replace />
  }

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canUpdate = department.userId === currentUser.user._id || currentUser.user.roles.admin

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)

      let base64Image, imageName

      if (typeof data.image.base64Image !== 'string') {
        base64Image = await convert2base64(data.image.base64Image[0])
        imageName = data.image.base64Image[0].name
      } else {
        base64Image = department.image.base64Image
        imageName = department.image.imageName
      }

      await dispatch(updateDepartment({
        ...data, image: { imageName, base64Image }
      })).unwrap()

      navigate('/dashboard/departments')
    } catch (error) {
      setErrorMessage(error.message)
      setOpenErrorNotification(true)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className={`${styles.createDepartment} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de atualização'
            type='Error'
          />

          <Row>
            <Column style={{ width: '50%' }}>
              <Fieldset legend='Editar Departamento'>
                <Input label='Nome do Departamento' required error={errors.name?.message}>
                  <input type='text' id='Nome do Departamento' disabled={!canUpdate}
                    {...register('name', { required: 'This field is riquired' })}
                  />
                </Input>

                <Input label='Descrição do Departamento' required error={errors.content?.message}>
                  <textarea id='Descrição do Departamento' disabled={!canUpdate} style={{ minHeight: 160 }}
                    {...register('content', { required: 'This field is riquired' })}
                  />
                </Input>

                <FileInput2 label='Imagem do Departamento' required error={errors.image?.base64Image.message}
                  fileName={
                    typeof image?.base64Image === 'string' ? image.imageName : image?.base64Image[0].name
                  }
                  disabled={!canUpdate}
                >
                  <input id='Imagem do Departamento' type='file' style={{ display: 'none' }}
                    {...register('image.base64Image', {
                      validate: (value) => {
                        if (!!value) {
                          if (typeof value !== 'string') {
                            const allowedExtensions = /\.jpg|\.jpeg|\.png|\.gif|\.webp$/i
                            return !!allowedExtensions.exec(value[0].name) || 'Invalid file type'
                          }
                        }
                      }
                    })}
                  />
                </FileInput2>

                <Input style={{ display: 'inline-block' }}>
                  <button type='submit' disabled={status === 'pending' || !canUpdate}>
                    {status === 'pending' ? 'Atualizando...' : 'Atualizar'}
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
                  >Cancelar</button>
                </Input>
              </Fieldset>
            </Column>
          </Row>
        </form>
      </div>
    </div>
  )
}
