import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const signin = createAsyncThunk('auth/signin', async (credentials) => {
  const response = await API.post('/users/signin', credentials)
  return response.data
})

export const signup = createAsyncThunk('auth/signup', async (user) => {
  const response = await API.post('/users/signup', user)
  return response.data
})

const initialState = { auth: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout(state) {
      // localStorage.clear()
      localStorage.removeItem('famedv1_user')
      return initialState
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.auth = action.payload
        localStorage.setItem('famedv1_user', JSON.stringify(action.payload))
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.auth = action.payload
        localStorage.setItem('famedv1_user', JSON.stringify(action.payload))
      })
  }
})

export const { signout } = authSlice.actions

export default authSlice.reducer