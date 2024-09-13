import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userStorage = JSON.parse(localStorage.getItem("user"));
const tokenStorage = JSON.parse(localStorage.getItem("token"));

const initialState = {
  user: userStorage || null,
  token: tokenStorage || null,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      console.error("Register error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.error("Login error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error("Logout error: ", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = "";
      state.isSuccess = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isSuccess = true;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
