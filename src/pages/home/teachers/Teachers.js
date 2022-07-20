import { Link } from 'react-router-dom'

import HorizontalScroll from './HorizontalScroll'
import styles from './Teachers.module.css'

const Teachers = ({ teachers }) => {
  const cated = teachers.filter(teacher => teacher.title === 'Professor Catedratico').length
  const assoc = teachers.filter(teacher => teacher.title === 'Professor Associado').length
  const auxil = teachers.filter(teacher => teacher.title === 'Professor Auxiliar').length
  const assis = teachers.filter(teacher => teacher.title === 'Assistente').length
  const estag = teachers.filter(teacher => teacher.title === 'Assistente Estagiario').length

  return (
    <div className={`${styles.teachers} ${styles.responsive}`}>
      {/* Estatisticas */}
      <div className='col col-768-6'>
        <div className={styles.stat}>
          <p className={styles.title}>Corpo Docente</p>
          <p className={styles.description}>
            A Faculdade de Medicina conta com <span>{teachers.length}</span> docentes dos quais:
          </p>
          <div className={styles.indicators}>
            {!!cated && <p><span>{cated}</span>&nbsp;&nbsp;Professor Catedrático</p>}
            {!!assoc && <p><span>{assoc}</span>&nbsp;&nbsp;Professores Associados</p>}
            {!!auxil && <p><span>{auxil}</span>&nbsp;&nbsp;Professor Auxiliar</p>}
            {!!assis && <p><span>{assis}</span>&nbsp;&nbsp;Assistente</p>}
            {!!estag && <p><span>{estag}</span>&nbsp;&nbsp;Assistente Estagiário</p>}
          </div>
        </div>
      </div>

      {/* Lista de docentes mobile */}
      <div className='col col-768-6'>
        <div className={styles.list}>
          <HorizontalScroll teachers={teachers} />
        </div>
      </div>

      <div className='col col-768-6'>
        <div className={styles.listDesktop}>
          <p className={styles.title}>Lista de Professores</p>
          <div className={styles.listContainer}>
            {teachers.map(teacher => (
              <Link
                key={teacher._id}
                to={`/teachers/${teacher.userId}`}
                state={{ name: teacher.name }}
              >
                <div className={styles.teacher}>
                  {typeof teacher.image === 'string' ? (
                    <img src={teacher.image} alt='' width='100%' />
                  ) : (
                    <img src={teacher.image.base64Image} alt='' width='100%' />
                  )}
                  <div className={styles.content}>
                    <p>{teacher.name}</p>
                    <span>{teacher.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teachers

