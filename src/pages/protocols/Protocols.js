import { useSelector } from 'react-redux'

import Carousel from '../home/carousel/Carousel'
import styles from './Protocols.module.css'

const Protocols = () => {
  const projects = useSelector(state => state.projects.projects)

  console.log(projects);

  return (
    <div className={styles.protocols}>
      <Carousel news={projects} />
    </div>
  )
}

export default Protocols