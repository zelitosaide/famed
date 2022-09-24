import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { fetchProjects } from './features/projects/projectsSlice'
import { fetchNews } from './features/news/newsSlice'
import { fetchUsers } from './features/users/usersSlice'
import { fetchCurriculums } from './features/curriculums/curriculumsSlice'
import { fetchPublications } from './features/publications/publicationsSlice'

import ActivityContainer from './ActivityContainer'

import ProjectList from './features/projects/ProjectList'
import ProjectDetails from './features/projects/ProjectDetails'
import NewsLists from './features/news/NewsLists'
import NewsDetails from './features/news/NewsDetails'
import PublicationList from './features/publications/PublicationList'

import Home from './pages/home/Home'
import SiteLayout from './pages/site_layout/SiteLayout'
import Graduation from './pages/graduation/Graduation'
import Postgraduate from './pages/postgraduate/Postgraduate'
import About from './pages/about/About'
import Protocols from './pages/protocols/Protocols'
import Extension from './pages/extension/Extension'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'

import Signin from './features/auth/Signin'
// import Signup from './features/auth/Signup'
import CreateProject from './features/projects/CreateProject'
import ProjectTable from './features/projects/ProjectTable'
import UpdateProject from './features/projects/UpdateProject'
import RequireAuth from './features/auth/RequireAuth'
import UserTable from './features/users/UserTable'
import UpdateUser from './features/users/UpdateUser'
import CreateUser from './features/users/CreateUser'
import NewsTable from './features/news/NewsTable'
import UpdateNews from './features/news/UpdateNews'
import CreateNews from './features/news/CreateNews'
import PublicationTable from './features/publications/PublicationTable'
import UpdatePublication from './features/publications/UpdatePublication'
import CreatePublication from './features/publications/CreatePublication'
import CreateCurriculum from './features/curriculums/CreateCurriculum'
import CurriculumTable from './features/curriculums/CurriculumTable'
import UpdateCurriculum from './features/curriculums/UpdateCurriculum'
import CurriculumDetails from './features/curriculums/CurriculumDetails'
import InProgress from './components/in_progress/InProgress'
import ProtocolsLayout from './pages/protocols/ProtocolsLayout'

import { CourseTable } from './features/courses/CourseTable'
import { UpdateCourse } from './features/courses/UpdateCourse'
import { CreateCourse } from './features/courses/CreateCourse'
import { CourseList } from './features/courses/CourseList'
import { fetchCourses } from './features/courses/coursesSlice'
import { CourseDetails } from './features/courses/CourseDetails'
import { DepartmentDetails } from './features/departments/DepartmentDetails'
import { DepartmentTable } from './features/departments/DepartmentTable'
import { UpdateDepartment } from './features/departments/UpdateDepartment'
import { CreateDepartment } from './features/departments/CreateDepartment'
import { fetchDepartments } from './features/departments/departmentsSlice'

