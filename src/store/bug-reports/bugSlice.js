import { createSlice } from '@reduxjs/toolkit';
import { fetchBugReports, createBugReport } from './bugThunk';

const initialState = {
  bugReports: [],
  loading: false,
  error: null,
};

const bugSlice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    // Reducer to clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bug Reports
      .addCase(fetchBugReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBugReports.fulfilled, (state, action) => {
        state.loading = false;
        state.bugReports = action.payload;
      })
      .addCase(fetchBugReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Bug Report
      .addCase(createBugReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBugReport.fulfilled, (state, action) => {
        state.loading = false;
        state.bugReports.push(action.payload); // Add the new bug report
      })
      .addCase(createBugReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = bugSlice.actions;
export default bugSlice.reducer;
