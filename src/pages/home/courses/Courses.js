import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import styles from './Courses.module.css'

const spanVariants = {
  hover: {
    originX: 0,
    x: '1rem',
    color: '#146F12',
  }
}

const Courses = ({ courses }) => {
  return (
    <div className={`${styles.courses} ${styles.responsive}`}>
      {courses.map(course => (
        <div key={course.id} className='col col-768-4'>
          <div className={styles.course}>
            <p className={styles.title}>{course.title}</p>
            <p className={styles.content}>{course.content.substring(0, 210)}...</p>
            <Link to={course.url}>
              <motion.span
                style={{ display: 'inline-block' }}
                variants={spanVariants}
                whileHover='hover'
              >
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>&nbsp;
                <i style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  textDecorationThickness: '1.5px',
                  textDecorationColor: '#146F12'
                }}>Saiba mais</i>
              </motion.span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Courses