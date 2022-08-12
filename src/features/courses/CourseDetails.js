import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dots from 'react-activity/dist/Dots'
import YouTube from 'react-youtube'
import 'react-activity/dist/Dots.css'

import styles from './Courses.module.css'

import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { SidebarItem } from './SidebarItem'

export const CourseDetails = () => {
  const [videoId, setVideoId] = useState('')
  const [title, setTitle] = useState('')
  const { courseId } = useParams()
  const [playList, setPlayList] = useState(undefined)
  const [clickedItem, setClickedItem] = useState('')
  const [togglePlaylistContent, setTogglePlaylistContent] = useState(false)

  const leftAside = [
    { name: 'Material e Conteúdo do curso', to: 'content' },
    { name: 'Lista de vídeos do curso', subMenu: playList, to: 'playlist' }
  ]

  const course = useSelector(state => state.courses.courses.find(
    course => course._id === courseId
  ))

  const { youtubeApiKey, playlistId } = course
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?'

  const opts = {
    height: '380',
    width: '720',
    playerVars: { autoplay: 0 }
  }

  const _onReady = (event) => {
    event.target.pauseVideo()
  }

  useEffect(() => {
    if (!!youtubeApiKey && !!playlistId) {
      fetch(`${BASE_URL}part=snippet&playlistId=${playlistId}&maxResults=50&key=${youtubeApiKey}`)
        .then(response => response.json())
        .then(data => {
          setClickedItem(data.items[0].snippet.title)

          return setPlayList(data.items)
        })
    } else {
      setClickedItem('Material e Conteúdo do curso') 
      setTogglePlaylistContent(true)
    }
  }, [])

  if (!course) {
    return <Navigate to='/' replace />
  }


  return (
    <div className={styles.courseDetails}>
      <Row style={{ paddingTop: '8rem' }}>
        <Column style={{ width: '17rem', background: '#E6EFE6', position: 'sticky', top: '8rem' }}>
          <aside className={styles.leftAside}>
            <ul>
              {leftAside.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  clickedItem={clickedItem}
                  setClickedItem={setClickedItem}
                  setVideoId={setVideoId}
                  setTitle={setTitle}
                  togglePlaylistContent={togglePlaylistContent}
                  setTogglePlaylistContent={setTogglePlaylistContent}
                />
              ))}
            </ul>
          </aside>
        </Column>
        <Column style={{ width: 'calc(100% - 31rem)' }}>
          {!togglePlaylistContent ? (
            <main className={styles.main}>
              {!!playList && (
                <>
                  <p style={{
                    marginTop: 0,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--main-color)',
                  }}>
                    {course.title}:&nbsp;
                    <span style={{ fontWeight: 400 }}>
                      {!!title ? title : playList[0].snippet.title}
                    </span>
                  </p>

                  <div className={styles.holdsTheIframe}>
                    <Dots
                      size={25}
                      color='#fff'
                      style={{
                        position: 'absolute',
                        top: '46%',
                        left: '50%',
                        transform: 'translate(-50%, -46%)',
                        zIndex: 1
                      }}
                    />
                    <YouTube
                      videoId={!!videoId ? videoId : playList[0].snippet.resourceId.videoId}
                      opts={opts}
                      onReady={_onReady}
                      style={{ borderRadius: 10, zIndex: 2, position: 'absolute' }}
                    />
                  </div>
                </>
              )}
            </main>
          ) : (
            <main className={styles.main}>
              <p
                style={{
                  marginTop: 0,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--main-color)',
                }}
              >
                Material e Conteúdo do curso
              </p>
              <p style={{ fontSize: '0.875rem', lineHeight: '2rem' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p style={{ fontSize: '0.875rem', lineHeight: '2rem' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p style={{ fontSize: '0.875rem', lineHeight: '2rem' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p style={{ fontSize: '0.875rem', lineHeight: '2rem' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </main>
          )}
        </Column>

        <Column style={{ width: '14rem' }}>
          <aside className={styles.rightAside}>
            <ul>
              {/* hjb */}
            </ul>
          </aside>
        </Column>
      </Row>
    </div>
  )
}

