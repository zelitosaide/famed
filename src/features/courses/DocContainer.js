import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './Courses.module.css'
import { Input } from '../../components/input/Input'
import { Resource } from './Resource'

const Container = styled.div`
  margin: 8px; 
  border-radius: 2px;
  background: white;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-size: var(--main-font-size);
  background: #F6F9F6;
  border: 1px dashed var(--main-stroke-svg-color);
  border-radius: 2px;
  color: var(--main-font-color);
  font-weight: var(--bold-font-weight);
  align-items: center;
  display: flex;
`
const ResourceList = styled.div`
  padding-top: 6px;
  padding-left: 1rem;
  padding-right: 8px;
  margin-top: 8px;
  transition: background 0.2s ease;
  background: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
`

export const DocContainer = ({ row, docs, handleEdit, handleAddResource, handleDelete, index, setOpenResourceModal, setIsEdit, setResourceCounter, setPreviousResource }) => {
  const { register, trigger, watch, setValue, formState: { errors } } = useFormContext()

  return (
    <Draggable draggableId={row.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title>
            <span {...provided.dragHandleProps}
              style={{
                height: '1.6rem',
                width: '1.6rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <FontAwesomeIcon
                style={{ fontSize: '0.9rem' }}
                icon={faGripVertical}
                color='var(--bold-stroke-svg-color)'
              />
            </span>
            <span>{row.title}</span>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <span
                onClick={() => handleEdit()}
                className={styles.pencil}
                style={{
                  height: '1.6rem',
                  width: '1.6rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faPencil} color='var(--bold-stroke-svg-color)' />
              </span>
              <span
                onClick={() => handleDelete()}
                className={styles.trash}
                style={{
                  height: '1.6rem',
                  width: '1.6rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faTrash} color='var(--bold-stroke-svg-color)' />
              </span>
            </div>
          </Title>
          <Droppable droppableId={row.id} type='doc'>
            {(provided, snapshot) => (
              <ResourceList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {docs.map((resource, index) => (
                  <Resource
                    key={resource.id}
                    resource={resource}
                    index={index}
                    handleEdit={() => {
                      const id = Number(resource.id.split('-')[1])

                      setOpenResourceModal(true)
                      setIsEdit(true)
                      setPreviousResource(resource)
                      setResourceCounter(id)
                      setValue(`content.docs[doc-${id}]`, resource)
                    }}
                    handleDeleteResource={() => {
                      const docIds = row.docIds.filter(value => value !== resource.id)
                      setValue(`content.rows[${row.id}].docIds`, docIds)
                    }}
                  />
                ))}
                {provided.placeholder}
              </ResourceList>
            )}
          </Droppable>

          <Input style={{ padding: 0, paddingLeft: '1rem', marginTop: '4px', marginBottom: '8px' }}>
            <button style={{ fontWeight: 'normal', padding: 4 }} type='button' className={styles.add}
              onClick={() => handleAddResource()}
            >
              Adicionar Recurso
            </button>
          </Input>
        </Container>
      )}
    </Draggable>
  )
}
