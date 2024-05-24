import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.actions";
import User from "../../../models/user";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ?? null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const loggedUser = new User({
          id: action.payload.user_id,
          email: action.payload.email,
          role: action.payload.role_name,
          profilePicture: action.payload.profile_picture,
          name: action.payload.name,
        });
        localStorage.setItem("user", JSON.stringify(loggedUser));
        state.user = loggedUser;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // Handle rejected actions for all async thunk actions
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false; // Set loading to false for rejected actions
          state.error = action.error; // Set error message from action payload
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
