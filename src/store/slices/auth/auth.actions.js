import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ credentials }, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const user = await authService.login(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem("user");
      localStorage.removeItem("supabase.auth.token");
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);
