/* eslint-disable no-empty-pattern */
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";
import userService from "../../../services/usersService";

export const addSupervisor = createAsyncThunk(
  "user/addSupervisor",
  async ({ name, email, password }, { rejectWithValue }) => {
    const res = await authService.addSupervisor(name, email, password);
    console.log(res);
    if (res.error) {
      return rejectWithValue(res.error);
    }
    return { user_id: res.data, name, email, role_name: "Admin" }; // Return necessary supervisor info
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    const res = await userService.getAllUsers();
    if (res.error) {
      return rejectWithValue(res.error);
    }
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id }, { rejectWithValue }) => {
    const res = await userService.deleteUser(id);
    if (res.error) {
      return rejectWithValue(res.error);
    }
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ user_id, name, email }, { rejectWithValue }) => {
    const res = await userService.updateUser(user_id, name, email);
    if (res.error) {
      return rejectWithValue(res.error);
    }
    return { user_id, name, email };
  }
);
