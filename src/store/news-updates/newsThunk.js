import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../utils/axios";

// Thunk to fetch all news
export const fetchNews = createAsyncThunk('news/fetchNews', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/api/news');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk to create a news item
export const createNews = createAsyncThunk('news/createNews', async (newsData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/api/news', newsData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk to update a news item
export const updateNews = createAsyncThunk('news/updateNews', async ({ id, newsData }, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/api/news/${id}`, newsData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk to delete a news item
export const deleteNews = createAsyncThunk('news/deleteNews', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/api/news/${id}`);
    console.log(response);
    return { id };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
