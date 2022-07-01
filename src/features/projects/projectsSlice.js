import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await API.get('/projects')
  return response.data
})

export const createProject = createAsyncThunk('projects/createProject', async (project) => {
  const response = await API.post('/projects', project)
  return response.data
})

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId) => {
  const response = await API.delete(`/projects/${projectId}`)
  return response.data
})

export const updateProject = createAsyncThunk('projects/updateProject', async (project) => {
  const response = await API.patch(`/projects/${project._id}`, project)
  return response.data
})

const initialState = {
  projects: [],
  status: 'idle',
  error: null
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = state.projects.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project._id !== action.payload._id)
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        )
      })
  }
})

export default projectsSlice.reducer