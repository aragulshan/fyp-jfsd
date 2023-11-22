import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
    role: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.data) {
          state.user = action.payload.data;
          state.error = null;
          state.role = action.payload.data.role;
        } else {
          console.error("Invalid response format:", action.payload);
          state.user = null;
          state.error = "Invalid response format"; // You can customize this error message
          state.role = null;
        }
      })
      .addCase(register.rejected, (state, action) => {
        console.error("Registration rejected:", action);
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message;
        state.role = null;
      });
  },
});

export default registrationSlice.reducer;
