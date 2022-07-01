import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import styles from './Projects.module.css'
import './hideScrollbar.css'
import Member from './Member'

const HorizontalScroll = ({ team }) => {
  return (
    <div className={styles.horizontalScroll}>
      <ScrollMenu>
        {team.map((member, index) => (
          <Member member={member} key={index} />
        ))}
      </ScrollMenu>
    </div>
  )
}

export default HorizontalScroll



