import { useState } from 'react'

import styles from './Carousel.module.css'
import Carousel2 from '../Carousel'
import Content from './Content'

const Carousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const len = news.length - 1

  const nextSlide = () => {
    setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
  }

  const prevSlide = () => {
    setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
  }

  return (
    <>
      {/* Responsive Carousel (width: 350) */}
      <div className={styles.mobile}>
        <div className={styles.carousel}>
          <Content
            activeIndex={activeIndex}
            news={news}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </div>
      </div>

      {/* Carousel (width: bigger) */}
      <div className='row'>
        <div className={styles.desktop}>
          <div className={styles.gap} />
          <Carousel2 news={news} />
        </div>
      </div>
    </>
  )
}

export default Carousel