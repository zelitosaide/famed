import { useState } from 'react'
import { useSelector } from 'react-redux'
import Sentry from 'react-activity/dist/Sentry'
import 'react-activity/dist/Sentry.css'

import styles from './Projects.module.css'
import SingleProject from './SingleProject'

const ProjectList = () => {
  const projects = useSelector(state => state.projects.projects.filter(
    project => project.flags.published
  ))

  const orderedProjects = projects.slice().sort((a, b) => b.startDate.localeCompare(a.startDate))

  const [range, setRange] = useState(10)
  const [loading, setLoading] = useState(false)

  const onLoadMore = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setRange(prevRange => prevRange + 10)
    }, 1000)
  }

  return !!orderedProjects.length && (
    <div className={`${styles.projectList} ${styles.responsive}`}>
      <div className={styles.gap}></div>
      {/* <div style={{ paddingTop: '7rem' }} className='row'></div> */}
      {/* <div style={{ paddingTop: '11rem' }} className='row'></div> */}

      <div className='row'>
        {orderedProjects.slice(0, range).map(project => (
          <div key={project._id} className='col'>
            <SingleProject project={project} />
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '1.5rem' }} className='row'>
        {!loading && range < orderedProjects.length && <button onClick={onLoadMore}>Load more Projects</button>}
        {loading &&
          <div style={{ position: 'relative', width: '100%' }}>
            <Sentry
              color='#146F12'
              style={{
                fontSize: '1.5rem',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default ProjectList