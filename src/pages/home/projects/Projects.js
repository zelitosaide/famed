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


const Projects = ({ projects }) => {
  return (
    <div className={`${styles.projects} ${styles.responsive}`}>
      {projects.map(project => (
        <div key={project._id} className='col col-768-4'>
          <div className={styles.project}>
            <img src={project.image} alt='' width='100%' />
            <p className={styles.content}>
              {project.content.length < 180
                ? project.content
                : `${project.content.substring(0, 180)}...`
              }
            </p>
            {!!project.financier.websiteUrl ? (
              <a target='_blank' href={project.financier.websiteUrl} rel='noreferrer'>
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
                  }}
                  >Visite o site</i>
                </motion.span>
              </a>
            ) : (
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
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Projects