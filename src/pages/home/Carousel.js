import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import styles from './Home.module.css'

const Carousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const len = news.length - 1

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
    }, 9000)
    return () => clearInterval(interval)
  }, [activeIndex, len])

  return (
    <div className={styles.carousel}>
      <Content activeIndex={activeIndex} news={news} />
      <Arrows
        prevSlide={() => setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)}
        nextSlide={() => setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)}
      />
      <Dots
        activeIndex={activeIndex}
        news={news}
        onClick={(index) => setActiveIndex(index)}
      />
    </div>
  )
}

export default Carousel



const Content = ({ activeIndex, news }) => {
  return (
    <div className={styles.content}>
      {news.map((value, index) => (
        <div
          key={index}
          className={`${activeIndex === index ? `${styles.slide} ${styles.active}` : styles.slide}`}
        >
          <div className={styles.slideInfo}>
            <Link className={styles.slideLink} to={`/news/${value._id}`}>
              <h1 className={styles.slideTitle}>{value.title}</h1>
            </Link>
            <p className={styles.slideContent}>
              {value.content.length < 200
                ? value.content
                : `${value.content.substring(0, 200)}...`
              }
            </p>
          </div>
          <img className={styles.slideImage} src={value.image} alt='' />
        </div>
      ))}
    </div>
  )
}



const Arrows = ({ nextSlide, prevSlide }) => {
  return (
    <div className={styles.arrows}>
      <IconButton className={styles.prev} onClick={prevSlide}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton className={styles.next} onClick={nextSlide}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}


const Dots = ({ activeIndex, news, onClick }) => {
  return (
    <div className={styles.dots}>
      {news.map((value, index) => (
        <span
          key={index}
          className={`${activeIndex === index ? `${styles.dot} ${styles.active}` : styles.dot}`}
          onClick={() => onClick(index)}
        ></span>
      ))}
    </div>
  )
}





