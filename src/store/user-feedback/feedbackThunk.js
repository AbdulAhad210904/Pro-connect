import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

// Thunk to fetch all feedbacks
export const fetchAllFeedbacks = createAsyncThunk(
  "feedbacks/fetchAllFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/feedbacks");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to create new feedback
export const createNewFeedback = createAsyncThunk(
  "feedbacks/createNewFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/feedbacks", feedbackData);
      return response.data.feedback;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);