import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await API.get('/courses')
  return response.data
})

export const createCourse = createAsyncThunk('courses/createCourse',
  async (course, { rejectWithValue }) => {
    try {
      const response = await API.post('/courses', course)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCourse = createAsyncThunk('courses/deleteCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/courses/${courseId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateCourse = createAsyncThunk('courses/updateCourse',
  async (course, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/courses/${course._id}`, course)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  courses: [],
  status: 'idle',
  error: null
}


const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCourses.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = state.courses.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload)
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course._id !== action.payload._id)
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map(course =>
          course._id === action.payload._id ? action.payload : course
        )
      })
  }
})

export default coursesSlice.reducer