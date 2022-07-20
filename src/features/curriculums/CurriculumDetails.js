import { useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

import Base64Downloader from 'common-base64-downloader-react'

import styles from './Curriculums.module.css'

const CurriculumDetails = () => {
  const { teacherId } = useParams()
  const location = useLocation()

  const curriculum = useSelector(state =>
    state.curriculums.curriculums.find(curriculum => curriculum.userId === teacherId)
  )

  if (!curriculum) {
    return <Navigate to='/' replace />
  }

  return (
    <div className={`${styles.curriculumDetails} ${styles.responsive}`}>
      <div className={styles.gap}></div>

      <div className='row'>
        <div className={styles.container}>
          {typeof curriculum.image === 'string' ? (
            <img src={curriculum.image} alt='' />
          ) : (
            <img src={curriculum.image.base64Image} alt='' />
          )}

          <div className={styles.info}>
            <p>{location.state.name}</p>
            <p>{curriculum.title}</p>
            <p>{curriculum.content}</p>
            <Base64Downloader
              base64={typeof curriculum.pdf === 'string' ? curriculum.pdf : curriculum.pdf.base64PDF}
              downloadName={`CV_${location.state.name.split(' ')[0]}`}
            >
              <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>&nbsp;Download CV
            </Base64Downloader>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurriculumDetails