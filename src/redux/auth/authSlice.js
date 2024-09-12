import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import authService from "./authService";

const userStorage = JSON.parse(localStorage.getItem("user"));
const tokenStorage = JSON.parse(localStorage.getItem("token"));

const initialState = {
  user: userStorage || null,
  token: tokenStorage || null,
};

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
    });
  },
});

export default authSlice.reducer;
