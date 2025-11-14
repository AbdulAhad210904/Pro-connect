import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";


// Fetch all posts
// export const fetchPosts = createAsyncThunk(
//     'forum/fetchPosts',
//     async (_, { rejectWithValue }) => {
//       try {
//         const response = await axiosInstance.get(`/api/forum/posts`);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );
  
  // Fetch comments for a specific post
  // export const fetchCommentsByPostId = createAsyncThunk(
  //   'forum/fetchCommentsByPostId',
  //   async (postId, { rejectWithValue }) => {
  //     try {
  //       const response = await axiosInstance.get(`/api/forum/posts/${postId}/comments`);
  //       return response.data;
  //     } catch (error) {
  //       return rejectWithValue(error.response.data);
  //     }
  //   }
  // );
  
  // Fetch posts along with their comments
  export const fetchPostsWithComments = createAsyncThunk(
    'forum/fetchPostsWithComments',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/api/forum/posts-with-comments`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Create a new post
// Thunk to create a new post
export const createPost = createAsyncThunk(
  'forum/createPost',
  async (postData, { rejectWithValue, getState }) => {
    try {
      //console get state
      const state = getState();
      console.log(state);
      // Make the request with Authorization header
      const response = await axiosInstance.post(`/api/forum/posts`, postData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

  // Add a comment to a post
  export const createPostComment = createAsyncThunk(
    'forum/createPostComment',
    async ({ postId, commentData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(
          `/api/forum/posts/${postId}/comments`,
          commentData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Upvote a post
  export const upvotePost = createAsyncThunk(
    'forum/upvotePost',
    async (postId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`/api/forum/posts/${postId}/upvote`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Downvote a post
  export const downvotePost = createAsyncThunk(
    'forum/downvotePost',
    async (postId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`/api/forum/posts/${postId}/downvote`);
        return response.data;
      } catch (error) {
        // console.log(error)
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  export const upvoteComment = createAsyncThunk(
    'forum/upvoteComment',
    async ( postId , { rejectWithValue }) => {
      try {

        const response = await axiosInstance.post(
          `/api/forum/posts/${postId}/upvoteComment`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const downvoteComment = createAsyncThunk(
    'forum/downvoteComment',
    async (postId , { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(
          `/api/forum/posts/${postId}/downvoteComment`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );