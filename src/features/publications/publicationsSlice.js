import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchPublications = createAsyncThunk('publications/fetchPublications', async () => {
  const response = await API.get('/publications')
  return response.data
})

export const createPublication = createAsyncThunk('publications/createPublication',
  async (publication) => {
    const response = await API.post('/publications', publication)
    return response.data
  }
)

export const deletePublication = createAsyncThunk('publications/deletePublication',
  async (publicationsId) => {
    const response = await API.delete(`/publications/${publicationsId}`)
    return response.data
  }
)

export const updatePublication = createAsyncThunk('publications/updatePublication',
  async (publication) => {
    const response = await API.patch(`/publications/${publication._id}`, publication)
    return response.data
  }
)

const initialState = {
  publications: [],
  status: 'idle',
  error: null
}

const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchPublications.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPublications.fulfilled, (state, action) => {
        state.publications = state.publications.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchPublications.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createPublication.fulfilled, (state, action) => {
        state.publications.push(action.payload)
      })
      .addCase(deletePublication.fulfilled, (state, action) => {
        state.publications = state.publications.filter(publication =>
          publication._id !== action.payload._id
        )
      })
      .addCase(updatePublication.fulfilled, (state, action) => {
        state.publications = state.publications.map(publication =>
          publication._id === action.payload._id ? action.payload : publication
        )
      })
  }
})

export default publicationsSlice.reducer