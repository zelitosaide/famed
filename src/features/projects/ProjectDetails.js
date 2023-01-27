import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import FormattedDate from '../../components/date/FormattedDate'
import HorizontalScroll from './HorizontalScroll'

import styles from './Projects.module.css'
import temporaryImage from '../../assets/images/edctp.jpeg'

const ProjectDetails = () => {
  const { projectId } = useParams()

  const project = useSelector((state) =>
    state.projects.projects.find((project) => project._id === projectId)
  )

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <div className={`${styles.projectDetails} ${styles.responsive}`}>
      <div className={styles.gap2}></div>

      <div className="row">
        <div className={styles.container}>
          <img
            className={styles.__image}
            src={project.image.base64Image}
            alt=""
          />

          <div className={styles.info}>
            <p>{project.title}</p>
            <p>
              <span
                style={{
                  background: '#C66518',
                  marginRight: '0.5rem',
                  padding: '0 0.2rem',
                  color: 'white',
                }}
              >
                Duração do Projecto
              </span>
              <span style={{ display: 'inline-block' }}>
                {<FormattedDate date={project.startDate} />}
                &nbsp;&nbsp;à&nbsp;&nbsp;
                {<FormattedDate date={project.endDate} />}
              </span>
            </p>
            {project.financiers && (
              <>
                <h4
                  style={{
                    marginBottom: '0.4rem',
                    marginTop: '0.6rem',
                    fontSize: '0.92rem',
                    fontWeight: 'bold',
                    color: 'var(--main-color)',
                    lineHeight: '1.2rem',
                  }}
                >
                  Financiador(es):
                </h4>
                <ul>
                  {project.financiers.map(function (financier, index) {
                    return (
                      <li
                        key={index}
                        style={{
                          marginTop: '0.4rem',
                          marginBottom: 0,
                          fontSize: '0.875rem',
                          lineHeight: '1.6rem',
                          color: 'var(--main-color)',
                        }}
                      >
                        {financier.websiteUrl ? (
                          <a
                            href={financier.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span
                              style={{
                                background: '#C66518',
                                marginRight: '0.5rem',
                                padding: '0 0.2rem',
                                color: 'white',
                              }}
                            >
                              Financiador
                            </span>
                            <span
                              style={{
                                display: 'inline-block',
                                textDecoration: 'underline',
                                color: 'var(--main-color)',
                              }}
                            >
                              {financier.name}
                            </span>
                          </a>
                        ) : (
                          <div>
                            <span
                              style={{
                                background: '#C66518',
                                marginRight: '0.5rem',
                                padding: '0 0.2rem',
                                color: 'white',
                              }}
                            >
                              Financiador
                            </span>
                            <span
                              style={{
                                display: 'inline-block',
                                color: 'var(--main-color)',
                              }}
                            >
                              {financier.name}
                            </span>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            <p style={{ marginTop: 5 }}>{project.content}</p>

            {project._id === '634fe6711983a2568223af41' && (
              <img src={temporaryImage} alt="Ola" />
            )}
          </div>

          {!!project.team.length && (
            <div>
              <p className={styles.__title}>Equipa de Investigadores</p>
              <HorizontalScroll team={project.team} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
