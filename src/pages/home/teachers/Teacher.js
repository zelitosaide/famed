import { Link } from 'react-router-dom'

import styles from './Teachers.module.css'

const Teacher = ({ teacher }) => {
  return (
    <div tabIndex={0} className={styles.teacher}>
      <img src={teacher.image} alt='' width='100%' />
      <Link to={`/teachers/${teacher.userId}`} state={{ name: teacher.name }} >
        <p className={styles.name}>{teacher.name}</p>
        <p className={styles.title}><i>{teacher.title}</i></p>
      </Link>
    </div>
  )
}

export default Teacher