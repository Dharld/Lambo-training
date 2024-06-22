import { createSlice } from "@reduxjs/toolkit";
import {
  addAudienceDetails,
  addCourse,
  createDraftCourse,
  deleteCourse,
  getAllCourses,
  getAllUserNonEnrolledCourses,
  getUserCourses,
} from "./course.actions";

const draft = JSON.parse(localStorage.getItem("draft"));

const initialState = {
  courses: [],
  displayedCourses: [],
  draft: draft || null,
  currentCourse: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // Add a new course to the state
    setCurrentCourse: (state, action) => {
      state.currentCourse = {
        ...state.currentCourse,
        ...action.payload,
      };
    },
    setDraft: (state, action) => {
      state.draft = action.payload;
      localStorage.setItem("draft", JSON.stringify(state.draft));
    },
    clearDraft: (state) => {
      state.draft = null;
      localStorage.removeItem("draft");
    },
    filterCourses: (state, action) => {
      state.displayedCourses = state.courses.filter(action.payload);
    },
    filterCoursesByName: (state, action) => {
      if (action.payload === "") {
        state.displayedCourses = state.courses;
        return;
      }
      state.displayedCourses = state.courses.filter((course) =>
        course.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterCoursesByLevel: (state, action) => {
      const levels = action.payload;
      if (levels.length === 0) {
        state.displayedCourses = state.courses;
        return;
      }
      state.displayedCourses = state.courses.filter((course) =>
        levels.includes(course.level)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAudienceDetails.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createDraftCourse.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(getAllUserNonEnrolledCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.displayedCourses = state.courses;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
        state.error = null;
      })
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
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course.course_id !== action.payload
        );
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
