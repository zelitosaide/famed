import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faArrowUpRightFromSquare,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faGripVertical,
  faMessage,
  faPencil
} from '@fortawesome/free-solid-svg-icons'

import Dots from 'react-activity/dist/Dots'
import YouTube from 'react-youtube'
import 'react-activity/dist/Dots.css'

import styles from './Courses.module.css'

import { Row } from '../../components/row/Row'
import { Column } from '../../components/column/Column'
import { SidebarItem } from './SidebarItem'
import { Input } from '../../components/input/Input'
import { Chat, Info } from '../../components/icons/icons'

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

              <p
                style={{
                  fontSize: '0.875rem',
                  background: '#F6F9F6',
                  padding: 6,
                  boxShadow: '0 1px 1px 0 rgba(20, 111, 18, .5)',
                  borderRadius: 2,
                  fontWeight: 500,
                  color: 'var(--main-color)',
                }}
              >Inferência estatística - 1</p>
              <div
                style={{
                  fontSize: '0.8rem',
                  marginBottom: 12,
                  marginLeft: 10,
                  background: '#F6F9F6',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  cursor: 'pointer'
                }}
                className={styles.files}
              >
                <FontAwesomeIcon color='#2D92D4' icon={faFileWord}></FontAwesomeIcon>
                &nbsp;&nbsp;<span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--main-color)',
                }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
              </div>

              <div
                style={{
                  fontSize: '0.8rem',
                  marginBottom: 12,
                  marginLeft: 10,
                  background: '#F6F9F6',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  cursor: 'pointer',
                }}
                className={styles.files}
              >
                <FontAwesomeIcon color='rgb(27, 154, 25)' icon={faFileExcel}></FontAwesomeIcon>
                &nbsp;&nbsp;<span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--main-color)',
                }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
              </div>

              <div
                style={{
                  fontSize: '0.8rem',
                  marginBottom: 12,
                  marginLeft: 10,
                  background: '#F6F9F6',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  cursor: 'pointer'
                }}
                className={styles.files}
              >
                <FontAwesomeIcon color='#E64B48' icon={faFilePdf}></FontAwesomeIcon>
                &nbsp;&nbsp;<span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--main-color)',
                }}>Livro: Introduction to R</span>
              </div>


              <div
                style={{
                  fontSize: '0.8rem',
                  marginBottom: 12,
                  marginLeft: 10,
                  background: '#F6F9F6',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  cursor: 'pointer'
                }}
                className={styles.files}
              >
                <FontAwesomeIcon color='#0090D3' icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
                &nbsp;&nbsp;<span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--main-color)',
                }}>Grupos para atividade final</span>
              </div>
              <div
                style={{
                  fontSize: '0.8rem',
                  marginBottom: 12,
                  marginLeft: 10,
                  background: '#F6F9F6',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  cursor: 'pointer'
                }}
                className={styles.files}
              >
                <FontAwesomeIcon color='#FF6D00' icon={faFilePowerpoint}></FontAwesomeIcon>
                &nbsp;&nbsp;<span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--main-color)',
                }}>Introdução à bioestatística</span>
              </div>

              <p
                style={{
                  fontSize: '0.875rem',
                  background: '#F6F9F6',
                  padding: 6,
                  boxShadow: '0 1px 1px 0 rgba(20, 111, 18, .5)',
                  borderRadius: 2,
                  fontWeight: 500,
                  color: 'var(--main-color)',
                  marginTop: 30
                }}
              >Inferência estatística - 2</p>
              <div
                style={{
                  fontSize: '0.8rem',
                  marginBottom: 12,
                  marginLeft: 10,
                  background: '#F6F9F6',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  cursor: 'pointer'
                }}
                className={styles.files}
              >
                <FontAwesomeIcon color='#2D92D4' icon={faFileWord}></FontAwesomeIcon>
                &nbsp;&nbsp;<span style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--main-color)',
                }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
              </div>
            </main>
          )}
        </Column>

        <Column style={{ width: '14rem', position: 'sticky', top: '8rem' }}>
          <aside className={styles.rightAside}>
            <ul style={{ background: '#E6EFE6', height: '16rem' }}>
              <li
                style={{
                  background: '#CFE1CF',
                  padding: '0.3rem 0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--main-color)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Chat style={{ width: '1.3rem', color: '#178415' }} />
                Duvidas
              </li>
              <li style={{ paddingBottom: 80 }}></li>
              <li
                style={{
                  background: '#CFE1CF',
                  padding: '0.45rem 0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--main-color)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Info style={{ width: '1rem', color: '#178415' }} />
                Detalhes do Curso
              </li>
              {/* <li>
                <Input>
                  <button type='button'>Envie Duvidas por Aqui</button>
                </Input>
              </li> */}
            </ul>
          </aside>
        </Column>
      </Row>
    </div>
  )
}

