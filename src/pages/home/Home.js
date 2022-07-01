import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { courses } from '../../assets/data/home'

import styles from './Home.module.css'
import Carousel from './carousel/Carousel'
import Courses from './courses/Courses'
import Teachers from './teachers/Teachers'
import Projects from './projects/Projects'

const Home = () => {
  const projects = useSelector(state => state.projects.projects.filter(
    project => project.flags.home && project.flags.published
  ).slice(0, 3))

  const orderedProjects = projects.slice().sort((a, b) => b.startDate.localeCompare(a.startDate))

  const news = useSelector(state => state.news.news.filter(
    news => news.flags.home && news.flags.published
  ).slice(0, 12))

  const orderedNews = news.slice().reverse()

  const users = useSelector(state => state.users.users.filter(user => user.roles.teacher))
  const curriculums = useSelector(state => state.curriculums.curriculums)

  const teachers = users.map(user => {
    const curriculum = curriculums.find(curriculum => curriculum.userId === user._id)
    return { ...curriculum, name: `${user.firstName} ${user.lastName}` }
  }).filter(teacher => teacher.title)


  return (
    <div className={styles.home}>
      {/* Carousel */}
      <Carousel news={orderedNews} />

      {/* Courses Grid */}
      <div className='row'>
        <Courses courses={courses} />
      </div>

      {/* Teachers Grid */}
      <div className='row'>
        <Teachers teachers={teachers} />
      </div>

      {/* Projects Grid */}
      <div className='row'>
        <p className={styles.title}>Projectos |&nbsp;
          <Link to='/projects'>
            <span>Ver Todos Projectos</span>
          </Link>
        </p>
      </div>

      <div className='row'>
        <Projects projects={orderedProjects} />
      </div>
    </div>
  )
}

export default Home