import { Column } from '../../../components/column/Column'
import { Row } from '../../../components/row/Row'
import { Project } from './Project'

import styles from './Projects.module.css'

const Projects = ({ projects }) => {
  return (
    <div className={`${styles.projects} ${styles.responsive}`}>
      <Row>
        {projects.map(project => (
          <Column key={project._id} className="col col-768-3">
            <div style={{ marginRight: 16 }}>
              <Project project={project} />
            </div>
          </Column>
        ))}
      </Row>
      <div className="clearfix"></div>
    </div>
  )
}

export default Projects
