import { createSlice } from '@reduxjs/toolkit';
import { fetchAllFeedbacks, createNewFeedback } from './feedbackThunk';

const feedbackSlice = createSlice({
    name: "feedbacks",
    initialState: {
      feedbacks: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllFeedbacks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks = action.payload;
        })
        .addCase(fetchAllFeedbacks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Handle createNewFeedback
      builder
        .addCase(createNewFeedback.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createNewFeedback.fulfilled, (state, action) => {
          state.loading = false;
          state.feedbacks.push(action.payload);
        })
        .addCase(createNewFeedback.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default feedbackSlice.reducer;
  
