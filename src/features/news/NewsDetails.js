import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import Base64Downloader from 'common-base64-downloader-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

import styles from './News.module.css'
import FormattedDate from '../../components/date/FormattedDate'

const NewsDetails = () => {
  const { newsId } = useParams()

  const news = useSelector(state => state.news.news.find(
    news => news._id === newsId
  ))

  if (!news) {
    return <Navigate to='/' replace />
  }


  return (
    <div className={`${styles.newsDetails} ${styles.responsive}`}>
      <div className={styles.gap2}></div>
      {/* <div style={{ paddingTop: '7rem' }} className='row'></div> */}
      {/* <div style={{ paddingTop: '9.5rem' }} className='row'></div> */}


      <div className='row'>
        <div className={styles.container}>
          <img src={news.image} alt='' />

          <div className={styles.info}>
            <p>{news.title}</p>
            <p>
              <span
                style={{
                  background: '#C66518',
                  marginRight: '0.5rem',
                  padding: '0 0.2rem',
                  color: 'white',
                }}
              >
                Data de publicação
              </span>
              <span style={{ display: 'inline-block' }}>
                {/* {news.createdAt.split('T')[0]} */}
                <FormattedDate date={news.createdAt} />
              </span>
            </p>
            {!!news.pdf && (
              <div style={{ paddingTop: '1rem' }}>
                <Base64Downloader
                  base64={news.pdf}
                  downloadName={news.title}
                >
                  <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>&nbsp;Download
                </Base64Downloader>
              </div>
            )}
            <p>{news.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetails