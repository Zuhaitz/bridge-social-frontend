import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment: null,
  isSuccess: false,
  isLoading: false,
  commentUploaded: false,
  commentLiked: "",
};

export const postComment = createAsyncThunk(
  "comments/postComment",
  async (commentData, thunkAPI) => {
    try {
      const { post, content, picture } = commentData;

      return await commentsService.postComment(post, { content, picture });
    } catch (error) {
      console.error("Create comment error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (commentData, thunkAPI) => {
    try {
      const { id, isLiked } = commentData;
      return await commentsService.likeComment(id, isLiked);
    } catch (error) {
      console.error("Like comment error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.commentUploaded = false;
      state.commentLiked = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comment = action.payload.comment;
        state.isSuccess = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.commentLiked = action.payload._id;
      });
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
