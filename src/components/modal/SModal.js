import { Column } from '../column/Column'
import { SDialogOverlay } from '../dialog_overlay/SDialogOverlay'
import { WarnIcon } from '../icons/icons'
import { Input } from '../input/Input'
import { Row } from '../row/Row'
import { Section } from '../section/Section'

export function SModal({ visible, setVisible, title, text, ...props }) {
  return (
    <SDialogOverlay {...props} visible={visible} setVisible={setVisible} center>
      <Section
        style={{
          borderRadius: 'var(--border-radius-large)',
          background: '#fff',
        }}
      >
        <div
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              background: 'rgb(255, 234, 230)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WarnIcon style={{ width: '1.4rem', color: 'rgb(252, 70, 29)' }} />
          </div>
        </div>

        <div style={{ paddingTop: 10 }}>
          <h3
            style={{
              margin: 0,
              fontWeight: 'var(--bold-font-weight)',
              fontSize: '.9rem',
              color: 'var(--main-font-color)',
              textAlign: 'center',
            }}
          >
            {title}
          </h3>
        </div>

        {/* <Row>
         
          <Column style={{ width: 'calc(100% - 2rem)' }}>
            <div style={{ paddingLeft: '1rem' }}>
              <h3
                style={{
                  margin: 0,
                  fontWeight: 'var(--bold-font-weight)',
                  fontSize: '.9rem',
                  color: 'var(--main-font-color)',
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  color: 'var(--main-font-color)',
                  fontSize: 'var(--main-font-size)',
                  lineHeight: 1.5,
                }}
              >
                {text}
              </p>

              <Input
                style={{
                  paddingLeft: 0,
                  display: 'inline-block',
                  '--bg-color': 'rgb(252, 88, 50)',
                  '--bg-hover': 'rgb(252, 70, 29)',
                  '--bg-active': 'rgb(252, 88, 50)',
                  '--outline-color': 'rgb(253, 152, 129)',
                }}
              >
                <button onClick={function () {}}>Remover</button>
              </Input>

              <Input style={{ display: 'inline-block' }}>
                <button onClick={setVisible}>Cancel</button>
              </Input>
            </div>
          </Column>
        </Row> */}
      </Section>
    </SDialogOverlay>
  )
}
