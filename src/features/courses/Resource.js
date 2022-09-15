import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGripVertical,
  faPencil,
  faTrash,
  faFilePdf,
  faArrowUpRightFromSquare,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons'

import styles from './Courses.module.css'

const Container = styled.div`
  border-radius: 2px;
  border: 1px dashed var(--main-stroke-svg-color);
  margin-bottom: 8px;
  font-size: var(--main-font-size);
  color: var(--main-font-color);
  background: ${props => (props.isDragging ? 'lightgreen' : '#F6F9F6')};
  display: flex;
  align-items: center;
`

export const Resource = ({ resource, index, handleEdit, handleDeleteResource }) => {
  // console.log('resource', resource)

  const fileIcon = resource.label === 'URL / Link'
    ? faArrowUpRightFromSquare
    : resource.label === 'Documento em PDF'
      ? faFilePdf
      : resource.label === 'Documento em WORD'
        ? faFileWord
        : resource.label === 'Documento em Excel'
          ? faFileExcel
          : faFilePowerpoint

  return (
    <Draggable draggableId={resource.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <span
            {...provided.dragHandleProps}
            style={{
              height: '1.6rem',
              width: '1.6rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon
              style={{ fontSize: '0.9rem' }}
              icon={faGripVertical}
              color='var(--bold-stroke-svg-color)'
            />
          </span>

          <span
            style={{
              height: '1.6rem',
              width: '1.4rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon
              color={resource.color}
              icon={fileIcon}
              style={{ fontSize: '0.9rem' }}
            />
          </span>
          {resource.title}
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
              onClick={() => handleDeleteResource()}
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
        </Container>
      )}
    </Draggable>
  )
}
