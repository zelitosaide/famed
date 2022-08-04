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
  const leftAside = [{ name: 'Lista de vídeos do curso', subMenu: playList }]


  const course = useSelector(state => state.courses.courses.find(
    course => course._id === courseId
  ))

  const { youtubeApiKey, playlistId } = course
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?'

  const opts = {
    height: '380',
    width: '750',
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

    }
  }, [])

  if (!course) {
    return <Navigate to='/' replace />
  }


  return (
    <div className={styles.courseDetails}>
      <Row style={{ paddingTop: '8rem' }}>
        <Column style={{ width: '16rem', background: '#E6EFE6', position: 'sticky', top: '8rem' }}>
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
                />
              ))}
            </ul>
          </aside>
        </Column>
        <Column style={{ width: 'calc(100% - 30rem)' }}>
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
        </Column>
        <Column style={{ width: '14rem' }}>
          <aside className={styles.rightAside}>
            <ul>
              
            </ul>
          </aside>
        </Column>
      </Row>
    </div>
  )
}