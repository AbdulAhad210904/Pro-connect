import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, createNews, updateNews, deleteNews } from './newsThunk';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch news
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create news
      .addCase(createNews.fulfilled, (state, action) => {
        state.items.push(action.payload.news);
      })
      // Update news
      .addCase(updateNews.fulfilled, (state, action) => {
        const index = state.items.findIndex((news) => news._id === action.payload.news._id);
        if (index !== -1) {
          state.items[index] = action.payload.news;
        }
      })
      // Delete news
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.items = state.items.filter((news) => news._id !== action.payload.id);
      });
  },
});

export default newsSlice.reducer;
