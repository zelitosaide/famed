import { Link } from 'react-router-dom'

import styles from './News.module.css'

const SingleNews = ({ news }) => {
  return (
    <div className={styles.singleNews}>
      <img src={news.image} alt='' />
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