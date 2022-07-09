import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await API.get('/users')
  return response.data
})

export const createUser = createAsyncThunk('users/createUser', async (user, { rejectWithValue }) => {
  try {
    const response = await API.post('/users', user)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateUser = createAsyncThunk('users/updateUser', async (user, { rejectWithValue }) => {
  try {
    const response = await API.patch(`/users/${user._id}`, user)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await API.delete(`/users/${userId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users = state.users.concat(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user)
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload._id)
      })
  }
})

export default usersSlice.reducer