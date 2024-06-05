import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth.slice";
import userReducer from "./slices/user/user.slice";
import courseReducer from "./slices/course/course.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    course: courseReducer,
  },
});
