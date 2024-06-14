import { createSlice } from "@reduxjs/toolkit";
import { getAllPayment } from "./payment.action";

const INITIAL_STATE = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPayment.fulfilled, (state, action) => {
      state.payments = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export default paymentSlice.reducer;
