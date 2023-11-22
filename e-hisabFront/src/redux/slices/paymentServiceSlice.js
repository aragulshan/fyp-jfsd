import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendPayment = createAsyncThunk(
  "payment/sendPayment",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/checkout",{
          "products":cartData
      } 
      );
      window.location.href = response?.data?.rediretUrl;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendPayment.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(sendPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;

