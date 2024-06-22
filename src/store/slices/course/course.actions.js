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

export const setCurrentCourse = (course) => {
  return {
    type: "course/setCurrentCourse",
    payload: course,
  };
};

export const clearDraft = () => {
  return {
    type: "course/clearDraft",
  };
};

export const setDraft = (draft) => {
  return {
    type: "course/setDraft",
    payload: draft,
  };
};

export const createDraftCourse = createAsyncThunk(
  "course/createDraftCourse",
  async ({ title, category_id }, { dispatch, rejectWithValue }) => {
    try {
      const res = await courseService.createDraftCourse(title, category_id);
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      const draft = res.data;
      draft.objectives = [];
      draft.requirements = [];
      draft.targets = [];
      dispatch(setDraft(draft));
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const addAudienceDetails = createAsyncThunk(
  "course/addAudienceDetails",
  async (
    { draft_id, requirements, objectives, targets },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const res = await courseService.addAudienceDetails(
        draft_id,
        requirements,
        objectives,
        targets
      );
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      const state = await getState();
      const draft = state.course.draft;
      const newDraft = {
        ...draft,
        requirements,
        objectives,
        targets,
      };
      dispatch(setDraft(newDraft));
      return newDraft;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

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

export const deleteDraft = createAsyncThunk(
  "course/deleteDraft",
  async (id, { rejectWithValue }) => {
    try {
      const res = await courseService.deleteDraft(id);
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return id;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
