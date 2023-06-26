import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postsSlice from "./slices/postsSlice";
import authSlice from "./slices/authSlice";


const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    auth: authSlice,
  },
});

export default store;