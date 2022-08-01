import { useParams } from 'react-router-dom'

import styles from './Courses.module.css'

export const CourseDetails = () => {
  const { courseId } = useParams()
  
  return (
    <div style={{ padding: '16rem' }}>{courseId}</div>
  )
}
