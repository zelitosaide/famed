import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.css'

const SidebarItem = ({ item, clickedItem, setClickedItem }) => {
  const [clicked, setClicked] = useState(false)

  return !!item.subMenu ? (
    <>
      <div
        onClick={() => setClicked(prevState => !prevState)}
        className={`${styles.sidebarItem} ${!!item.subMenu
          ? styles.subMenu
          : null
          } ${clicked
            ? styles.active
            : null
          }`
        }
        style={{
          margin: '0.6rem 0.5rem 0.3rem 0.5rem',
          position: 'relative',
          height: '2.4rem',
          padding: '0 0.6rem',
          borderRadius: '0.6rem',
          cursor: 'pointer',
        }}
      ><span style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-45%)'
      }}>{item.icon}</span>
        <span style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-60%)',
          paddingLeft: '2.1rem',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#CFE1CF'
        }}>{item.name}</span>
      </div>

      <div className={`${styles.accordion} ${clicked ? styles.clicked : null}`}>
        {item.subMenu.map((value, index) => (
          <NavLink
            to={value.path}
            key={index}
            className={`${clickedItem === value.name ? styles.active : null}`}
            onClick={() => setClickedItem(value.name)}
          >
            {value.name}
          </NavLink>
        ))}
      </div>
    </>
  ) : (
    <NavLink
      to={item.path}
      className={`${styles.sidebarItem} ${clickedItem === item.name ? styles.__active : null}`}
      onClick={() => setClickedItem(item.name)}
      style={{
        margin: '0.6rem 0.5rem 0 0.5rem',
        position: 'relative',
        height: '2.4rem',
        padding: '0 0.6rem',
        borderRadius: '0.6rem',
        cursor: 'pointer',
      }}
    ><span style={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-45%)'
    }}>{item.icon}</span>
      <span style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-60%)',
        paddingLeft: '2.1rem',
        fontSize: '0.85rem',
        fontWeight: '500',
        color: '#CFE1CF'
      }}>{item.name}</span>
    </NavLink>
  )
}

export default SidebarItem