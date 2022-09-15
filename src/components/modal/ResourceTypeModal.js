import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faArrowUpRightFromSquare,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons'

import styles from './Modal.module.css'
import { DialogOverlay } from '../dialog_overlay/DialogOverlay'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

const data = [
  { icon: faFilePdf, label: 'Documento em PDF', color: '#E64B48' },
  { icon: faFileWord, label: 'Documento em WORD', color: '#2D92D4' },
  { icon: faFileExcel, label: 'Documento em Excel', color: 'rgb(27, 154, 25)' },
  { icon: faFilePowerpoint, label: 'Documento em Powerpoint', color: '#FF6D00' },
  { icon: faArrowUpRightFromSquare, label: 'URL / Link', color: '#0090D3' },
]

export const ResourceTypeModal = ({ visible, setVisible, setResourceType, resourceType, setOpenResourceModal }) => {
  return (
    <DialogOverlay
      style={{ marginTop: 94, overflow: 'hidden' }}
      visible={visible}
      setVisible={() => {
        setVisible()
        setResourceType(undefined)
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
          >Escolha o tipo de Recurso</h3>
        </Section>
      </div>

      <Section style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, background: '#fff' }}>
        <div className={styles.chooseContainer}>
          {data.map((value, index) => (
            <label
              htmlFor={value.label}
              className={styles.choose}
              key={index}
              onClick={() => { setResourceType(value) }}
              style={{
                borderBottom: '1px solid var(--divider-border-color)',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '0.7rem',
                paddingBottom: '0.7rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    height: '1.4rem',
                    marginLeft: '1rem',
                    marginRight: '0.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FontAwesomeIcon style={{ fontSize: '1rem' }} icon={value.icon} color={value.color} />
                </span>
                <span style={{ fontSize: 'var(--main-font-size)', }}>
                  {value.label}
                </span>
              </div>

              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Input style={{ padding: 0, paddingRight: '1rem', marginTop: '-4px' }}>
                  <input type='radio' id={value.label} name='choose' />
                </Input>
              </div>
            </label>
          ))}
        </div>
        <Row>
          <Input style={{ display: 'inline-block', float: 'right', paddingRight: '1rem' }}>
            <button
              type='button'
              onClick={() => {
                if (resourceType) {
                  setVisible()
                  setOpenResourceModal(true)
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
                setResourceType(undefined)
              }}
            >Cancelar</button>
          </Input>
        </Row>
      </Section>
    </DialogOverlay>
  )
}
