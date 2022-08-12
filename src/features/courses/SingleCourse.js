import { useNavigate } from 'react-router-dom'

import { ClockOutline } from '../../components/icons/icons'
import { Input } from '../../components/input/Input'

import styles from './Courses.module.css'

export const SingleCourse = ({ course }) => {
  const { title, description, duration, _id: courseId } = course

  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--white-color)',
        padding: 15,
        height: 160,
        borderRadius: 'var(--border-radius-small)',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 16px 0px, #E6EFE6 0px 0px 0px 1px'
      }}
    >
      <p style={{ fontSize: '0.8rem', marginTop: 0, marginBottom: 4, fontWeight: 500, color: 'var(--main-color)' }}>
        {title}
      </p>

      <p style={{
        fontSize: 'var(--main-font-size)',
        color: '#555',
        lineHeight: 1.3
      }}>
        {description.length > 100 ? `${description.slice(0, 100)}...` : description}
      </p>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#F6F9F6',
        height: 50,
        padding: '0 0.6rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ paddingLeft: 4, display: 'flex', alignItems: 'center' }}>
          <ClockOutline style={{ width: '1rem', color: 'var(--hover-color)', display: 'block' }} /> 
          <span style={{ color: 'var(--hover-color)', paddingLeft: 4, fontSize: 'var(--main-font-size)', display: 'block' }}>{duration}</span>
        </div>
        <Input>
          <button style={{ padding: '5px 10px', fontWeight: 'normal', borderRadius: 30 }}
            onClick={() => navigate(`/minicourse/${courseId}`)}
          >
            Iniciar
          </button>
        </Input>
      </div>
    </div>
  )
}
