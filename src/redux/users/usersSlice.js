import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  profile: null,
  posts: null,
  isSuccess: false,
  isLoading: false,
};

export const getById = createAsyncThunk(
  "users/getById",
  async (userId, { rejectWithValue }) => {
    try {
      return await usersService.getById(userId);
    } catch (error) {
      console.error("User get by id error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostsById = createAsyncThunk(
  "users/getPostsById",
  async (userId, { rejectWithValue }) => {
    try {
      return await usersService.getPostsById(userId);
    } catch (error) {
      console.error("Posts of user by id error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadImages = createAsyncThunk(
  "users/uploadImages",
  async (images, { rejectWithValue }) => {
    try {
      return await usersService.uploadImages(images);
    } catch (error) {
      console.error("Upload images of user error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getById.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getPostsById.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        const { banner, picture } = action.payload;
        banner && (state.profile.banner = banner);
        picture && (state.profile.picture = picture);

        const user = JSON.parse(localStorage.getItem("user"));
        user.banner = banner;
        user.picture = picture;
        localStorage.setItem("user", JSON.stringify(user));

        state.isSuccess = true;
      })
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = usersSlice.actions;

export default usersSlice.reducer;
