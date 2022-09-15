import { configureStore } from '@reduxjs/toolkit'

import projectsReducer from '../features/projects/projectsSlice'
import newsReducer from '../features/news/newsSlice'
import authReducer from '../features/auth/authSlice'
import usersReducer from '../features/users/usersSlice'
import publicationsReducer from '../features/publications/publicationsSlice'
import curriculumsRecuder from '../features/curriculums/curriculumsSlice'
import coursesReducer from '../features/courses/coursesSlice'
import departmentsReducer from '../features/departments/departmentsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    projects: projectsReducer,
    news: newsReducer,
    publications: publicationsReducer,
    curriculums: curriculumsRecuder,
    courses: coursesReducer,
    departments: departmentsReducer
  }
})

export default store