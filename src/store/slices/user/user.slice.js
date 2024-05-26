import { createSlice } from "@reduxjs/toolkit";
import { addSupervisor, getAllUsers } from "./user.actions"; // Adjust the import path based on your project structure

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add more reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(addSupervisor.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("user") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
