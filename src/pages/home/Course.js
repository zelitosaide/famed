import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// import styles from './Home.module.css'

const spanVariants = {
  hover: {
    originX: 0,
    x: '0.5rem',
    transition: {}
  }
}


const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.content.substring(0,210)}...</p>
      <Link to={course.url}>
        <motion.span
          variants={spanVariants}
          whileHover='hover'
        >
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>Saiba mais
        </motion.span>
      </Link>
    </div>
  )
}

export default Course