import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API } from '../../api/client'

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await API.get('/news')
  return response.data
})

export const createNews = createAsyncThunk('news/createNews', async (news, { rejectWithValue }) => {
  try {
    const response = await API.post('/news', news)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const deleteNews = createAsyncThunk('news/deleteNews', async (newsId, { rejectWithValue }) => {
  try {
    const response = await API.delete(`/news/${newsId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateNews = createAsyncThunk('news/updateNews', async (news, { rejectWithValue }) => {
  try {
    const response = await API.patch(`/news/${news._id}`, news)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const initialState = {
  news: [],
  status: 'idle',
  error: null
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = state.news.concat(action.payload)
        state.status = 'fulfilled'
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.news.push(action.payload)
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter(news => news._id !== action.payload._id)
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.news = state.news.map(news =>
          news._id === action.payload._id ? action.payload : news
        )
      })
  }
})

export default newsSlice.reducer