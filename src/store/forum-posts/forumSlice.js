import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsWithComments, createPost, createPostComment, upvotePost, downvotePost, upvoteComment, downvoteComment } from "./forumThunk";

// Slice for Forum State Management
const forumSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchPostsWithComments
      .addCase(fetchPostsWithComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsWithComments.fulfilled, (state, action) => {
        state.loading = false;
        // Storing posts and their comments in the state as they are returned
        state.posts = action.payload.map(post => ({
          id: post.id,
          author: post.author,
          content: post.content,
          timestamp: post.timestamp,
          likes: post.likes,
          dislikes: post.dislikes,
          replies: post.replies
        }));
      })
      .addCase(fetchPostsWithComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = (action.payload.posts);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createPostComment
      .addCase(createPostComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = (action.payload.posts);
      })
      .addCase(createPostComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle upvotePost
      .addCase(upvotePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload.post;
        const postIndex = state.posts.findIndex((p) => p.id === updatedPost._id);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = updatedPost.upvotes;
          state.posts[postIndex].dislikes = updatedPost.downvotes;

        }

      })
      .addCase(upvotePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle downvotePost
      .addCase(downvotePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload.post;
        const postIndex = state.posts.findIndex((p) => p.id === updatedPost._id);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = updatedPost.upvotes;
          state.posts[postIndex].dislikes = updatedPost.downvotes;
        }
      })
      .addCase(downvotePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle upvoteComment
      .addCase(upvoteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upvoteComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload.comment;
        const commentId = updatedComment._id;  // Use the updatedComment's ID directly
        // const postId = action.meta.arg;
        // console.log(JSON.parse(JSON.stringify(state.posts)));
        // console.log(postId)
        // const post = state.posts.find(p => p.id === postId);
        for (let post of state.posts) {
          const commentIndex = post.replies.findIndex((c) => c.id === commentId);
          if (commentIndex !== -1) {
            // Update the like/dislike counts for the found comment
            post.replies[commentIndex].likes = updatedComment.upvotes;
            post.replies[commentIndex].dislikes = updatedComment.downvotes;  // You can update dislikes similarly
          }
        }
      })
      .addCase(upvoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle downvoteComment
      .addCase(downvoteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downvoteComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload.comment;
        const commentId = updatedComment._id;  // Use the updatedComment's ID directly
        // const postId = action.meta.arg;
        // console.log(JSON.parse(JSON.stringify(state.posts)));
        // console.log(postId)
        // const post = state.posts.find(p => p.id === postId);
        for (let post of state.posts) {
          const commentIndex = post.replies.findIndex((c) => c.id === commentId);
          if (commentIndex !== -1) {
            // console.log(updatedComment)
            // Update the like/dislike counts for the found comment
            post.replies[commentIndex].dislikes = updatedComment.downvotes;  
            post.replies[commentIndex].likes = updatedComment.upvotes;
          }
        }
      })
      .addCase(downvoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default forumSlice.reducer;
