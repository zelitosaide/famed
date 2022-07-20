import { forwardRef } from 'react'

export const Fieldset = forwardRef(({ children, legend, legendStyle, error, ...props }, ref) => {
  return (
    <>
      <fieldset ref={ref} {...props} style={{ ...fieldset, ...props.style }}>
        <legend style={{ ...__legend, ...legendStyle }}>{legend}</legend>
        {children}
      </fieldset>
      <div style={{...__error}}>{error}</div>
    </>
  )
})

const fieldset = {
  border: '1px solid var(--main-border-color)',
  background: 'white',
  borderRadius: 'var(--border-radius-large)',
  marginLeft: 'calc(0.5rem * 0.9)',
  marginRight: 'calc(0.5rem * 0.9)',
  marginTop: 'calc(0.5rem * 0.9)',
  marginBottom: 'calc(0.5rem * 0.9)',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
}

const __legend = {
  fontSize: 'calc(0.8rem * 0.9)',
  fontWeight: 'var(--semibold-font-weight)',
  color: '#fff',
  padding: 'calc(0.5rem * 0.9)',
  background: 'rgb(27, 154, 25)'
}

const __error = {
  fontSize: 'var(--small-font-size)',
  paddingLeft: '0.5rem',
  fontWeight: 'var(--bold-font-weight)',
  color: 'var(--sub-bold-font-color)',
  fontFamily: 'var(--font-family)',
}                  