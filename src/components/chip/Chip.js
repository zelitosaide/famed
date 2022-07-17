import { TimesIcon } from '../icons/icons'
import styles from './Chip.module.css'

export const Chip = ({ handleClick, handleDelete, text, ...props }) => {
  return (
    <button type='button' {...props} className={styles.chip} {...props} onClick={handleClick}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        {text.split(' ').map((t, index) => (
          <span key={index}
            style={{ marginLeft: '0.3rem', fontSize: 'var(--main-font-size)', color: 'var(--main-font-color)' }}
          >{t}</span>
        ))}

        <TimesIcon
          onClick={(e) => {
            handleDelete()
            e.stopPropagation()
          }}
          className={styles.times}
          style={{
            width: '0.8rem',
            background: 'rgba(0, 0, 0, 0.26)',
            color: 'rgba(255, 255, 255, 0.8)',
            height: '0.8rem',
            display: 'inline-block',
            borderRadius: '1rem',
            marginRight: '0.1rem',
            marginLeft: '0.3rem',
            verticalAlign: -1.6,
            padding: '0.07rem',
            strokeWidth: 2.5
          }}
        />
      </div>
    </button>
  )
}