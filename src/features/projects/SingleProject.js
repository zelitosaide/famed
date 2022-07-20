import { Link } from 'react-router-dom'
import FormattedDate from '../../components/date/FormattedDate'

import styles from './Projects.module.css'

const SingleProject = ({ project }) => {
  return (
    <div className={styles.singleProject}>
      <img src={project.image.base64Image} alt='' />
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
        <span>Início do Projecto: <FormattedDate date={project.startDate} /></span>
        <span>Fim do Projecto: <FormattedDate date={project.endDate} /></span>
        <p>
          {project.content.length < 300
            ? project.content
            : `${project.content.substring(0, 300)} ...`
          }
        </p>
      </div>
    </div>
  )
}

export default SingleProject