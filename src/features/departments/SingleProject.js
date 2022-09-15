import { Link } from 'react-router-dom'

import FormattedDate from '../../components/date/FormattedDate'

import styles from './Departments.module.css'

export const SingleProject = ({ project }) => {
  return (
    <div className={styles.singleProject}>
      <div className={styles.content}>
        {!!project.financier?.websiteUrl ? (
          <a
            style={{ display: 'block' }}
            href={project.financier.websiteUrl}
            rel='noreferrer'
            target='_blank'
          >
            {project.title}
          </a>
        ) : (
          <Link style={{ display: 'block' }} to={`/projects/${project._id}`}>
            {project.title}
          </Link>
        )}
      </div>
    </div>
  )
}
