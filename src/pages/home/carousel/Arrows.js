import { IconButton } from '@mui/material'
import styles from './Carousel.module.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Arrows = ({ prevSlide, nextSlide }) => {
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

export default Arrows