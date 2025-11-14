import { createSlice } from "@reduxjs/toolkit";

import {createProfile,getProfile,updateProfile} from "./craftsmanProfileThunk"
import Cookies from 'js-cookie'

const craftsmanProfileSlice = createSlice({
    
    name: "craftsmanProfile",
    initialState: {
      profile: null,
      loading: false,
      error: null,
    },
    reducers: {
      resetState: (state) => {
        state.profile = null;
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Create Profile
        .addCase(createProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        })
        .addCase(createProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Get Profile
        .addCase(getProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          
          state.profile = action.payload;
          
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Update Profile
        .addCase(updateProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload.response;
          if(action.payload.token){
            Cookies.remove('token');
            Cookies.set("token", action.payload.token, {
              secure: process.env.NODE_ENV === "production",
              sameSite: "None",
            });
            document.dispatchEvent(new Event("authChange"));
          }

        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { resetState } = craftsmanProfileSlice.actions;
  
  export default craftsmanProfileSlice.reducer;
  