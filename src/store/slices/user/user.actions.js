/* eslint-disable no-empty-pattern */
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";
import userService from "../../../services/usersService";

export const addSupervisor = createAsyncThunk(
  "user/addSupervisor",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await authService.addSupervisor(name, email, password);
      return { name, email }; // Return necessary supervisor info
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
