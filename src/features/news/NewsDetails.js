import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import Base64Downloader from 'common-base64-downloader-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

import styles from './News.module.css'
import FormattedDate from '../../components/date/FormattedDate'

const NewsDetails = () => {
  const { newsId } = useParams()

  const news = useSelector((state) =>
    state.news.news.find((news) => news._id === newsId)
  )

  if (!news) {
    return <Navigate to="/" replace />
  }

  return (
    <div className={`${styles.newsDetails} ${styles.responsive}`}>
      <div className={styles.gap2}></div>

      <div className="row">
        <div className={styles.container}>
          {typeof news.image === 'string' ? (
            <img src={news.image} alt="" />
          ) : (
            <img src={news.image.base64Image} alt="" />
          )}

          <div className={styles.info}>
            <p className={styles.firstChild}>{news.title}</p>
            <p className={styles.nthChild2}>
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
                <FormattedDate date={news.createdAt} />
              </span>
            </p>
            {!!news.pdf.base64PDF && (
              <div style={{ paddingTop: '1rem' }}>
                <Base64Downloader
                  base64={news.pdf.base64PDF}
                  downloadName={news.title}
                >
                  <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                  &nbsp;Download
                </Base64Downloader>
              </div>
            )}
            {news.contentHTML ? (
              <p dangerouslySetInnerHTML={{ __html: news.contentHTML }}></p>
            ) : (
              <p>{news.content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetails
