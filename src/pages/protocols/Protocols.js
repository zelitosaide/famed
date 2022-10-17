import { useSelector } from 'react-redux'

import Carousel from '../home/carousel/Carousel'
import styles from './Protocols.module.css'

const Protocols = () => {
  const projects = useSelector(state => state.projects.projects).slice(0, 1)

  return (
    <div className={styles.protocols}>
      {true && <Carousel news={projects} />}
    </div>
  )
}

export default Protocols