import { useState } from 'react'

import styles from './Sidebar.module.css'
import { sidebarItems } from '../../../assets/data/dashboard'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const [clickedItem, setClickedItem] = useState('Dashboard')

  return (
    <div className={`${styles.sidebar} ${styles.responsive}`}>
      {sidebarItems.map((value, index) => (
        <SidebarItem
          key={index}
          item={value}
          clickedItem={clickedItem}
          setClickedItem={setClickedItem}
        />
      ))}
    </div>
  )
}

export default Sidebar