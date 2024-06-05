/* eslint-disable no-empty-pattern */
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";
import userService from "../../../services/usersService";

export const addSupervisor = createAsyncThunk(
  "user/addSupervisor",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await authService.addSupervisor(name, email, password);
      return { user_id: res, name, email, role_name: "Admin" }; // Return necessary supervisor info
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users = await userService.getAllUsers();
      return users;
    } catch (error) {
      console.error(error);

      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, name, email }, { rejectWithValue }) => {
    try {
      const user = await userService.updateUser(id, name, email);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
