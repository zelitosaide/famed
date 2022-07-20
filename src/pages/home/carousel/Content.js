import { Link } from 'react-router-dom'

import Arrows from './Arrows'
import styles from './Carousel.module.css'

const Content = ({ news, activeIndex, prevSlide, nextSlide }) => {
  return (
    <div className={styles.content}>
      {news.map((value, index) => (
        <div key={value._id} className={`${styles.slide} ${activeIndex === index ? styles.active : null}`}>
          <div style={{ position: 'relative' }}>
            {typeof value.image === 'string' ? (
              <img src={value.image} alt='' />
            ) : (
              <img src={value.image.base64Image} alt='' />
            )}
            <Arrows prevSlide={prevSlide} nextSlide={nextSlide} />
          </div>
          <div className={styles.info}>
            <Link to={`/news/${value._id}`}>{value.title}</Link>
            <span>
              {value.content.length < 150
                ? value.content
                : `${value.content.substring(0, 150)}...`
              }
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Content