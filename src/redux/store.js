import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import users from "./users/usersSlice";
import posts from "./posts/postsSlice";

export const store = configureStore({
  reducer: { auth, users, posts },
});
