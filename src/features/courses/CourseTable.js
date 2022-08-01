import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Courses.module.css'

export const CourseTable = () => {
  const courses = useSelector(state => state.courses.courses)

  const orderedCourses = courses.slice().reverse()

  return (
    <div className={`${styles.courseTable} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <ul>
          {orderedCourses.map(course => (
            <div key={course._id}>
              <Link to={`/dashboard/courses/edit/${course._id}`}>{course.title}</Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
