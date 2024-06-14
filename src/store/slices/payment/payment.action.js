import { createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../../../services/paymentService";

// Define the action creator function
export const getAllPayment = createAsyncThunk(
  "course/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await paymentService.getAllPayment();
      if (!res.success) {
        return rejectWithValue(res.error);
      }
      return res.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
