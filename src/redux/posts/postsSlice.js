import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isSuccess: false,
  isLoading: false,
};

export const getAll = createAsyncThunk("posts/getAll", async (thunkAPI) => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.log("Get all posts error: ", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (userData, { rejectWithValue }) => {
    try {
      return await postsService.createPost(userData);
    } catch (error) {
      console.error("Create post error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts.unshift(action.payload.post);
      });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
