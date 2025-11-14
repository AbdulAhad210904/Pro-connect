import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

// Define API base URL
const API_BASE_URL = "/api/craftsmanProfile";

// Async Thunks
export const createProfile = createAsyncThunk(
  "craftsmanProfile/createProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/createProfile`, profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating profile");
    }
  }
);
export const getProfile = createAsyncThunk(  "craftsmanProfile/getProfile", async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/getProfile`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });


  export const updateProfile = createAsyncThunk(
    "craftsmanProfile/updateProfile",
    async (profileData, { rejectWithValue }) => {
      try {
        let response;
  
        if (profileData.profilePicture instanceof File) {
          // Handle form data when profilePicture is a file
          const formData = new FormData();
          Object.keys(profileData).forEach((key) => {
            if (key === "profilePicture") {
              // Append the file
              formData.append(key, profileData[key]);
            } else if (typeof profileData[key] === "object" && profileData[key] !== null) {
              // Append nested objects as JSON strings
              formData.append(key, JSON.stringify(profileData[key]));
            } else {
              formData.append(key, profileData[key]);
            }
          });
  
          // Send multipart/form-data request
          response = await axiosInstance.put(`${API_BASE_URL}/updateProfile`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          // Send JSON request if no file is included
          response = await axiosInstance.put(`${API_BASE_URL}/updateProfile`, profileData);
        }
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error updating profile");
      }
    }
  );
  

