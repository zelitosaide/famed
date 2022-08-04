import { useState } from 'react'
import { Column } from '../../components/column/Column'

import { PlayOutline } from '../../components/icons/icons'
import { Row } from '../../components/row/Row'

import styles from './Courses.module.css'

export const SidebarItem = ({ item, clickedItem, setClickedItem, setVideoId, setTitle }) => {
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
  ) : (
    <div
      className={`${styles.sidebarItem} ${clickedItem === item.name ? styles.__active : null}`}
      onClick={() => setClickedItem(item.name)}
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
  )
}



{/* <a href={`https://www.youtube.com/watch?v=${videoId}`}>
                      <img width={medium.width} height={medium.height} src={medium.url} alt='' />
                      <h3>
                        {title}
                      </h3>
                    </a> */}


{/* <p style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
            }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p> */}
