import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import Teacher from './Teacher'
import './hideScrollbar.css'
import styles from './Teachers.module.css'

const HorizontalScroll = ({ teachers }) => {
  return (
    <div className={styles.horizontalScroll}>
      <ScrollMenu>
        {teachers.map(teacher => (
          <Teacher teacher={teacher} key={teacher._id} />
        ))}
      </ScrollMenu>
    </div>
  )
}

export default HorizontalScroll