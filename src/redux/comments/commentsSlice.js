import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment: null,
  isSuccess: false,
};

export const postComment = createAsyncThunk(
  "comments/postComment",
  async (commentData, thunkAPI) => {
    try {
      const { post, content } = commentData;

      return await commentsService.postComment(post, { content });
    } catch (error) {
      console.error("Create comment error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comment = action.payload.comment;
      state.isSuccess = true;
    });
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
