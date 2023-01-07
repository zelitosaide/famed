import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchBiostatisticsConsultations = createAsyncThunk(
  'biostatistics-consultations/fetchBiostatisticsConsultations',
  async () => {
    const response = await API.get('/biostatistics-consultations')
    return response.data
  }
)

export const createBiostatisticsConsultation = createAsyncThunk(
  'biostatistics-consultations/createBiostatisticsConsultation',
  async (biostatisticsConsultation, { rejectWithValue }) => {
    try {
      const response = await API.post(
        '/biostatistics-consultations',
        biostatisticsConsultation
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteBiostatisticsConsultation = createAsyncThunk(
  'biostatistics-consultations/deleteBiostatisticsConsultation',
  async (biostatisticsConsultationId, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/biostatistics-consultations/${biostatisticsConsultationId}`
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateBiostatisticsConsultation = createAsyncThunk(
  'biostatistics-consultations/updateBiostatisticsConsultation',
  async (biostatisticsConsultation, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `/biostatistics-consultations/${biostatisticsConsultation._id}`,
        biostatisticsConsultation
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  biostatisticsConsultations: [],
  status: 'idle',
  error: null,
}

const biostatisticsConsultationsSlice = createSlice({
  name: 'biostatisticsConsultations',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchBiostatisticsConsultations.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchBiostatisticsConsultations.fulfilled, (state, action) => {
        state.biostatisticsConsultations =
          state.biostatisticsConsultations.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchBiostatisticsConsultations.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createBiostatisticsConsultation.fulfilled, (state, action) => {
        state.biostatisticsConsultations.push(action.payload)
      })
      .addCase(deleteBiostatisticsConsultation.fulfilled, (state, action) => {
        state.biostatisticsConsultations =
          state.biostatisticsConsultations.filter(
            (biostatisticsConsultation) =>
              biostatisticsConsultation._id !== action.payload._id
          )
      })
      .addCase(updateBiostatisticsConsultation.fulfilled, (state, action) => {
        state.biostatisticsConsultations = state.biostatisticsConsultations.map(
          (biostatisticsConsultation) =>
            biostatisticsConsultation._id === action.payload._id
              ? action.payload
              : biostatisticsConsultation
        )
      })
  },
})

export default biostatisticsConsultationsSlice.reducer
