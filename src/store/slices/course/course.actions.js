import { createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../../../services/courseService";

export const filterCourses = (filter) => {
  return {
    type: "course/filterCourses",
    payload: filter,
  };
};

export const filterCoursesByName = (searchTerm) => {
  return {
    type: "course/filterCoursesByName",
    payload: searchTerm,
  };
};

export const filterCoursesByLevel = (levels) => {
  return {
    type: "course/filterCoursesByLevel",
    payload: levels,
  };
};
export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await courseService.getAllCourses();
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return res.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getAllUserEnrolledCourses = createAsyncThunk(
  "course/getAllUserEnrolledCourses",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const res = await courseService.getAllUserEnrolledCourses(user_id);
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return res.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getAllUserNonEnrolledCourses = createAsyncThunk(
  "course/getAllUserNonEnrolledCourses",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const res = await courseService.getAllUserNonEnrolledCourses(user_id);
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return res.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getUserCourses = createAsyncThunk(
  "course/getUserCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await courseService.getUserCourses();
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return res.data;
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

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await courseService.deleteCourse(id);
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return id;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
