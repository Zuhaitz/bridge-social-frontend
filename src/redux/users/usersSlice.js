import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  profile: null,
  posts: null,
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getById.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { reset } = usersSlice.actions;

export default usersSlice.reducer;
