import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ credentials }, { rejectWithValue }) => {
    const { name, email, password } = credentials;

    const res = await authService.signup(name, email, password);

    if (!res.success) {
      return rejectWithValue(res.error);
    }

    return res.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ credentials }, { rejectWithValue }) => {
    const { email, password } = credentials;

    const res = await authService.login(email, password);

    if (!res.success) {
      return rejectWithValue(res.error);
    }

    return res.data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const res = await authService.logout();

    if (!res.success) {
      return rejectWithValue(res.error);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("supabase.auth.token");
    return res.data;
  }
);
