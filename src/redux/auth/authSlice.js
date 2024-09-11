import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  token: null,
};

export const register = createAsyncThunk("auth/register", async (userData) => {
  console.log("User info: ", userData);
  try {
    return await authService.register(userData);
  } catch (error) {
    console.error(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
