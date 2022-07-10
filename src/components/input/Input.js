import styles from './Input.module.css'

export const Input = ({ children, label, error, reorder, ...props }) => {
  const type = children?.props?.type

  const bgColor = props?.style?.['--bg-color'] || 'rgb(27, 154, 25)'
  const bgHover = props?.style?.['--bg-hover'] || 'rgb(23, 132, 21)'
  const bgActive = props?.style?.['--bg-active'] || 'rgb(27, 154, 25)'
  const outlineColor = props?.style?.['--outline-color'] || 'rgb(35, 197, 32)'

  return (
    <div
      {...props}
      className={styles.input}
      style={{
        ...props.style,
        '--bg-color': bgColor,
        '--bg-hover': bgHover,
        '--bg-active': bgActive,
        '--outline-color': outlineColor
      }}
    >
      {type === 'checkbox' ? (
        <>
          {!!reorder && !!label && (
            <label style={{ paddingRight: '0.5rem' }} className={styles.checkboxlabel} htmlFor={label}>
              {label}
            </label>
          )}

          <span className={styles.checkbox}>{children}</span>

          {!reorder && !!label && (
            <label className={styles.checkboxlabel} htmlFor={label}>{label}</label>
          )}

          {!!error && (
            <div style={{ paddingLeft: '1.65rem' }} className={styles.error}>{error}</div>
          )}
        </>
      ) : type === 'radio' ? (
        <>
          <span className={styles.radio}>{children}</span>
          {!!label && (
            <label className={styles.radiolabel} htmlFor={label}>{label}</label>
          )}
          {!!error && (
            <div style={{ paddingLeft: '1.65rem' }} className={styles.error}>{error}</div>
          )}
        </>
      ) : (
        <>
          {!!label && (
            <label htmlFor={label} className={styles.label}>
              {label}
              {props?.required && <span style={{ color: 'rgb(252, 88, 50)' }}>&nbsp;*</span>}
            </label>
          )}
          {children}
          {!!error && <div className={styles.error}>{error}</div>}
        </>
      )}
    </div>
  )
}