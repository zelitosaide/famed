export const Fieldset = ({ children, legend, legendStyle, error, ...props }) => {
  return (
    <>
      <fieldset {...props} style={{ ...fieldset, ...props.style }}>
        <legend style={{ ...__legend, ...legendStyle }}>{legend}</legend>
        {children}
      </fieldset>
      <div style={{}}>{error}</div>
    </>
  )
}

const fieldset = {
  border: '1px solid #D1D5DB',
  background: 'white',
  borderRadius: 'var(--border-radius-large)',
  margin: 'calc(0.5rem * 0.9)'
}

const __legend = {
  fontSize: 'calc(0.8rem * 0.9)',
  fontWeight: 'var(--semibold-font-weight)',
  color: '#fff',
  padding: 'calc(0.5rem * 0.9)',
  background: 'rgb(27, 154, 25)'
}