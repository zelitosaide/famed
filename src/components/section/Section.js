export const Section = ({ children, ...props }) => {
  return (
    <div {...props} style={{ ...section, ...props.style }}>
      {children}
    </div>
  )
}

const section = {
  background: '#282c34',
  padding: '0.9rem'
}