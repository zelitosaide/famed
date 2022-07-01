import { useState } from 'react'
import { useSelector } from 'react-redux'

import Sentry from 'react-activity/dist/Sentry'
import 'react-activity/dist/Sentry.css'

import styles from './Publications.module.css'
import SinglePublication from './SinglePublication'

const PublicationList = () => {
  const publications = useSelector(state => state.publications.publications.filter(
    publication => publication.flags.published
  ))

  const [range, setRange] = useState(10)
  const [loading, setLoading] = useState(false)

  const onLoadMore = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setRange(prevRange => prevRange + 10)
    }, 1000)
  }

  return !!publications.length && (
    <div className={`${styles.publicationList} ${styles.responsive}`}>
      <div className={styles.gap}></div>
      {/* <div style={{ paddingTop: '7rem' }} className='row'></div> */}
      {/* <div style={{ paddingTop: '11rem' }} className='row'></div> */}

      <div className='row'>
        {publications.slice(0, range).map(publication => (
          <div key={publication._id} className='col'>
            <SinglePublication publication={publication} />
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '1.5rem' }} className='row'>
        {!loading && range < publications.length &&
          <button onClick={onLoadMore}>Load more Publications</button>
        }
        {loading &&
          <div style={{ position: 'relative', width: '100%' }}>
            <Sentry
              color='#146F12'
              style={{
                fontSize: '1.5rem',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default PublicationList