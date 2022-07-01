import { useSelector } from 'react-redux'
import styles from './Dashboard.module.css'
import StatsCard from './StatsCard'

const Dashboard = () => {
  const usersCount = useSelector(state => state.users.users.length)
  const projectsCount = useSelector(state => state.projects.projects.length)
  const newsCount = useSelector(state => state.news.news.length)
  const publicationsCount = useSelector(state => state.publications.publications.length)

  // News Corrections
  const curriculums = useSelector(state => state.curriculums.curriculums)
  const users = useSelector(state => state.users.users.filter(user => user.roles.teacher))
  const teachers = users.map(user => {
    const curriculum = curriculums.find(curriculum => curriculum.userId === user._id)
    return { ...curriculum, name: `${user.firstName} ${user.lastName}` }
  }).filter(teacher => teacher.title)
  const curriculumsCount = teachers.length

  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '17rem', paddingRight: '2rem' }}
      className={`${styles.dashboard} ${styles.responsive}`}
    >
      <div className={styles.cards}>
        <div style={{ width: '20%', float: 'left' }}>
          <StatsCard name='Usuários' count={usersCount} to='/dashboard/users'>
            <UsersIcon />
          </StatsCard>
        </div>

        <div style={{ width: '20%', float: 'left' }}>
          <StatsCard name='Projectos' count={projectsCount} to='/dashboard/projects'>
            <ProjectsIcon />
          </StatsCard>
        </div>

        <div style={{ width: '20%', float: 'left' }}>
          <StatsCard name='Notícias' count={newsCount} to='/dashboard/news'>
            <NewsIcon />
          </StatsCard>
        </div>

        <div style={{ width: '20%', float: 'left' }}>
          <StatsCard name='Publicações' count={publicationsCount} to='/dashboard/publications'>
            <PublicationsIcon />
          </StatsCard>
        </div>

        <div style={{ width: '20%', float: 'left' }}>
          <StatsCard name='Curriculums' count={curriculumsCount} to='/dashboard/curriculums'>
            <CurriculumsIcon />
          </StatsCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24" stroke="currentColor"
    strokeWidth={2}
    style={{
      width: '1.4rem',
      color: '#FFFFFF'
    }}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const ProjectsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    style={{
      width: '1.4rem',
      color: '#FFFFFF'
    }}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
)

const NewsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor" strokeWidth={2}
    style={{
      width: '1.4rem',
      color: '#FFFFFF'
    }}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const PublicationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor" strokeWidth={2}
    style={{
      width: '1.4rem',
      color: '#FFFFFF'
    }}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
)

const CurriculumsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor" strokeWidth={2}
    style={{
      width: '1.4rem',
      color: '#FFFFFF'
    }}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

