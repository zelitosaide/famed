import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'

import styles from './Departments.module.css'

export const DepartmentDetails = () => {
  const { departmentId } = useParams()

  const routes = {
    fisiologicas: 'Dep. Ciências Fisiológicas',
    morfologicas: 'Dep. Ciências Morfológicas',
    microbiologia: 'Dep. Microbiologia',
    patologia: 'Dep. Patologia',
    ['saude-da-comunidade']: 'Dep. Saúde da Comunidade',
    pediatria: 'Dep. Pediatria',
    medicina: 'Dep. Medicina',
    cirurgia: 'Dep. Cirurgia',
    ['ginecologia-obstetricia']: 'Dep. Ginecologia e Obstetrícia'
  }

  const department = useSelector(state => state.departments.departments.find(
    department => department.name === routes[departmentId]
  ))

  const projects = useSelector(state => state.projects.projects.filter(project => {
    return project.department === routes[departmentId]
  }))

  const publications = useSelector(state => state.publications.publications.filter(publication => {
    return publication.department === routes[departmentId]
  }))


  if (!department) {
    return <Navigate to='/' replace />
  }

  return (
    <div className={`${styles.departmentDetails} ${styles.responsive}`}>
      <div className={styles.gap}>
        <div className='row'>
          <div className={styles.container}>
            <img src={department.image.base64Image} alt='' className={styles.image} />

            <div className={styles.info}>
              <p className={styles.title}>Departamento de {department.name.split('Dep. ')[1]}</p>
              <p className={styles.content}>{department.content}</p>
            </div>
          </div>
        </div>

        <div className='row'>
          <p style={{ marginTop: '1rem' }} className={styles.title}>Projectos do Departamento de {department.name.split('Dep. ')[1]}</p>
        </div>

        <div>
          <div className='row'>
            {projects.length ? (
              <ul>
                {projects.map(project => (
                  <li key={project._id} className='col'>
                    {!!project.financier?.websiteUrl ? (
                      <a
                        className={styles.publicationLink}
                        style={{
                          fontSize: '0.875rem',
                          display: 'block',
                          color: 'black',
                          marginBottom: 18,
                          background: '#F6F9F6',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .15)',
                        }}
                        href={project.financier.websiteUrl}
                        rel='noreferrer'
                        target='_blank'
                      >
                        {project.title}
                      </a>
                    ) : (
                      <div
                        className={styles.publicationLink}
                        style={{
                          fontSize: '0.875rem',
                          display: 'block',
                          color: 'black',
                          marginBottom: 18,
                          background: '#F6F9F6',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .15)',
                        }}
                      >
                        <Link style={{ display: 'block', color: 'black' }} to={`/projects/${project._id}`}>
                          {project.title}
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.content}>Nenhum Projecto Encontrado...</p>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }} />

        <div className='row'>
          <p style={{ marginTop: '1rem' }} className={styles.title}>Publcações do Departamento de {department.name.split('Dep. ')[1]}</p>
        </div>

        <div>
          <div className='row'>
            {publications.length ? (
              <ul>
                {publications.map(publication => (
                  <li key={publication._id} className='col'>
                    <a className={styles.publicationLink} href={publication.url} target='_blank' rel='noreferrer'
                      style={{
                        fontSize: '0.875rem',
                        display: 'block',
                        color: 'black',
                        marginBottom: 18,
                        background: '#F6F9F6',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .15)',
                      }}
                    >
                      {publication.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.content}>Nenhuma Publicacao Encontrada...</p>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }} />
      </div>
    </div>
  )
}
