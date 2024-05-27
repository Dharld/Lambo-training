import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";

export const login = createAsyncThunk("auth/login", async ({ credentials }) => {
  const { email, password } = credentials;
  try {
    const user = await authService.login(email, password);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
