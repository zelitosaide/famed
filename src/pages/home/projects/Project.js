import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import styles from './Projects.module.css'

const spanVariants = {
  hover: {
    originX: 0,
    x: '1rem',
    color: '#146F12',
  }
}

export function Project({ project }) {
  return (
    <div className={styles.project}>
      <img
        style={{ display: "inline-block" }}
        src={project.image.base64Image}
        alt=''
        width='100%'
      />
      <p className={styles.content}>
        {project.content.length < 50
          ? project.content
          : `${project.content.substring(0, 50)}...`
        }
      </p>
      <Link to={`/projects/${project._id}`}>
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
  );
}