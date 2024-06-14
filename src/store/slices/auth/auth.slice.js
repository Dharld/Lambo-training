import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup } from "./auth.actions";

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
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(login.fulfilled, (state, action) => {
        const loggedUser = {
          id: action.payload.user_id,
          email: action.payload.email,
          role: action.payload.role_name,
          profilePicture: action.payload.profile_picture,
          name: action.payload.name,
        };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        state.user = loggedUser;
        state.loading = false;
        state.error = null;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // Handle rejected actions for all async thunk actions
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/rejected"),
        (state, action) => {
          console.log(action);
          state.loading = false; // Set loading to false for rejected actions
          state.error = action.payload; // Set error message from action payload
        }
      );
  },
});

export default authSlice.reducer;
