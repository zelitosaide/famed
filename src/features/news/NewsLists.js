import { useState } from 'react'
import { useSelector } from 'react-redux'

import Sentry from 'react-activity/dist/Sentry'
import 'react-activity/dist/Sentry.css'

import styles from './News.module.css'
import SingleNews from './SingleNews'

const NewsLists = () => {
  const news = useSelector(state => state.news.news.filter(
    news => news.flags.published
  ))

  const orderedNews = news.slice().reverse()

  const [range, setRange] = useState(10)
  const [loading, setLoading] = useState(false)

  const onLoadMore = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setRange(prevRange => prevRange + 10)
    }, 1000)
  }

  return !!orderedNews.length && (
    <div className={`${styles.newsList} ${styles.responsive}`}>
      <div className={styles.gap}></div>

      <div className='row'>
        {orderedNews.slice(0, range).map(news => (
          <div key={news._id} className='col'>
            <SingleNews news={news} />
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '1.5rem' }} className='row'>
        {!loading && range < orderedNews.length && <button onClick={onLoadMore}>Load more News</button>}
        {loading &&
          <div style={{ position: 'relative', width: '100%', background: 'red' }}>
            <Sentry
              color='#146F12'
              style={{
                fontSize: '1.5rem',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default NewsLists