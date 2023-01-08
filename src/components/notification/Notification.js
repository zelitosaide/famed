import { Alert } from '../alert/Alert'
import { Column } from '../column/Column'
import { CheckCircleIcon, ErrorIconOutline } from '../icons/icons'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export const Notification = ({ visible, setVisible, type, text, title }) => {
  return (
    <Alert
      setVisible={setVisible}
      visible={visible}
      style={{ top: '3rem', right: '0.6rem' }}
    >
      <Section
        style={{
          background: 'var(--main-white-color)',
          borderRadius: 'var(--border-radius-large)',
          width: '21rem',
          boxShadow:
            'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
        }}
      >
        <Row>
          <Column style={{ width: '1.2rem' }}>
            {type === 'Error' ? (
              <ErrorIconOutline
                style={{ width: '1.2rem', color: 'rgb(220, 38, 38)' }}
              />
            ) : (
              <CheckCircleIcon
                style={{ width: '1.2rem', color: 'rgb(27, 154, 25)' }}
              />
            )}
          </Column>
          <Column style={{ width: 'calc(100% - 1.2rem)' }}>
            <div style={{ paddingLeft: '0.9rem' }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: 'var(--main-font-size)',
                  fontWeight: 'var(--bold-font-weight)',
                  color: 'var(--bold-font-color)',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--main-font-size)',
                  color: 'var(--main-font-color)',
                  paddingTop: '0.5rem',
                }}
              >
                {text}
              </p>
            </div>
          </Column>
        </Row>
      </Section>
    </Alert>
  )
}
