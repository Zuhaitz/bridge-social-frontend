import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comments: [],
};

export const postComment = createAsyncThunk(
  "comments/postComment",
  async (postId, commentData, thunkAPI) => {
    try {
      console.log(postId, commentData);

      // return await commentsService.postComment(postId, commentData);
    } catch (error) {
      console.error("Create comment error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default commentsSlice.reducer;
