import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import FormattedDate from '../../components/date/FormattedDate'
import HorizontalScroll from './HorizontalScroll'

import styles from './Projects.module.css'

const ProjectDetails = () => {
  const { projectId } = useParams()

  const project = useSelector(state => state.projects.projects.find(
    project => project._id === projectId
  ))

  if (!project) {
    return <Navigate to='/' replace />
  }

  return (
    <div className={`${styles.projectDetails} ${styles.responsive}`}>
      <div className={styles.gap2}></div>
      {/* <div style={{ paddingTop: '7rem' }} className='row'></div> */}
      {/* <div style={{ paddingTop: '9.5rem' }} className='row'></div> */}

      <div className='row'>
        <div className={styles.container}>
          <img className={styles.__image} src={project.image} alt='' />

          <div className={styles.info}>
            <p>{project.title}</p>
            <p>
              <span
                style={{
                  background: '#C66518',
                  marginRight: '0.5rem',
                  padding: '0 0.2rem',
                  color: 'white',
                }}
              >
                Duração do Projecto
              </span>
              <span style={{ display: 'inline-block' }}>
                {/* {project.startDate.split('T')[0]}&nbsp;&nbsp;à&nbsp;&nbsp;{project.endDate.split('T')[0]} */}
                {<FormattedDate date={project.startDate} />}&nbsp;&nbsp;à&nbsp;&nbsp;{<FormattedDate date={project.endDate} />}
              </span>
            </p>
            <p>
              <span
                style={{
                  background: '#C66518',
                  marginRight: '0.5rem',
                  padding: '0 0.2rem',
                  color: 'white',
                }}
              >
                Financiador
              </span>
              <span style={{ display: 'inline-block' }}>
                {project.financier.name}
              </span>
            </p>
            <p>{project.content}</p>
          </div>

          {!!project.team.length && (
            <div>
              <p className={styles.__title}>Equipa de Investigadores</p>
              <HorizontalScroll team={project.team} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails