import { createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../../../services/courseService";

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const courses = await courseService.getAllCourses();
      return courses;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getUserCourses = createAsyncThunk(
  "course/getUserCourses",
  async (_, { rejectWithValue }) => {
    try {
      const courses = await courseService.getUserCourses();
      return courses;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (data, { rejectWithValue }) => {
    try {
      const { title, description, file, price, level } = data;
      const course = await courseService.addCourse(
        title,
        description,
        +price,
        file,
        level
      );
      return course;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);