import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchCurriculums = createAsyncThunk('curriculums/fetchCurriculums',
  async () => {
    const response = await API.get('/curriculums')
    return response.data
  }
)

export const createCurriculum = createAsyncThunk('curriculums/createCurriculum',
  async (curriculum, { rejectWithValue }) => {
    try {
      const response = await API.post('/curriculums', curriculum)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCurriculum = createAsyncThunk('curriculums/deleteCurriculum',
  async (curriculumId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/curriculums/${curriculumId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateCurriculum = createAsyncThunk('curriculums/updateCurriculum',
  async (curriculum, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/curriculums/${curriculum._id}`, curriculum)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  curriculums: [],
  status: 'idle',
  error: null
}

const curriculumSlice = createSlice({
  name: 'curriculums',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCurriculums.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchCurriculums.fulfilled, (state, action) => {
        state.curriculums = state.curriculums.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchCurriculums.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createCurriculum.fulfilled, (state, action) => {
        state.curriculums.push(action.payload)
      })
      .addCase(deleteCurriculum.fulfilled, (state, action) => {
        state.curriculums = state.curriculums.filter(
          curriculum => curriculum._id !== action.payload._id
        )
      })
      .addCase(updateCurriculum.fulfilled, (state, action) => {
        state.curriculums = state.curriculums.map(curriculum =>
          curriculum._id === action.payload._id ? action.payload : curriculum
        )
      })
  }
})

export default curriculumSlice.reducer