const App = () => {
  const projectStatus = useSelector(state => state.projects.status)
  const newsStatus = useSelector(state => state.news.status)
  const usersStatus = useSelector(state => state.users.status)
  const curriculumsStatus = useSelector(state => state.curriculums.status)
  const publicationsStatus = useSelector(state => state.publications.status)
  const coursesStatus = useSelector(state => state.courses.status)
  const departmentsStatus = useSelector(state => state.departments.status)

  const dispatch = useDispatch()

  useEffect(() => {
    if (projectStatus === 'idle') dispatch(fetchProjects())
  }, [projectStatus, dispatch])

  useEffect(() => {
    if (newsStatus === 'idle') dispatch(fetchNews())
  }, [newsStatus, dispatch])

  useEffect(() => {
    if (usersStatus === 'idle') dispatch(fetchUsers())
  }, [usersStatus, dispatch])

  useEffect(() => {
    if (curriculumsStatus === 'idle') dispatch(fetchCurriculums())
  }, [curriculumsStatus, dispatch])

  useEffect(() => {
    if (publicationsStatus === 'idle') dispatch(fetchPublications())
  }, [publicationsStatus, dispatch])

  useEffect(() => {
    if (coursesStatus === 'idle') dispatch(fetchCourses())
  }, [coursesStatus, dispatch])

  useEffect(() => {
    if (departmentsStatus === 'idle') dispatch(fetchDepartments())
  }, [departmentsStatus, dispatch])

  if (
    projectStatus === 'pending'
    || newsStatus === 'pending'
    || usersStatus === 'pending'
    || curriculumsStatus === 'pending'
    || publicationsStatus === 'pending'
    || departmentsStatus === 'pending'
    || coursesStatus === 'pending'
  ) {
    return <ActivityContainer />
  }

  if (
    projectStatus === 'fulfilled'
    && newsStatus === 'fulfilled'
    && usersStatus === 'fulfilled'
    && curriculumsStatus === 'fulfilled'
    && publicationsStatus === 'fulfilled'
    && departmentsStatus === 'fulfilled'
    && coursesStatus === 'fulfilled'
  ) {
    return (
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path='projects'>
            <Route index element={<ProjectList />} />
            <Route path=':projectId' element={<ProjectDetails />} />
          </Route>
          <Route path='news'>
            <Route index element={<NewsLists />} />
            <Route path=':newsId' element={<NewsDetails />} />
          </Route>
          <Route path='publications' element={<PublicationList />} />
          <Route path='about' element={<About />} />
          <Route path='minicourse'>
            <Route index element={<CourseList />} />
            <Route path=':courseId' element={<CourseDetails />} />
          </Route>
          <Route path='departments'>
            <Route path=':departmentId' element={<DepartmentDetails />} />
          </Route>


          {/* <Route path='graduation' element={<Graduation />} />
          <Route path='postgraduate' element={<Postgraduate />} />
          <Route path='protocols' element={<Protocols />} />
          <Route path='extension' element={<Extension />} />
          */}

          {/* Temporarias */}
          <Route path='graduation' element={<InProgress />} />
          <Route path='postgraduate' element={<InProgress />} />
          {/* <Route path='about' element={<InProgress />} /> */}
          {/* <Route path='protocols' element={<InProgress />} /> */}
          <Route path='extension' element={<InProgress />} />


          <Route path='teachers/:teacherId' element={<CurriculumDetails />} />
          <Route path='signin' element={<Signin />} />
          {/* <Route path='signup' element={<Signup />} /> */}
        </Route>

        <Route path='/protocols' element={<ProtocolsLayout />}>
          <Route index element={<Protocols />} />
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='projects'>
            <Route index element={<RequireAuth><ProjectTable /></RequireAuth>} />
            <Route path='edit/:projectId' element={<RequireAuth><UpdateProject /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreateProject /></RequireAuth>} />
          </Route>
          <Route path='users'>
            <Route index element={<RequireAuth><UserTable /></RequireAuth>} />
            <Route path='edit/:userId' element={<RequireAuth><UpdateUser /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreateUser /></RequireAuth>} />
          </Route>
          <Route path='news'>
            <Route index element={<RequireAuth><NewsTable /></RequireAuth>} />
            <Route path='edit/:newsId' element={<RequireAuth><UpdateNews /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreateNews /></RequireAuth>} />
          </Route>
          <Route path='publications'>
            <Route index element={<RequireAuth><PublicationTable /></RequireAuth>} />
            <Route path='edit/:publicationId' element={<RequireAuth><UpdatePublication /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreatePublication /></RequireAuth>} />
          </Route>
          <Route path='curriculums'>
            <Route index element={<RequireAuth><CurriculumTable /></RequireAuth>} />
            <Route path='edit/:curriculumId' element={<RequireAuth><UpdateCurriculum /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreateCurriculum /></RequireAuth>} />
          </Route>
          <Route path='courses'>
            <Route index element={<RequireAuth><CourseTable /></RequireAuth>} />
            <Route path='edit/:courseId' element={<RequireAuth><UpdateCourse /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreateCourse /></RequireAuth>} />
          </Route>
          <Route path='departments'>
            <Route index element={<RequireAuth><DepartmentTable /></RequireAuth>} />
            <Route path='edit/:departmentId' element={<RequireAuth><UpdateDepartment /></RequireAuth>} />
            <Route path='create' element={<RequireAuth><CreateDepartment /></RequireAuth>} />
          </Route>
        </Route>
      </Routes>
    )
  }
}

export default App