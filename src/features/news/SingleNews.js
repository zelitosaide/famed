import { Link } from 'react-router-dom'

import styles from './News.module.css'

const SingleNews = ({ news }) => {
  return (
    <div className={styles.singleNews}>
      
      {typeof news.image === 'string' ? (
        <img src={news.image} alt='' />
      ) : (
        <img src={news.image.base64Image} alt='' />
      )}
      
      <div className={styles.content}>
        <Link to={`/news/${news._id}`}>{news.title}</Link>
        <p>
          {news.content.length < 300
            ? news.content
            : `${news.content.substring(0, 300)} ...`
          }
        </p>
      </div>
    </div>
  )
}

export default SingleNews