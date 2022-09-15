import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
  const response = await API.get('/departments')
  return response.data
})

export const createDepartment = createAsyncThunk('departments/createDepartment',
  async (department, { rejectWithValue }) => {
    try {
      const response = await API.post('/departments', department)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteDepartment = createAsyncThunk('departments/deleteDepartment',
  async (departmentId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/departments/${departmentId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateDepartment = createAsyncThunk('departments/updateDepartment',
  async (department, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/departments/${department._id}`, department)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  departments: [],
  status: 'idle',
  error: null
}

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchDepartments.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = state.departments.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload)
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(department => department._id !== action.payload._id)
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.map(department =>
          department._id === action.payload._id ? action.payload : department
        )
      })
  }
})

export default departmentsSlice.reducer