import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import styles from './Courses.module.css'

import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { createCourse } from './coursesSlice'
import { Notification } from '../../components/notification/Notification'
import { AddTitleModal } from '../../components/modal/AddTitleModal'
import { DocContainer } from './DocContainer'
import { AddResourceModal } from '../../components/modal/AddResourceModal'
import { ResourceTypeModal } from '../../components/modal/ResourceTypeModal'
import { convert2base64 } from '../projects/processData'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => (props.isDraggingOver ? 'skyblue' : 'white ')};
`

export const CreateCourse = () => {
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const [openTitleModal, setOpenTitleModal] = useState(false)
  const [openResourceModal, setOpenResourceModal] = useState(false)
  const [openResourceTypeModal, setOpenResourceTypeModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [counter, setCounter] = useState(0)
  const [resourceCounter, setResourceCounter] = useState(0)
  const [previousTitle, setPreviousTitle] = useState('')
  const [previousResource, setPreviousResource] = useState('')
  const [resourceType, setResourceType] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [rowKey, setRowKey] = useState()
  const [aux, setAux] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      duration: '',
      playlistId: '',
      youtubeApiKey: '',
      content: {
        docs: {},
        rows: {},
        rowOrder: []
      }
    },
    mode: 'onChange'
  })

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canCreate = true

  const onSubmit = async (data) => {
    try {
      setStatus('pending')
      setOpenErrorNotification(false)

      const docs = data.content.docs
      const array = Object.entries(docs)

      for (let i = 0; i < array.length; i++) {
        const [key, value] = array[i]

        const fileName = Object.keys(value).filter(
          value => value !== 'title' && value !== 'id' && value !== 'color' && value !== 'label' && value !== 'url'
        ).join()

        
        if (fileName) {
          const name = value[fileName][0].name
          const base64 = await convert2base64(value[fileName][0])
          console.log('fileName', value[fileName][0])

          data.content.docs[key] = {
            ...data.content.docs[key],
            [fileName]: { name, base64 }
          }
        }
      }

      await dispatch(createCourse({ ...data, userId: currentUser.user._id })).unwrap()
      openAndAutoClose()
      methods.reset()
    } catch (error) {
      console.log('error', error)
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

  useEffect(() => {
    const subscription = methods.watch((data) => {
      const rows = data.content.rows

      data.content.rowOrder = Object.entries(rows)
        .map(([key, { title }]) => title ? key : '')
        .filter(value => value)

      Object.entries(rows).forEach(([key, _]) => {
        data.content.rows[key] = {
          ...data.content.rows[key],
          id: key,
          docIds: data.content.rows[key].docIds ? [...data.content.rows[key].docIds] : []
        }
      })

      const docs = data.content.docs
      Object.entries(docs).forEach(([key, value]) => {
        if (value.owner) {
          data.content.rows[value.owner].docIds.push(key)
          delete data.content.docs[key].owner
        }
        data.content.docs[key] = {
          ...data.content.docs[key],
          id: key
        }
      })

      // console.log('data', data)

      setAux(data)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [methods, rowKey])


  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'row') {
      const newRowOrder = Array.from(aux.content.rowOrder)
      newRowOrder.splice(source.index, 1)
      newRowOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...aux,
        content: {
          ...aux.content,
          rowOrder: newRowOrder
        }
      }

      methods.setValue('content', newState.content)
      setAux(newState)
      return
    }

    const start = aux.content.rows[source.droppableId]
    const finish = aux.content.rows[destination.droppableId]

    if (start === finish) {
      const newDocIds = Array.from(start.docIds)
      newDocIds.splice(source.index, 1)
      newDocIds.splice(destination.index, 0, draggableId)

      const newRow = {
        ...start,
        docIds: newDocIds
      }

      const newState = {
        ...aux,
        content: {
          ...aux.content,
          rows: {
            ...aux.content.rows,
            [newRow.id]: newRow
          }
        }
      }

      methods.setValue('content', newState.content)
      setAux(newState)
      return
    }

    // Moving from one list to another
    const startDocIds = Array.from(start.docIds)
    startDocIds.splice(source.index, 1)
    const newStart = {
      ...start,
      docIds: startDocIds
    }

    const finishDocIds = Array.from(finish.docIds)
    finishDocIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      docIds: finishDocIds
    }

    const newState = {
      ...aux,
      content: {
        ...aux.content,
        rows: {
          ...aux.content.rows,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
    }

    methods.setValue('content', newState.content)
    setAux(newState)
  }

  const rows = methods.watch('content.rows')
  const array = Object.entries(rows)

  return (
    <div className={`${styles.createCourse} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Notification
              visible={openNotification}
              setVisible={setOpenNotification}
              text='Curso criado com sucesso!'
              title='Salvo com sucesso!'
            />

            <Notification
              visible={openErrorNotification}
              setVisible={setOpenErrorNotification}
              text={errorMessage}
              title='Erro de cadastro'
              type='Error'
            />

            <AddTitleModal
              setVisible={() => setOpenTitleModal(false)}
              visible={openTitleModal}
              counter={counter}
              setCounter={setCounter}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              previousTitle={previousTitle}
            />

            <AddResourceModal
              setVisible={() => setOpenResourceModal(false)}
              visible={openResourceModal}
              counter={resourceCounter}
              setCounter={setResourceCounter}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              previousResource={previousResource}
              rowKey={rowKey}
              resourceType={resourceType}
              setResourceType={setResourceType}
            />

            <ResourceTypeModal
              setVisible={setOpenResourceTypeModal}
              visible={openResourceTypeModal}
              resourceType={resourceType}
              setResourceType={setResourceType}
              setOpenResourceModal={setOpenResourceModal}
            />

            <Row>
              <Column style={{ width: '50%' }}>
                <Fieldset legend='Criar curso de curta duração' style={{ minHeight: '27rem' }}>
                  <Input label='Título do Curso' required error={methods.formState.errors.title?.message}>
                    <input type='text' id='Título do Curso' disabled={!canCreate}
                      {...methods.register('title', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Input label='Descrição do Curso' required error={methods.formState.errors.description?.message}>
                    <textarea type='text' id='Descrição do Curso' disabled={!canCreate}
                      {...methods.register('description', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Input label='Duração do Curso' required error={methods.formState.errors.duration?.message}>
                    <input type='text' id='Duração do Curso' disabled={!canCreate}
                      {...methods.register('duration', { required: 'This field is riquired' })}
                    />
                  </Input>

                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Input label='PlayList ID'>
                        <input type='text' id='PlayList ID' disabled={!canCreate}
                          {...methods.register('playlistId')}
                        />
                      </Input>
                    </Column>
                    <Column style={{ width: '50%' }}>
                      <Input label='YouTube API KEY'>
                        <input type='text' id='YouTube API KEY' disabled={!canCreate}
                          {...methods.register('youtubeApiKey')}
                        />
                      </Input>
                    </Column>
                  </Row>

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
                    >Cancelar</button>
                  </Input>
                </Fieldset>
              </Column>
              <Column style={{ width: '50%' }}>

                <Fieldset legend='Criar curso de curta duração' style={{ minHeight: '27rem' }}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='all-rows' type='row'>
                      {(provided, snapshot) => (
                        <Container
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}
                        >
                          {aux && aux.content.rowOrder.map((rowId, index) => {
                            const row = aux.content.rows[rowId]
                            const docs = row.docIds.map((docId) => aux.content.docs[docId])

                            return (
                              <DocContainer
                                key={row.id}
                                row={row}
                                docs={docs}
                                handleEdit={() => {
                                  const id = Number(row.id.split('-')[1])

                                  setOpenTitleModal(true)
                                  setIsEdit(true)
                                  setPreviousTitle(row.title)
                                  setCounter(id)
                                  methods.setValue(`content.rows[row-${id}].title`, row.title)
                                }}
                                handleAddResource={() => {
                                  setOpenResourceTypeModal(true)
                                  setRowKey(row.id)
                                }}
                                handleDelete={() => {
                                  const newRowOrder = aux.content.rowOrder.filter(rowId => rowId !== row.id)
                                  delete aux.content.rows[row.id]

                                  const newState = {
                                    ...aux,
                                    content: {
                                      ...aux.content,
                                      rowOrder: newRowOrder
                                    }
                                  }

                                  methods.setValue('content', newState.content)
                                  setAux(newState)

                                  if (array.length) {
                                    const [lastItem] = array[array.length - 1]
                                    const [, lastItemIndex] = lastItem.split('-')

                                    setCounter(Number(lastItemIndex))
                                  }
                                }}
                                index={index}
                                setOpenResourceModal={setOpenResourceModal}
                                setIsEdit={setIsEdit}
                                setResourceCounter={setResourceCounter}
                                setPreviousResource={setPreviousResource}
                              />
                            )
                          })}
                          {provided.placeholder}
                        </Container>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <Input>
                    <button style={{ fontWeight: 'normal', padding: 4 }} type='button' className={styles.add}
                      onClick={() => { setOpenTitleModal(true) }}
                    >Adicionar Titulo</button>
                  </Input>
                </Fieldset>
              </Column>
            </Row>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
