import { createSlice } from "@reduxjs/toolkit";
import { addCourse, getUserCourses } from "./course.actions";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("course") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // Handle rejected actions for all async thunk actions
        (action) =>
          action.type.startsWith("course") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false; // Set loading to false for rejected actions
          state.error = action.error; // Set error message from action payload
        }
      );
  },
});

export default courseSlice.reducer;
