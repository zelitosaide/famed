import { useState } from 'react'
import { Column } from '../../components/column/Column'

import { PlayOutline } from '../../components/icons/icons'
import { Row } from '../../components/row/Row'

import styles from './Courses.module.css'

export const SidebarItem = (props) => {
  const { item, clickedItem, setClickedItem, setVideoId, setTitle, setTogglePlaylistContent } = props
  const [clicked, setClicked] = useState(true)

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
          fontSize: '0.875rem',
          color: 'var(--main-color)',
          cursor: 'pointer',
          paddingBottom: '0.5rem',
          paddingTop: '0.5rem',
          paddingLeft: '0.5rem',
          marginBottom: 4,
          fontWeight: 500
        }}
      >
        {item.name}
      </div>

      <div className={`${styles.accordion} ${clicked ? styles.clicked : null}`}>
        {item.subMenu.map((value, index) => {
          const { snippet = {} } = value
          const { title, resourceId: { videoId } } = snippet

          return (
            <div
              key={index}
              className={`${styles.subItem} ${clickedItem === title ? styles.active : null}`}
              onClick={() => {
                setClickedItem(title)
                setVideoId(videoId)
                setTitle(title)
                setTogglePlaylistContent(false)
              }}
            >
              <Row>
                <Column style={{ width: '1.2rem' }}>
                  <PlayOutline style={{ width: '1.2rem', display: 'inline-block', color: '#178415' }} />
                </Column>
                <Column style={{ width: 'calc(100% - 1.2rem)' }}>
                  <div style={{ paddingLeft: 6, paddingTop: 2, paddingBottom: 2 }}>{title}</div>
                </Column>
              </Row>
            </div>
          )
        })}
      </div>
    </>
  ) : item.name !== 'Lista de vídeos do curso' ? (
    <div
      className={`${styles.sidebarItem} ${clickedItem === item.name ? styles.__active : null}`}
      onClick={() => {
        setClickedItem(item.name)
        setTogglePlaylistContent(true)
      }}
      style={{
        fontSize: '0.875rem',
        color: 'var(--main-color)',
        cursor: 'pointer',
        paddingBottom: '0.5rem',
        paddingTop: '0.5rem',
        paddingLeft: '0.5rem',
        marginBottom: 4,
        fontWeight: 500
      }}
    >
      {item.name}
    </div>
  ) : null
}
