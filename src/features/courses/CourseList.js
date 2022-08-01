import styles from './Courses.module.css'

import { Row } from '../../components/row/Row'
import { SingleCourse } from './SingleCourse'
import { Column } from '../../components/column/Column'
import { useSelector } from 'react-redux'

export const CourseList = () => {
  const courses = useSelector(state => state.courses.courses)

  const orderedCourses = courses.slice().reverse()

  return (
    <div className={`${styles.courseList} ${styles.responsive}`}>
      <div className={styles.gap}></div>

      <div className='row'>
        <Row>
          {orderedCourses.map((course, index) => (
            <Column key={index} style={{ width: '33.33%' }}>
              <div style={{ marginRight: 26, marginBottom: 26 }}>
                <SingleCourse course={course} />
              </div>
            </Column>
          ))}
        </Row>
      </div>
    </div>
  )
}
