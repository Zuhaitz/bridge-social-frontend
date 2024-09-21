import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: null,
  comments: null,
  isSuccess: false,
  isLoading: false,
  postLiked: "",
};

export const getAll = createAsyncThunk("posts/getAll", async (thunkAPI) => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.log("Get all posts error: ", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getById = createAsyncThunk(
  "posts/getById",
  async (postId, thunkAPI) => {
    try {
      return await postsService.getById(postId);
    } catch (error) {
      console.log("Get post by id error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCommentsById = createAsyncThunk(
  "posts/getCommentsById",
  async (postId, thunkAPI) => {
    try {
      return await postsService.getCommentsById(postId);
    } catch (error) {
      console.log("Get post comments by id error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postData, { rejectWithValue }) => {
    try {
      const { id, like } = postData;
      return await postsService.likePost(id, like);
    } catch (error) {
      console.error("Like post error: ", error);
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
      state.postLiked = "";
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
      .addCase(getById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getCommentsById.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts.unshift(action.payload.post);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.postLiked = action.payload._id;
      });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
