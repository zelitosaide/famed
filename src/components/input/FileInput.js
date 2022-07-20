import { useRef } from 'react'

import styles from './FileInput.module.css'
import { Input } from './Input'

export const FileInput = ({ error, fileName, label, children, disabled, ...props }) => {
  const fileSelector = useRef()

  if (error) {
    fileSelector?.current?.focus()
  }

  return (
    <Input label={label} {...props} error={error}>
      <label
        disabled={disabled}
        className={styles.fileSelector}
        style={{
          boxSizing: 'border-box',
          borderRadius: 'var(--border-radius-small)',
          border: '1px solid #D1D5DB',
          fontSize: 'var(--main-font-size)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'var(--main-font-color)',
        }}
        htmlFor={label}
        tabIndex={10}
        ref={fileSelector}
      >
        <span className={styles.fileSelectorButton} style={{
          background: '#E9E9ED',
          padding: '0.5rem calc(0.5rem * 0.9)',
          borderRight: '1px solid #D1D5DB'
        }}>Explorar...</span>
        <span style={{ paddingLeft: '0.3rem', display: 'flex', flexDirection: 'row', gap: 2 }}>
          {fileName?.split(' ' || '-').map((value, i) => (
            <span key={i}>{value}</span>
          ))}
        </span>
        {children}
      </label>
    </Input>
  )
}
