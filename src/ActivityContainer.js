import { AnimatePresence, motion } from 'framer-motion'
import Spinner from 'react-activity/dist/Spinner'
import 'react-activity/dist/Spinner.css'

import styles from './ActivityContainer.module.css'

const ActivityContainer = () => {
  return (
    <AnimatePresence>
      <motion.div className={styles.container}
        exit={{ x: -1000 }}
      >
        <div className={styles.frame}>
          <Spinner color='white' style={{ margin: 'auto' }} />
          <h2>FAMED</h2>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}


export default ActivityContainer