import { SDialogOverlay } from '../dialog_overlay/SDialogOverlay'
import { WarnIcon } from '../icons/icons'
import { Input } from '../input/Input'
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

        <div>
          <p
            style={{
              color: 'var(--main-font-color)',
              fontSize: 'var(--main-font-size)',
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            {text}
          </p>
        </div>

        <div>
          <Input>
            <button style={{ width: '100%' }} onClick={setVisible}>
              Fechar
            </button>
          </Input>
        </div>
      </Section>
    </SDialogOverlay>
  )
}
