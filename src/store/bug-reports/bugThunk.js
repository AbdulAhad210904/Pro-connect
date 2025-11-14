import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

const API_URL = '/api/bug-reports'; // Base API URL

// Thunk to fetch all bug reports
export const fetchBugReports = createAsyncThunk('bugs/fetchBugReports', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data; // The array of bug reports
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching bug reports');
  }
});

// Thunk to create a new bug report
export const createBugReport = createAsyncThunk('bugs/createBugReport', async (bugData, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('description', bugData.description);
    formData.append('additionalInfo', bugData.additionalInfo);

    if (bugData.bugScreenshots) {
      bugData.bugScreenshots.forEach((file) => {
        formData.append('bugScreenshots', file);
      });
    }

    const response = await axiosInstance.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // The created bug report
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Error creating bug report');
  }
});
