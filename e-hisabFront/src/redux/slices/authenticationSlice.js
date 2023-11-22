import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./userSlice";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );
      localStorage.setItem("userData", JSON.stringify(response.data));
      dispatch(login(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    role: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true; 
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(authSlice.actions.logout, (state) => {
        state.isAuthenticated = false; // Set isAuthenticated to false using the logout action
        state.role = null; //clear role on logout
      });
  },
});

export const { reducer: authReducer, actions } = authSlice;

export default authReducer;
